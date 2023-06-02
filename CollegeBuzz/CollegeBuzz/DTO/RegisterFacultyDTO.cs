using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace CollegeBuzz.DTO
{
    public class RegisterFacultyDTO
    {
        //public IFormFile? FormFile { get; set; }
        public string UserName { get; set; }//
        public string Email { get; set; }//
        public string Password { get; set; }//
        [DefaultValue("Faculty")]
        //public string Role { get; set; }


        public string FacultyId { get; set; }//
        public string Name { get; set; }//
        public string PhoneNumber { get; set; }//
        //[DataType(DataType.DateTime)]
        public DateTime DOB { get; set; }//
        public string Designation { get; set; }//
        public string Address { get; set; }//
        public string Gender { get; set; }//
    }
}
