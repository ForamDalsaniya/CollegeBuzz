using CollegeBuzz.AutoMapper;

using CollegeBuzz.Models;
using CollegeBuzz.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using System.Web.Http;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
//builder.Services.AddSession(o => o.IdleTimeout = TimeSpan.FromSeconds(60));

// Add services to the container.
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
IConfiguration config = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json").Build();
builder.Services.AddDbContext<CollegeBuzzDBContext>(opt => opt.UseSqlServer(config.GetConnectionString("CBCon")));
//builder.Services.AddIdentity<User, IdentityRole>().AddUserStore<User>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(UserFromRSD));
builder.Services.AddAutoMapper(typeof(StudentFromRSD));
builder.Services.AddAutoMapper(typeof(UserFromRFD));
builder.Services.AddAutoMapper(typeof(FacultyFromRFD));
builder.Services.AddAutoMapper(typeof(ArticleFromAD));
builder.Services.AddAutoMapper(typeof(NewsFromND));
builder.Services.AddAutoMapper(typeof(EventFromED));
builder.Services.AddAutoMapper(typeof(ArticleDAOFromArticle));
builder.Services.AddAutoMapper(typeof(NewsDAOFromNews));
builder.Services.AddAutoMapper(typeof(StudentDAOFromStudent));
builder.Services.AddAutoMapper(typeof(FacultyDAOFromFaculty));


// JWT Implementation
builder.Services.AddTransient<IMailService, MailService>();
//IServiceCollection services = new ServiceCollection();
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(op => op.IdleTimeout= TimeSpan.FromMinutes(5));
var app = builder.Build();
app.UseSession();
app.UseCors(builder =>
{
    builder.AllowAnyOrigin()
            .AllowAnyMethod().AllowAnyHeader();
});
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
//app.UseAuthentication();

app.MapControllers();
//app.UseCors(MyAllowSpecificOrigins);
app.Run();
