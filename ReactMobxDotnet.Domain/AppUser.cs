using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace ReactMobxDotnet.Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public ICollection<ActivityAttendee> Actvities { get; set; }
    }
}