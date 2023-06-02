using AutoMapper;
using CollegeBuzz.DAO;
using CollegeBuzz.Models;

namespace CollegeBuzz.AutoMapper
{
    public class ArticleDAOFromArticle : Profile
    {
        public ArticleDAOFromArticle() 
        {
            CreateMap<Article, ArticleDAO>();
        }
    }
}
