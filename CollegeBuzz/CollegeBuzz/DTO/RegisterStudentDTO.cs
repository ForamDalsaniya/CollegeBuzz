using CollegeBuzz.Models;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace CollegeBuzz.DTO
{
    public class RegisterStudentDTO
    {
        public string StudentId { get; set; }//
        public string Name { get; set;}//
        public string PhoneNumber { get; set;}//
        //[DataType(DataType.DateTime)]
        public DateTime DOB { get; set; } //
        public int Semester { get; set; }//
        public string Gender { get; set; }//
        //public FileModel FileModel { get; set; }
        //public IFormFile? FormFile { get; set; }
        public string UserName { get; set;}//
        public string Email { get; set;}//
        public string Password { get; set;}//
        //[DefaultValue("Student")]
        //public string Role { get; set; }
        //[DefaultValue(0)]
        //public int Id { get; set; }
    }
}
