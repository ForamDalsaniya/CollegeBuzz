using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CollegeBuzz.Models;
using CollegeBuzz.DTO;
using AutoMapper;
using CollegeBuzz.DAO;

namespace CollegeBuzz.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly CollegeBuzzDBContext _context;
        private readonly IMapper _mapper;
        public NewsController(CollegeBuzzDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/News
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NewsDAO>>> GetNews()
        {
          if (_context.News == null)
          {
              return NotFound();
          }
            List<News> news =  await _context.News.ToListAsync();
            List<NewsDAO> newsList = new List<NewsDAO>();
            foreach (var item in news)
            {
                NewsDAO n = _mapper.Map<NewsDAO>(item);
                n.UserName = _context.Users.Where(t => t.Id == item.UserId).Select(t => t.UserName).FirstOrDefault();
                newsList.Add(n);
            }
            return newsList;
        }

        // GET: api/News/5
        [HttpGet("{id}")]
        public async Task<ActionResult<News>> GetNews(int id)
        {
          if (_context.News == null)
          {
              return NotFound();
          }
            var news = await _context.News.FindAsync(id);
           
            if (news == null)
            {
                return NotFound();
            }

            return news;
        }

        // PUT: api/News/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNews(int id, News news)
        {
            if (id != news.Id)
            {
                return BadRequest();
            }

            _context.Entry(news).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NewsExists(id))
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

        // POST: api/News
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<News>> PostNews(NewsDTO news)
        {
          if (_context.News == null)
          {
              return Problem("Entity set 'CollegeBuzzDBContext.News'  is null.");
          }
            var userid = _context.Users.Where(t => t.UserName == news.UserName).Select(t => t.Id);
            if (userid.Any())
            {
                News n = _mapper.Map<News>(news);
                n.UserId = userid.SingleOrDefault();
                n.PostedOn = DateTime.UtcNow;

                _context.News.Add(n);
                await _context.SaveChangesAsync();
                return Ok("News Posted Successfully!!");
            }

            return BadRequest("User not Found");
        }

        // DELETE: api/News/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNews(int id)
        {
            if (_context.News == null)
            {
                return NotFound();
            }
            var news = await _context.News.FindAsync(id);
            if (news == null)
            {
                return NotFound();
            }

            _context.News.Remove(news);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool NewsExists(int id)
        {
            return (_context.News?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
