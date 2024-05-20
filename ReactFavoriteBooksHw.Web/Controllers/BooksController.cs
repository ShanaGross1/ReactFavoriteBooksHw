using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactFavoriteBooksHw.Data;
using ReactFavoriteBooksHw.Web.ViewModels;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace ReactFavoriteBooksHw.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly string _connectionString;

        public BooksController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("getresults")]
        public List<Book> GetSearchResults(string query)
        {
            OpenLibraryAPIService search = new();
            return search.SearchBooks(query);

        }

        [HttpPost("addtofavorites")]
        public void AddToFavorites(FavoriteBook book)
        {
            var bookRepo = new BooksRepository(_connectionString);
            book.UserId = GetCurrentUserId();
            bookRepo.AddToFavorites(book);
        }

        [HttpGet("myfavorites")]
        public List<FavoriteBook> GetMyFavorites()
        {

            var bookRepo = new BooksRepository(_connectionString);
            return bookRepo.MyFavorites(GetCurrentUserId());
        }


        [HttpPost("deletefavorite")]
        public void RemoveFromFavorites(DeleteFavoriteBookViewModel vm)
        {
            var bookRepo = new BooksRepository(_connectionString);
            bookRepo.DeleteFavorite(vm.Id);
        }

        [HttpPost("addeditnote")]
        public void EditNote(FavoriteBook book)
        {
            var bookRepo = new BooksRepository(_connectionString);
            bookRepo.UpdateNote(book.Notes, book.Id);
        }

        public int GetCurrentUserId()
        {
            var userRepo = new UserRepository(_connectionString);
            return User.Identity.IsAuthenticated ? userRepo.GetByEmail(User.Identity.Name).Id : 0;

        }
    }
}
