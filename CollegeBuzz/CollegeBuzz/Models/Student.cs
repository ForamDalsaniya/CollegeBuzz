using Microsoft.VisualBasic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace CollegeBuzz.Models
{
    
    public class Student
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]     // for manually enter primary key
        public string StudentId { get; set; }
        public string Name { get; set; }
        //public string CollegeId { get; set; }
        public string PhoneNumber { get; set; }
        [DataType(DataType.DateTime)]
        public DateTime DOB { get; set; }
        public int Semester { get; set; }
        public string Gender { get; set; }
        [DefaultValue(false)]
        public bool IsApproved { get; set; }
        [AllowNull]
        public byte[]? ProfilePic { get; set; }
        [ForeignKey("Users")]
        public int UserId { get; set; }
        public virtual User Users { get; set; }

    }
}
