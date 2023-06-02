using AutoMapper;
using CollegeBuzz.DTO;
using CollegeBuzz.Models;

namespace CollegeBuzz.AutoMapper
{
    public class NewsFromND : Profile
    {
        public NewsFromND() 
        {
            CreateMap<NewsDTO, News>();
        }
    }
}
