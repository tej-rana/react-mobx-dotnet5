using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using ReactMobxDotnet.Application.Photos;

namespace ReactMobxDotnet.Api.Controllers
{
    public class PhotosController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> Add([FromForm] Add.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
        
        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMain(string id)
        {
            return HandleResult(await Mediator.Send(new SetMain.Command{Id = id}));
        }

        public PhotosController(IMediator mediator) : base(mediator)
        {
        }
    }
}