using AutoMapper;
using CollegeBuzz.DAO;
using CollegeBuzz.Models;

namespace CollegeBuzz.AutoMapper
{
    public class FacultyDAOFromFaculty : Profile
    {
        public FacultyDAOFromFaculty()
        {
            CreateMap<Faculty, FacultyDAO>();
        }
    }
}
