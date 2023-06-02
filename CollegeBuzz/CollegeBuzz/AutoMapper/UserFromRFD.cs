using AutoMapper;
using CollegeBuzz.DTO;
using CollegeBuzz.Models;

namespace CollegeBuzz.AutoMapper
{
    public class UserFromRFD : Profile
    {
        public UserFromRFD() 
        {
            CreateMap<RegisterFacultyDTO, User>();
        }
    }
}
