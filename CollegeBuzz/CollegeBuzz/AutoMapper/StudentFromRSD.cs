using AutoMapper;
using CollegeBuzz.DTO;
using CollegeBuzz.Models;

namespace CollegeBuzz.AutoMapper
{
    public class StudentFromRSD : Profile
    {
        public StudentFromRSD () 
        {
            CreateMap<RegisterStudentDTO, Student>();
        }
    }
}
