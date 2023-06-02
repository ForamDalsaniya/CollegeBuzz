using Microsoft.VisualBasic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace CollegeBuzz.Models
{
    
    public class Faculty
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string FacultyId { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        [DataType(DataType.DateTime)]
        public DateTime DOB { get; set; }
        public string Designation { get; set; }
        public string Address { get; set; }

        [AllowNull]
        public byte[]? ProfilePic { get; set; }
        [DefaultValue(false)]
        public bool IsApproved { get; set; }
        public string Gender { get; set; }
        [ForeignKey("Users")]
        public int UserId { get; set; }
        public virtual User Users { get; set; }
    }
}
