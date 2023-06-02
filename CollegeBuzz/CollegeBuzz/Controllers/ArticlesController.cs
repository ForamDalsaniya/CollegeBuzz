using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CollegeBuzz.Models;
using CollegeBuzz.DTO;
using Microsoft.Data.SqlClient;
using AutoMapper;
using CollegeBuzz.DAO;

namespace CollegeBuzz.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticlesController : ControllerBase
    {
        private readonly CollegeBuzzDBContext _context;
        private readonly IMapper _mapper;

        public ArticlesController(CollegeBuzzDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Articles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ArticleDAO>>> GetArticles()
        {
          if (_context.Articles == null)
          {
              return NotFound();
          }
          List<Article> articles = await _context.Articles.ToListAsync();
            List<ArticleDAO> articleDAOs= new List<ArticleDAO>();
            foreach(var article in articles)
            {
                string imageBase64Data = Convert.ToBase64String(article.Image);
                string imageDataURL = string.Format("data:image/jpg;base64,{0}",imageBase64Data);
                ArticleDAO ad = _mapper.Map<ArticleDAO>(article);
                var username = _context.Users.Where(x => x.Id == article.UserId).Select(x => x.UserName).FirstOrDefault();
                ad.UserName = username;
                ad.Pic = imageDataURL;
                articleDAOs.Add(ad);
            }
            return articleDAOs;
        }

        [HttpGet]
        [Route("approvedArticle")]
        public async Task<ActionResult<IEnumerable<ArticleDAO>>> ApprovedArticle()
        {
            if (_context.Articles == null)
            {
                return NotFound();
            }
            List<Article> articles = await _context.Articles.Where(t => t.IsApproved == true).ToListAsync();
            List<ArticleDAO> articleDAOs = new List<ArticleDAO>();
            foreach (var article in articles)
            {
                string imageBase64Data = Convert.ToBase64String(article.Image);
                string imageDataURL = string.Format("data:image/jpg;base64,{0}", imageBase64Data);
                ArticleDAO ad = _mapper.Map<ArticleDAO>(article);
                var username = _context.Users.Where(x => x.Id == article.UserId).Select(x => x.UserName).FirstOrDefault();
                ad.UserName = username;
                ad.Pic = imageDataURL;
                articleDAOs.Add(ad);
            }
            return articleDAOs;
        }

        [HttpGet]
        [Route("notApprovedArticle")]
        public async Task<ActionResult<IEnumerable<ArticleDAO>>> NotApprovedArticle()
        {
            if (_context.Articles == null)
            {
                return NotFound();
            }
            List<Article> articles = await _context.Articles.Where(t => t.IsApproved == false).ToListAsync();
            List<ArticleDAO> articleDAOs = new List<ArticleDAO>();
            foreach (var article in articles)
            {
                string imageBase64Data = Convert.ToBase64String(article.Image);
                string imageDataURL = string.Format("data:image/jpg;base64,{0}", imageBase64Data);
                ArticleDAO ad = _mapper.Map<ArticleDAO>(article);
                var username = _context.Users.Where(x => x.Id == article.UserId).Select(x => x.UserName).FirstOrDefault();
                ad.UserName = username;
                ad.Pic = imageDataURL;
                articleDAOs.Add(ad);
            }
            return articleDAOs;
        }

        // GET: api/Articles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Article>> GetArticle(int id)
        {
          if (_context.Articles == null)
          {
              return NotFound();
          }
            var article = await _context.Articles.FindAsync(id);

            if (article == null)
            {
                return NotFound();
            }

            return article;
        }

        // PUT: api/Articles/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArticle(int id, Article article)
        {
            if (id != article.Id)
            {
                return BadRequest();
            }

            _context.Entry(article).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArticleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        [HttpPut]
        [Route("markApprove/{id:int}")]
        public async Task<IActionResult> MarkApprove(int id)
        {
            if (_context.Students == null)
            {
                return NotFound();
            }
            if (id == null)
            {
                return BadRequest("Please select user");
            }
            Article art = await _context.Articles.FindAsync(id);
            art.IsApproved = true;
            _context.Entry(art).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArticleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return Ok("Article Approved Sucessfully!");

        }
        // POST: api/Articles
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Article>> PostArticle([FromForm] ArticleDTO article)
        {
          if (_context.Articles == null)
          {
              return Problem("Entity set 'CollegeBuzzDBContext.Articles'  is null.");
          }
            //string query = $"SELECT Id from User WHERE Email = @article.UserName";
            //var q1 = new SqlParameter("@article.UserName", "Email");
            var userid = _context.Users.Where(t => t.UserName == article.UserName).Select(t => t.Id);
            if (userid.Any())
            {
                Article art = _mapper.Map<Article>(article);
                art.UserId = userid.SingleOrDefault();
                MemoryStream ms = new MemoryStream();
                article.Pic.CopyTo(ms);
                art.Image = ms.ToArray();
                ms.Close();
                ms.Dispose();
                art.PostedDate= DateTime.UtcNow;
                _context.Articles.Add(art);
                await _context.SaveChangesAsync();
                return Ok("Article Posted Successfully");
            }

            return BadRequest("User not Found");
        }

        // DELETE: api/Articles/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArticle(int id)
        {
            if (_context.Articles == null)
            {
                return NotFound();
            }
            var article = await _context.Articles.FindAsync(id);
            if (article == null)
            {
                return NotFound();
            }

            _context.Articles.Remove(article);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ArticleExists(int id)
        {
            return (_context.Articles?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
