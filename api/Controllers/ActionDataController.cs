using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using api.Extensions;
using api.Data;
using api.Models;
using api.Interfaces;
using api.QueryObjects;
using api.Dtos.ActionData;
using api.IServices;
using api.Mappers;

namespace api.Controllers
{
    [Route("api/actionData")]
    [ApiController]
    public class ActionDataController : ControllerBase
    {
        private readonly IActionDataService _actionDataService;
        private readonly UserManager<AppUser> _userManager;
        public ActionDataController(IActionDataService actionDataService, UserManager<AppUser> userManager)
        {
            _actionDataService = actionDataService;
            _userManager = userManager;
        }
        
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] ActionDataQueryObject query)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            query.AppUserId = appUser.Id;

            var actionDatas = await _actionDataService.GetAllActionDatas(query);

            return Ok(actionDatas);
        }

        [Authorize]
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var actionData = await _actionDataService.GetActionDataById(id);

            if (actionData == null)
            {
                return NotFound();
            }

            return Ok(actionData);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ActionDataCreateDto actionDataCreateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            
            var actionData = await _actionDataService.CreateActionData(actionDataCreateDto, appUser.Id);
            if (actionData == null)
            {
                return NotFound();
            }
            return Ok(actionData);
        }

        [Authorize]
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] ActionDataUpdateDto actionDataUpdateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var updatedActionData = await _actionDataService.UpdateActionData(id, actionDataUpdateDto);

            if (updatedActionData == null)
            {
                return NotFound("Action data not found!");
            }

            return Ok(updatedActionData);
        }

        [Authorize]
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var actionData = await _actionDataService.DeleteActionData(id);

            if (actionData == null)
            {
                return NotFound("ActionData does not exist");
            }

            return Ok(actionData);
        }
    }
}