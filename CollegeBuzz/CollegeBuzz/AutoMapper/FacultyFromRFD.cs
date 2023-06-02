using AutoMapper;
using CollegeBuzz.DTO;
using CollegeBuzz.Models;

namespace CollegeBuzz.AutoMapper
{
    public class FacultyFromRFD : Profile
    {
        public FacultyFromRFD() 
        {
            CreateMap<RegisterFacultyDTO,Faculty>();
        }
    }
}
