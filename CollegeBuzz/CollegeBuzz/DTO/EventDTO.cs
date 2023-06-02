using System.ComponentModel.DataAnnotations;

namespace CollegeBuzz.DTO
{
    public class EventDTO
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string Organizer { get; set; }
        public string? Venue { get; set; }
        public int? Costs { get; set; }
        [DataType(DataType.DateTime)]
        public DateTime? RegistrationStart { get; set; }
        [DataType(DataType.DateTime)]
        public DateTime? RegistrationEnd { get; set; }
        [DataType(DataType.DateTime)]
        public DateTime? EventStart { get; set; }
        public string? Duration { get; set; }
        public string? UserName { get; set; }
    }
}
