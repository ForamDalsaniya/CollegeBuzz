using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CollegeBuzz.Models
{
    public class CollegeBuzzDBContext : DbContext
        //IdentityDbContext
    {
        //public readonly IConfiguration _configuration;
        public CollegeBuzzDBContext(DbContextOptions<CollegeBuzzDBContext> options):base(options) 
        {
           //_configuration= configuration;
        }
        public DbSet<Student> Students { get; set; }
        public DbSet<Faculty> Faculties { get; set;}
        public DbSet<User> Users { get; set; }
        public DbSet<Article> Articles { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<Event> Events { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }



    }
}
