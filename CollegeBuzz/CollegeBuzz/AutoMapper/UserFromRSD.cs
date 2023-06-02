using AutoMapper;
using CollegeBuzz.DTO;
using CollegeBuzz.Models;

namespace CollegeBuzz.AutoMapper
{
    public class UserFromRSD : Profile
    {
        public UserFromRSD()
        {
            CreateMap<RegisterStudentDTO, User>();
        }
    }
}
