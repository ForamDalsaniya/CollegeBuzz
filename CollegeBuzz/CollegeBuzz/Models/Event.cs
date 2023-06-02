using Microsoft.VisualBasic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CollegeBuzz.Models
{
    public class Event
    {
        public int Id { get; set; }
        public String Title { get; set; }
        public string Description { get; set; }
        public string Organizer { get; set; }
        public string Venue { get; set; }
        public int Costs { get; set; }
        [DataType(DataType.DateTime)]
        public DateTime RegistrationStart { get; set; }
        [DataType(DataType.DateTime)]
        public DateTime RegistrationEnd { get; set; }
        [DataType(DataType.DateTime)]
        public DateTime EventStart { get; set; }
        public string Duration { get; set; }

        [ForeignKey("Users")]
        public int UserId { get; set; }
        public virtual User Users { get; set; }
    }
}
