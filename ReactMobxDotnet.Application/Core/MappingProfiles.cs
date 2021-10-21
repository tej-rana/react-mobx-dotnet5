using AutoMapper;
using ReactMobxDotnet.Domain;

namespace ReactMobxDotnet.Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();
        }
    }
}