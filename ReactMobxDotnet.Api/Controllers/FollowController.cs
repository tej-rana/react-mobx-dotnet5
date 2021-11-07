using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using ReactMobxDotnet.Application.Followers;

namespace ReactMobxDotnet.Api.Controllers
{
    public class FollowController : BaseApiController
    {
        [HttpPost("{username}")]
        public async Task<IActionResult> Follow(string username)
        {
            return HandleResult(await Mediator.Send(new FollowToggle.Command {TargetUsername = username}));
        }
        
        
        [HttpGet("{username}")]
        public async Task<IActionResult> GetFollowings(string username, string predicate)
        {
            return HandleResult(await Mediator.Send(new List.Query{Username = username , Predicate = predicate}));
        }
        
        public FollowController(IMediator mediator) : base(mediator)
        {
        }
    }
}