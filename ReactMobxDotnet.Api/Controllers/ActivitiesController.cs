using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ReactMobxDotnet.Domain;

namespace ReactMobxDotnet.Api.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        
        [HttpGet]
        public async Task<IActionResult> GetActivities()
        {
            var result =  await Mediator.Send(new Application.Activities.List.Query());
            return HandleResult(result);
        }
        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivity(Guid id)
        {
            var result = await Mediator.Send(new Application.Activities.Details.Query{Id = id});
            return HandleResult(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return HandleResult(await Mediator.Send(new Application.Activities.Create.Command{ Activity = activity}));
        }
        
        
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return HandleResult(await Mediator.Send(new Application.Activities.Edit.Command{ Activity = activity}));
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> UpdateDelete(Guid id)
        {
            return HandleResult(await Mediator.Send(new Application.Activities.Delete.Command{ Id = id}));
        }

    }
}