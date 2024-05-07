using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
using api.Mappers;

namespace api.Controllers
{
    [Route("api/ActionData")]
    [ApiController]
    public class ActionDataController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IActionDataRepository _actionDataRepo;

        private readonly UserManager<AppUser> _userManager;

        public ActionDataController(ApplicationDbContext context, IActionDataRepository actionDataRepo, UserManager<AppUser> userManager)
        {
            _actionDataRepo = actionDataRepo;
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] ActionDataQueryObject query)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var actionDatas = await _actionDataRepo.GetAllAsync(query);

            var actionDataDto = actionDatas.Select(s => s.ToActionDataDto()).ToList();

            return Ok(actionDataDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] string id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var actionData = await _actionDataRepo.GetByIdAsync(id);

            if (actionData == null)
            {
                return NotFound();
            }

            return Ok(actionData.ToActionDataDto());
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ActionDataCreateDto actionDataCreateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            var actionDataModel = actionDataCreateDto.ToActionDataFromCreateDto();
            actionDataModel.Id = Guid.NewGuid().ToString();
            actionDataModel.AppUserId = appUser.Id;
            await _actionDataRepo.CreateAsync(actionDataModel);
            return Ok(actionDataModel.ToActionDataDto());
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] string id, [FromBody] ActionDataUpdateDto actionDataUpdateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            var actionDataModel = actionDataUpdateDto.ToActionDataFromUpdateDto();
            actionDataModel.AppUserId = appUser.Id;
            actionDataModel.Id = id;
            actionDataModel = await _actionDataRepo.UpdateAsync(id, actionDataModel);

            if (actionDataModel == null)
            {
                return NotFound("ActionData not found");
            }

            return Ok(actionDataModel.ToActionDataDto());
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] string id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var actionDataModel = await _actionDataRepo.DeleteAsync(id);

            if (actionDataModel == null)
            {
                return NotFound("ActionData does not exist");
            }

            return Ok(actionDataModel);
        }
    }
}