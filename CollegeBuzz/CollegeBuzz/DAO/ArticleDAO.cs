namespace CollegeBuzz.DAO
{
    public class ArticleDAO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Pic { get; set; }
        public DateTime PostedDate { get; set; }
        public string UserName { get; set; }
        public bool IsApproved { get; set; }
    }
}
