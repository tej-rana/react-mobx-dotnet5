using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using ReactMobxDotnet.Application.Profiles;

namespace ReactMobxDotnet.Api.Controllers
{
    public class ProfilesController : BaseApiController
    {
        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username)
        {
            return HandleResult(await Mediator.Send(new Details.Query {Username = username}));
        }

        public ProfilesController(IMediator mediator) : base(mediator)
        {
        }
    }
}