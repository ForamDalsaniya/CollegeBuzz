using AutoMapper;
using CollegeBuzz.DAO;
using CollegeBuzz.Models;

namespace CollegeBuzz.AutoMapper
{
    public class NewsDAOFromNews : Profile
    {
        public NewsDAOFromNews() 
        {
            CreateMap<News, NewsDAO>();
        }
    }
}
