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
using api.QueryObjects;
using api.Dtos.Diary;
using api.Mappers;
using api.Repositories;

namespace api.Controllers
{
    [Route("api/diary")]
    [ApiController]
    public class DiaryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IDiaryRepository _diaryRepo;
        private readonly UserManager<AppUser> _userManager;

        public DiaryController(ApplicationDbContext context, IDiaryRepository diaryRepo, UserManager<AppUser> userManager)
        {
            _diaryRepo = diaryRepo;
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll([FromQuery] DiaryQueryObject diaryQueryObject)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var diaries = await _diaryRepo.GetAllAsync(diaryQueryObject);

            var diaryDtoList = diaries.Select(s => s.ToDiaryDto()).ToList();

            if (!diaryDtoList.Any())
            {
                return NotFound("ActionData not found");
            }

            return Ok(diaryDtoList);
        }

        [HttpGet("user")]
        public async Task<IActionResult> GetUserDiary()
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            // Get user id from token
            var diary = await _diaryRepo.GetByUserIdAsync(appUser.Id);
            if (diary == null)
            {
                return NotFound();
            }
            return Ok(diary.ToDiaryDto());
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var diary = await _diaryRepo.GetByIdAsync(id);

            if (diary == null)
            {
                return NotFound();
            }

            return Ok(diary.ToDiaryDto());
        }


        [HttpPost]
        public async Task<IActionResult> Create([FromBody] DiaryCreateDto diaryCreateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            
            var diaryModel = diaryCreateDto.ToDiaryFromCreateDto();
            diaryModel.AppUserId = appUser.Id;

            await _diaryRepo.CreateAsync(diaryModel);

            return CreatedAtAction(nameof(GetById), new { id = diaryModel.Id }, diaryModel.ToDiaryDto());
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] DiaryUpdateDto diaryUpdateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var diaryModel = await _diaryRepo.UpdateAsync(id, diaryUpdateDto);

            if (diaryModel == null)
            {
                return NotFound();
            }

            return Ok(diaryModel.ToDiaryDto());
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var diaryModel = await _diaryRepo.DeleteAsync(id);

            if (diaryModel == null)
            {
                return NotFound();
            }

            return Ok(diaryModel);
        }

        [HttpPut("{diaryId}")]
        public async Task<IActionResult> UpdateDiaryTitle([FromRoute] int diaryId, [FromBody] DiaryUpdateDto diaryUpdateDto)
        {
            var diary = await _diaryRepo.GetByIdAsync(diaryId);
            if (diary == null)
            {
                return NotFound();
            }
            await _diaryRepo.UpdateAsync(diaryId, diaryUpdateDto);
            return NoContent();
        }

    }
}