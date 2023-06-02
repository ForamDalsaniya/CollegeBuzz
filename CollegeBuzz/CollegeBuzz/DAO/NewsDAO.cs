using System.ComponentModel.DataAnnotations;

namespace CollegeBuzz.DAO
{
    public class NewsDAO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime PostedOn { get; set; }
        public string UserName { get; set; }
    }
}
