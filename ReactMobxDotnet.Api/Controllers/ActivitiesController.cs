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
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new Application.Activities.List.Query());
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await Mediator.Send(new Application.Activities.Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return Ok(await Mediator.Send(new Application.Activities.Create.Command{ Activity = activity}));
        }
        
        
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return Ok(await Mediator.Send(new Application.Activities.Edit.Command{ Activity = activity}));
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> UpdateDelete(Guid id)
        {
            return Ok(await Mediator.Send(new Application.Activities.Delete.Command{ Id = id}));
        }

    }
}