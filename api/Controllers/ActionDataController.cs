/*using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Models;

namespace api.Controllers
{
    [Route("api/ActionData")]
    [ApiController]
    public class ActionDataController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IActionDataRepository _actionDataRepo;
        public ActionDataController(ApplicationDbContext context, IActionDataRepository actionDataRepo)
        {
            _actionDataRepo = actionDataRepo;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] actionDataQueryObject query)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var actionDatas = await _actionDataRepo.GetAllAsync(query);

            var actionDataDto = actionDatas.Select(s => s.ToActionDataDto()).ToList();

            return Ok(actionDataDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var actionData = await _actionDataRepo.GetByIdAsync(id);

            if (actionData == null)
            {
                return NotFound();
            }

            return Ok(ActionData.ToActionDataDto());
        }

        [Route("{ArticleId}, {UserId}")]
        public async Task<IActionResult> Create([FromRoute] int articleId, int userId, actionDataDto ActionDataDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            //RegisteredUser and Article will be added when finishing routes for it...
            var actionDataModel = actionDataDto.ToActionDataFromCreate(articleId, userId);
            await _actionDataRepo.CreateAsync(actionDataModel);
            return CreatedAtAction(nameof(GetById), new { id = actionDataModel.Id }, actionDataModel.ToActionDataDto());
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateActionDataRequestDto updateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var actionData = await _actionDataRepo.UpdateAsync(id, updateDto.ToActionDataFromUpdate(id));

            if (actionData == null)
            {
                return NotFound("ActionData not found");
            }

            return Ok(ActionData.ToActionDataDto());
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
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
}*/