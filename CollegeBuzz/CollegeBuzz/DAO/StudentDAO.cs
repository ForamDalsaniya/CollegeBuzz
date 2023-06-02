using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System.Diagnostics.CodeAnalysis;

namespace CollegeBuzz.DAO
{
    public class StudentDAO
    {
        public string StudentId { get; set; }
        public string Name { get; set; }
        //public string CollegeId { get; set; }
        public string PhoneNumber { get; set; }
        public string dob { get; set; }
        public int Semester { get; set; }
        public bool IsApproved { get; set; }
        //public string Profile { get; set; }
        public string UserName { get; set; }
    }
}
