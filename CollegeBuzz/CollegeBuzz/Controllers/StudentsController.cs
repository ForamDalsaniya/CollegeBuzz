using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CollegeBuzz.Models;
using CollegeBuzz.DAO;
using AutoMapper;

namespace CollegeBuzz.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly CollegeBuzzDBContext _context;
        private readonly IMapper _mapper;

        public StudentsController(CollegeBuzzDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Students
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentDAO>>> GetStudents()
        {
          if (_context.Students == null)
          {
              return NotFound();
          }
            List<Student> stds =  await _context.Students.ToListAsync();
            List<StudentDAO> students = new List<StudentDAO>();
            foreach (Student student in stds)
            {
                StudentDAO s = _mapper.Map<StudentDAO>(student);
                s.UserName = _context.Users.Where(t => t.Id == student.UserId).Select(t => t.UserName).FirstOrDefault();
                //string imageBase64Data = Convert.ToBase64String(student.ProfilePic);
                //string imageDataURL = string.Format("data:image/jpg;base64,{0}", imageBase64Data);
                //s.Profile = imageDataURL;
                s.dob = student.DOB.ToString("yyyy'-'MM'-'dd");
                //s.dob = student.DOB.ToUniversalTime().ToString("yyyy'-'MM'-'dd");
                //s.dob = student.DOB?.ToUniversalTime().ToString("yyyy'-'MM'-'dd'") ?? "";
                students.Add(s);
            }
            return students;
        }

        // GET: api/Students/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Student>> GetStudent(string id)
        {
          if (_context.Students == null)
          {
              return NotFound();
          }
            var student = await _context.Students.FindAsync(id);

            if (student == null)
            {
                return NotFound();
            }

            return student;
        }

        // PUT: api/Students/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudent(string id, Student student)
        {
            if (id != student.StudentId)
            {
                return BadRequest();
            }

            _context.Entry(student).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentExists(id))
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
        [Route("markApprove/{id}")]
        public async Task<IActionResult> MarkApprove(string id)
        {
            if (_context.Students == null)
            {
                return NotFound();
            }
            if(id == null)
            {
                return BadRequest("Please select user");
            }
            Student student = await _context.Students.FindAsync(id);
            student.IsApproved = true;
            _context.Entry(student).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return Ok("Student Approved Sucessfully!");

        }

        // POST: api/Students
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        
        // DELETE: api/Students/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(string id)
        {
            if (_context.Students == null)
            {
                return NotFound();
            }
            var student = await _context.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }
            var user = await _context.Users.FindAsync(student.UserId);
            
            _context.Students.Remove(student);
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok("Student Removed Successfully");
        }

        private bool StudentExists(string id)
        {
            return (_context.Students?.Any(e => e.StudentId == id)).GetValueOrDefault();
        }
    }
}
