namespace CollegeBuzz.DTO
{
    public class ArticleDTO
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public IFormFile Pic { get; set; }
        public string UserName { get; set; }
    }
}
