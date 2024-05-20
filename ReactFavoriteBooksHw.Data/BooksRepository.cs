using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactFavoriteBooksHw.Data
{
    public class BooksRepository
    {

        private readonly string _connectionString;

        public BooksRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddToFavorites(FavoriteBook book)
        {
            var ctx = new BooksDataContext(_connectionString);
            ctx.FavoriteBooks.Add(book);
            ctx.SaveChanges();
        }

        public List<FavoriteBook> MyFavorites(int id)
        {
            var ctx = new BooksDataContext(_connectionString);
            return ctx.FavoriteBooks.Where(b => b.UserId == id).ToList();
        }

        public void DeleteFavorite(int id)
        {
            var ctx = new BooksDataContext(_connectionString);
            ctx.Database.ExecuteSqlInterpolated($"DELETE FROM FavoriteBooks WHERE id = {id}");
        }

        public void UpdateNote(string notes, int id)
        {
            var ctx = new BooksDataContext(_connectionString);
            ctx.Database.ExecuteSqlInterpolated($"UPDATE FavoriteBooks SET Notes = {notes} WHERE Id = {id}");
        }

    }
}
