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
using System.Net;
using Microsoft.AspNetCore.Authorization;
using CollegeBuzz.DAO;
using CollegeBuzz.Services;
using Microsoft.AspNetCore.Identity;
using WebMatrix.WebData;

namespace CollegeBuzz.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
    public class UsersController : ControllerBase
    {
        private readonly CollegeBuzzDBContext _context;
        private readonly IMapper _mapper;
        private readonly IMailService _mailService;
        string SessionName = "_Name";
        string SessionToken = "_Token";
        public UsersController(CollegeBuzzDBContext context, IMapper mapper, IMailService mailService)
        {
            _context = context;
            _mapper = mapper;
            _mailService = mailService;
        }

        // GET: api/Users
        [HttpGet]
        //[Authorize(Roles = "Faculty")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
          if (_context.Users == null)
          {
              return NotFound();
          }
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
          if (_context.Users == null)
          {
              return NotFound();
          }
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, LoginDTO user)
        {
            var temp = _context.Users.Where(t => (t.UserName == user.UserName));
            var u = temp.SingleOrDefault();
            if (id != u.Id)
            {
                return BadRequest();
            }
            u.Password = user.Password;
            _context.Entry(u).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok("Password Changed");
        }
        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Route("registerStudent")]
        public async Task<ActionResult<User>> RegisterStudent(RegisterStudentDTO student)
        {

            if (student == null)
                return NotFound();

            // use automapper to map user object from student dto
            User user = _mapper.Map<User>(student);
            user.Role = "Student";
           
            if (user == null)
                return NotFound();

            // check for username exist or not
            IQueryable<User> u = _context.Users.Where(t => (t.UserName == user.UserName || t.Email == user.Email));

            var t = u.SingleOrDefault();
            // if t is not null it means email or username is already taken
            if (t != null)
            { 
                if(t.Email == user.Email)
                    return BadRequest("Email is already taken");
                else
                    return BadRequest("Username is already taken");
            }

            // add user
            _context.Users.Add(user);
            await _context.SaveChangesAsync();


            Student std = _mapper.Map<Student>(student);
            if ((_context.Students?.Any(e => e.StudentId == std.StudentId)).GetValueOrDefault())
            {
                return BadRequest("Student Id is already taken");
            }
            u = _context.Users.Where(t => (t.UserName == user.UserName));
            t = u.SingleOrDefault();
            std.UserId = t.Id;
            //std.DOB = DateTime.ParseExact(student.dob, "yyyy-MM-dd HH:mm:ss,fff", System.Globalization.CultureInfo.InvariantCulture);
            std.ProfilePic = null;
            //std.Role
            if (std == null)
            {
                return NotFound();
            }
            // saving image to database;
            //MemoryStream ms = new MemoryStream();
            _context.Students.Add(std);
            await _context.SaveChangesAsync();
            string subject = "Information about your CollegeBuzz Website";
            string body = "<!DOCTYPE html>" +
                                   "<html>" +
                                   "<body>" +
                                    $"<h1>Your Credential for CollegeBuzz </h1><br/>" +
                                    $"<h3>Username: {user.UserName}</h3><br/>" +
                                    $"<h3>Password: {user.Password}</h3><br/>" +
                                    $"<h3>Email: {user.Email}</h3><br/>" +
                                    $"<p> If you want to change your password you can do thisby forgot password</p><br/>" +
                                    $"<small>It is recommended to change your password</small><br/>";
            try
            {
                _mailService.PersonalMail(user.Email, body, subject, "forampdalsaniya@gmail.com");
            }
            catch(Exception ex)
            {
                return BadRequest("Error");
            }
                                    
                                    //$"<p>Event Duration: {e.Duration}</p><br/>";
            return Ok("Studnet Registered Successfully!!");
        }
        [HttpPost]
        [Route("forgetPassword")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordModel model)
        {
            var user = _context.Users.Where(t => (model.UserName == t.UserName && t.Email == model.UserName));
            if(user == null)
            {
                return Ok();
            }
            Guid token = Guid.NewGuid();
                //var token = WebSecurity.GeneratePasswordResetToken(model.UserName);
                if (token == null)
                    return Ok();
                var callbackUrl = $"https://localhost:7036/api/Users/resetpassword?userName={model.UserName}&token={token}";
            var url = "http://localhost:3000/resetpass";
                string subject = "Reset Password";
                string body = "<!DOCTYPE html>" +
                           "<html>" +
                           "<body>" +
                            $"<h3>Go to this link</h3><br/>" +

                            $"<p> {url}</p><br/>" +
                            $"<small>It is valid only for 5 minutes.</small><br/>";
                // Send the password reset email
                try
                {

                    _mailService.PersonalMail(model.Email, body, subject, "forampdalsaniya@gmail.com");

                HttpContext.Session.SetString(SessionName, model.UserName.ToString());
                HttpContext.Session.SetString(SessionToken,token.ToString());
                }
                catch (Exception ex)
                {
                    return BadRequest("Error");
                }

                return Ok(callbackUrl);
           
        }
        [HttpPost]
        [Route("resetpassword")]
        public async Task<IActionResult> ResetPassword(ResetPasswordModel model)
        {
            //bool resetResponse = WebSecurity.ResetPassword(model.Token, model.NewPassword);
            var queryString = HttpContext.Request.Query;
            var username = queryString["userName"];
            var token = queryString["token"];
            string sessionUser = HttpContext.Session.GetString(SessionName);
            string sessionToken = HttpContext.Session.GetString(SessionToken);
            if(sessionUser == null || sessionToken == null)
            {
                return BadRequest("Time out: Link is expired");
            }
            if((model.UserName != username && model.UserName != sessionUser) || sessionToken != token)
            {
                return BadRequest("Invalid Request");
            }
            var user = _context.Users.Where(t=>t.UserName== username).FirstOrDefault();
            if(user == null)
            {
                return BadRequest("Error");
            }
            user.Password = model.Password;
            _context.Entry(user).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                    return NotFound();
            }
            //HttpContext.Session.Remove(SessionToken);
            //HttpContext.Session.Remove(SessionName);
            return Ok("Password Reset Successfully!");

            //return BadRequest("Errors");
        }
        [HttpPost]
        [Route("registerFaculty")]
        public async Task<ActionResult<User>> RegisterFaculty(RegisterFacultyDTO faculty)
        {

            if (faculty == null)
                return NotFound();

            // use automapper to map user object from student dto
            User user = _mapper.Map<User>(faculty);


            if (user == null)
                return NotFound();

            // check for username exist or not
            IQueryable<User> u = _context.Users.Where(t => (t.UserName == user.UserName || t.Email == user.Email));

            var t = u.SingleOrDefault();
            // if t is not null it means email or username is already taken
            if (t != null)
            {
                if (t.Email == user.Email)
                    return BadRequest("Email is already taken");
                else
                    return BadRequest("Username is already taken");
            }
            user.Role = "Faculty";
            // add user
            _context.Users.Add(user);
            await _context.SaveChangesAsync();


            Faculty fcl = _mapper.Map<Faculty>(faculty);
            if ((_context.Faculties?.Any(e => e.FacultyId == fcl.FacultyId)).GetValueOrDefault())
            {
                return BadRequest("Faculty is already registered");
            }
            u = _context.Users.Where(t => (t.UserName == user.UserName));
            t = u.SingleOrDefault();
            fcl.UserId = t.Id;
            fcl.ProfilePic = null;
            if (fcl == null)
            {
                return NotFound();
            }
            // saving image to database;
            //MemoryStream ms = new MemoryStream();
            _context.Faculties.Add(fcl);
            await _context.SaveChangesAsync();

            return Ok("Faculty Registered Successfully!!");
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            if (user.Role == "Faculty")
            {
                IQueryable<Faculty> faculty = _context.Faculties.Where(t => (t.UserId == user.Id));

                if (faculty != null)
                {
                    _context.Faculties.Remove(faculty.SingleOrDefault());
                    await _context.SaveChangesAsync();
                    _context.Users.Remove(user);
                    await _context.SaveChangesAsync();
                    return Ok("User Deleted Successfully!!");
                }
            }
            else if (user.Role == "Student")
            {
                IQueryable<Student> student = _context.Students.Where(t => (t.UserId == user.Id));

                if (student != null)
                {
                    _context.Students.Remove(student.SingleOrDefault());
                    await _context.SaveChangesAsync();
                    _context.Users.Remove(user);
                    await _context.SaveChangesAsync();
                    return Ok("User Deleted Successfully!!");
                }
            }
            return BadRequest("Deletion Failed");
        }

        [Route("Login")]
        [HttpPost]
        public async Task<ActionResult<LoginDAO>> Login(LoginDTO user)
        {
            User u = _context.Users.Where(t => (user.UserName == t.UserName && user.Password == t.Password)).SingleOrDefault();
            if(u == null)
            {
                return BadRequest("Invalid Credential");
            }
            LoginDAO loginDAO = new LoginDAO();
            loginDAO.Id = u.Id;
            loginDAO.UserName = u.UserName;
            loginDAO.Role = u.Role;
            //loginDAO.Token = _context.GenerateJWT(loginDAO.Id, loginDAO.UserName, loginDAO.Role);
            return loginDAO;
            //return Ok(u.SingleOrDefault().Role + " logged in successfully!!");

        }
        private bool UserExists(int id)
        {
            return (_context.Users?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
