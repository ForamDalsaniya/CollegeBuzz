using AutoMapper;
using CollegeBuzz.DAO;
using CollegeBuzz.Models;

namespace CollegeBuzz.AutoMapper
{
    public class StudentDAOFromStudent : Profile
    {
        public StudentDAOFromStudent() 
        {
            CreateMap<Student, StudentDAO>();
        }
    }
}
