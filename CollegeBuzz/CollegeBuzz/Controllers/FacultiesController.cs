using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CollegeBuzz.Models;
using CollegeBuzz.DAO;
using AutoMapper;
using MathNet.Numerics.Distributions;

namespace CollegeBuzz.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FacultiesController : ControllerBase
    {
        private readonly CollegeBuzzDBContext _context;
        private readonly IMapper _mapper;

        public FacultiesController(CollegeBuzzDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Faculties
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FacultyDAO>>> GetFaculties()
        {
          if (_context.Faculties == null)
          {
              return NotFound();
          }
            List<Faculty> faculties = await _context.Faculties.ToListAsync();
            List<FacultyDAO> facultyDAOs= new List<FacultyDAO>();

            foreach(var faculty in faculties)
            {
                FacultyDAO f = _mapper.Map<FacultyDAO>(faculty);
                f.UserName = _context.Users.Where(i => i.Id == faculty.UserId).Select(t => t.UserName).FirstOrDefault();
                f.dob = faculty.DOB.ToString("yyyy'-'MM'-'dd");
                facultyDAOs.Add(f);
            }
            return facultyDAOs;
        }

        // GET: api/Faculties/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Faculty>> GetFaculty(string id)
        {
          if (_context.Faculties == null)
          {
              return NotFound();
          }
            var faculty = await _context.Faculties.FindAsync(id);

            if (faculty == null)
            {
                return NotFound();
            }

            return faculty;
        }

        // PUT: api/Faculties/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFaculty(string id, Faculty faculty)
        {
            if (id != faculty.FacultyId)
            {
                return BadRequest();
            }

            _context.Entry(faculty).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FacultyExists(id))
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

        // POST: api/Faculties
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Faculty>> PostFaculty(Faculty faculty)
        {
          if (_context.Faculties == null)
          {
              return Problem("Entity set 'CollegeBuzzDBContext.Faculties'  is null.");
          }
            _context.Faculties.Add(faculty);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (FacultyExists(faculty.FacultyId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetFaculty", new { id = faculty.FacultyId }, faculty);
        }

        // DELETE: api/Faculties/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFaculty(string id)
        {
            if (_context.Faculties == null)
            {
                return NotFound();
            }
            var faculty = await _context.Faculties.FindAsync(id);
            if (faculty == null)
            {
                return NotFound();
            }
            var user = await _context.Users.FindAsync(faculty.UserId);
            _context.Faculties.Remove(faculty);
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok("Faculty Removed Successfully");
        }

        private bool FacultyExists(string id)
        {
            return (_context.Faculties?.Any(e => e.FacultyId == id)).GetValueOrDefault();
        }
    }
}
