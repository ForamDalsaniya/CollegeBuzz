using Microsoft.VisualBasic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CollegeBuzz.Models
{
    public class Article
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public byte[] Image { get; set; }
        [DefaultValue(false)]
        public bool IsApproved { get; set; }
        [DataType(DataType.DateTime)]
        public DateTime PostedDate { get; set; }

        //public DateTime ApprovedDate { get; set; }
        [ForeignKey("Users")]
        public int UserId { get; set; }
        public virtual User Users { get; set; }
    }
}
