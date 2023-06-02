using AutoMapper;
using CollegeBuzz.DTO;
using CollegeBuzz.Models;

namespace CollegeBuzz.AutoMapper
{
    public class EventFromED : Profile
    {
        public EventFromED() 
        {
            CreateMap<EventDTO, Event>().ReverseMap();
        }
    }
}
