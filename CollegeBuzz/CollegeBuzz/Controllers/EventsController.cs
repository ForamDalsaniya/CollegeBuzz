
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CollegeBuzz.Models;
using CollegeBuzz.DTO;
using AutoMapper;
using System.Net.Mail;
using System.Net;
using CollegeBuzz.Services;

namespace CollegeBuzz.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly CollegeBuzzDBContext _context;
        private readonly IMapper _mapper;
        private readonly IMailService _mailService;
        public EventsController(CollegeBuzzDBContext context, IMapper mapper, IMailService mailService)
        {
            _context = context;
            _mapper = mapper;
            _mailService = mailService;
        }

        // GET: api/Events
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventDTO>>> GetEvents()
        {
          if (_context.Events == null)
          {
              return NotFound();
          }
           List<Event> events = await _context.Events.ToListAsync();
            List<EventDTO> eventDTOs= new List<EventDTO>();
            foreach(var e in events)
            {
                EventDTO ed = _mapper.Map<EventDTO>(e);
                var username = _context.Users.Where(t => t.Id== e.UserId).Select(t=>t.UserName).FirstOrDefault();
                ed.UserName = username;
                eventDTOs.Add(ed);
            }
            return Ok(eventDTOs);
        }

        // GET: api/Events/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Event>> GetEvent(int id)
        {
          if (_context.Events == null)
          {
              return NotFound();
          }
            var @event = await _context.Events.FindAsync(id);

            if (@event == null)
            {
                return NotFound();
            }

            return @event;
        }

        // PUT: api/Events/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEvent(int id, Event @event)
        {
            if (id != @event.Id)
            {
                return BadRequest();
            }

            _context.Entry(@event).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EventExists(id))
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
        [HttpPost]
        public async Task<ActionResult<Event>> PostEvent(EventDTO e)
        {
          if (_context.Events == null)
          {
              return Problem("Entity set 'CollegeBuzzDBContext.Events'  is null.");
          }
            Event evn = _mapper.Map<Event>(e);
            var id = _context.Users.Where(t => t.UserName == e.UserName).Select(t => t.Id ).FirstOrDefault();
            if(id == null)
            {
                return BadRequest("User not found!");
            }
            evn.UserId = id;
            _context.Events.Add(evn);
            await _context.SaveChangesAsync();
            List<string> studentEmail = _context.Users.Where(t => t.Role == "Student").Select(t => t.Email).ToList();
            var email = _context.Users.Where(t => t.UserName == e.UserName).Select(t => t.Email).FirstOrDefault();
            //MailMessage mailMessage = new MailMessage();
            //MailAddress fromMail = new MailAddress(email);
            //mailMessage.From = fromMail;
            //foreach (var adr in studentEmail)
            //{
            //    mailMessage.To.Add(adr);
            //}
            string subject = "Announcement of an upcoming Event";
            string body = "<!DOCTYPE html>" +
                                   "<html>" +
                                   "<body>" +
                                    $"<h1>Title: {e.Title} </h1><br/>" +
                                    $"<h3>Organized By: {e.Organizer}</h3><br/>" +
                                    $"<h3>Venue: {e.Venue}</h3><br/>" +
                                    $"<h3>Entry fees: {e.Costs}</h3><br/>" +
                                    $"<p> {e.Description}</p><br/>" +
                                    $"<p>Registration Till: {e.RegistrationEnd}</p><br/>" +
                                    $"<p>Event On: {e.EventStart}</p><br/>" +
                                    $"<p>Event Duration: {e.Duration}</p><br/>";
            //mailMessage.IsBodyHtml= true;
            try
            {
                _mailService.SendMail(studentEmail, body, subject, email);
            }
            catch(Exception ex)
            {
                return BadRequest("Error");
            }
            ////mailMessage.Sender = new MailAddress(email);
            //SmtpClient smtpClient= new SmtpClient();
            //smtpClient.Host= "smtp.gmail.com";
            //smtpClient.Port = 587;
            //smtpClient.EnableSsl= true;
            //smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;


            //System.Net.NetworkCredential credential = new System.Net.NetworkCredential();
            //credential.UserName = "forampdalsaniya@gmail.com";
            //credential.Password = "vpjutndphmluklbg";
            //smtpClient.UseDefaultCredentials = false;
            //smtpClient.Credentials = credential;
            //mailMessage.From = fromMail;
            //try
            //{
            //    smtpClient.Send(mailMessage);
                
            //}
            //catch(Exception ex)
            //{
            //    return BadRequest("Error");
            //}
            return Ok("Event Posted Successfully!!");
            
            //mailData.EmailToId = list;
            //mailData.EmailSubject = 
        }

        // DELETE: api/Events/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            if (_context.Events == null)
            {
                return NotFound();
            }
            var @event = await _context.Events.FindAsync(id);
            if (@event == null)
            {
                return NotFound();
            }

            _context.Events.Remove(@event);
            await _context.SaveChangesAsync();
            

            return Ok("Event Deleted Successfully!!");
        }

        private bool EventExists(int id)
        {
            return (_context.Events?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
