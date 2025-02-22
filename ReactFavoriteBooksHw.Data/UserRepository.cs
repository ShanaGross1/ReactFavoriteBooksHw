﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactFavoriteBooksHw.Data
{
    public class UserRepository
    {
        private readonly string _connectionString;

        public UserRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddUser(User user, string password)
        {
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(password);

            using var context = new BooksDataContext(_connectionString);
            context.Users.Add(user);
            context.SaveChanges();
        }

        public User GetByEmail(string email)
        {
            using var context = new BooksDataContext(_connectionString);
            return context.Users.FirstOrDefault(u => u.Email == email);
        }

        public User Login(string email, string password)
        {
            var user = GetByEmail(email);
            if (user == null)
            {
                return null;
            }

            bool isCorrectPassword = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
            return isCorrectPassword ? user : null;
        }
    }
}
