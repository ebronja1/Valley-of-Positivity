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
using api.Dtos.Video;
using api.Mappers;

namespace api.Controllers
{
    [Route("api/video")]
    [ApiController]
    public class VideoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IVideoRepository _videoRepo;

        private readonly UserManager<AppUser> _userManager;

        public VideoController(ApplicationDbContext context, IVideoRepository videoRepo, UserManager<AppUser> userManager)
        {
            _videoRepo = videoRepo;
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] VideoQueryObject query)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var videos = await _videoRepo.GetAllAsync(query);

            var videoDtoList = videos.Select(s => s.ToVideoDto()).ToList();

            if (!videoDtoList.Any())
            {
                return NotFound("video not found");
            }

            return Ok(videoDtoList);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var video = await _videoRepo.GetByIdAsync(id);

            if (video == null)
            {
                return NotFound();
            }

            return Ok(video.ToVideoDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] VideoCreateDto videoCreateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var videoModel = videoCreateDto.ToVideoFromCreateDto();
            await _videoRepo.CreateAsync(videoModel);
            return CreatedAtAction(nameof(GetById), new { id = videoModel.Id }, videoModel.ToVideoDto());
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] VideoUpdateDto videoUpdateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var updatedvideo = await _videoRepo.UpdateAsync(id, videoUpdateDto);

            if (updatedvideo == null)
            {
                return NotFound("video not found!");
            }

            return Ok(updatedvideo);
        }


        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var videoModel = await _videoRepo.DeleteAsync(id);

            if (videoModel == null)
            {
                return NotFound("video does not exist");
            }

            return Ok(videoModel);
        }
    }
}