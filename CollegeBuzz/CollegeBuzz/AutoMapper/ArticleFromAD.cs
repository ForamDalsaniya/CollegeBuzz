using AutoMapper;
using CollegeBuzz.DTO;
using CollegeBuzz.Models;

namespace CollegeBuzz.AutoMapper
{
    public class ArticleFromAD : Profile
    {
        public ArticleFromAD() 
        {
            CreateMap<ArticleDTO, Article>();
        }
    }
}
