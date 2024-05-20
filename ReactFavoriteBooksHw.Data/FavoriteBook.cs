using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactFavoriteBooksHw.Data
{
    public class FavoriteBook
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public int UserId { get; set; }
        public string Notes { get; set; }
        public string BookId { get; set; }
    }
}
