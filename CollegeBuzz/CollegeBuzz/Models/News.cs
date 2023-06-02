using Microsoft.VisualBasic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CollegeBuzz.Models
{
    public class News
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        [DataType(DataType.DateTime)]
        public DateTime PostedOn { get; set; }
        [ForeignKey("Users")]
        public int UserId { get; set; }
        public virtual User Users { get; set; }
    }
}
