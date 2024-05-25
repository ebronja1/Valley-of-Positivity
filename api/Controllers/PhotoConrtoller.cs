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
using api.Dtos.Photo;
using api.Mappers;

namespace api.Controllers
{
    [Route("api/photo")]
    [ApiController]
    public class PhotoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IPhotoRepository _photoRepo;

        private readonly UserManager<AppUser> _userManager;

        public PhotoController(ApplicationDbContext context, IPhotoRepository photoRepo, UserManager<AppUser> userManager)
        {
            _photoRepo = photoRepo;
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] PhotoQueryObject query)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var photos = await _photoRepo.GetAllAsync(query);

            var photoDtoList = photos.Select(s => s.ToPhotoDto()).ToList();

            if (!photoDtoList.Any())
            {
                return NotFound("Photo not found");
            }

            return Ok(photoDtoList);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var photo = await _photoRepo.GetByIdAsync(id);

            if (photo == null)
            {
                return NotFound();
            }

            return Ok(photo.ToPhotoDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] PhotoCreateDto photoCreateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var photoModel = photoCreateDto.ToPhotoFromCreateDto();
            await _photoRepo.CreateAsync(photoModel);
            return CreatedAtAction(nameof(GetById), new { id = photoModel.Id }, photoModel.ToPhotoDto());
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] PhotoUpdateDto photoUpdateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var photoModel = photoUpdateDto.ToPhotoFromUpdateDto();
            photoModel = await _photoRepo.UpdateAsync(id, photoModel);

            if (photoModel == null)
            {
                return NotFound("Photo not found");
            }

            return Ok(photoModel.ToPhotoDto());
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var photoModel = await _photoRepo.DeleteAsync(id);

            if (photoModel == null)
            {
                return NotFound("Photo does not exist");
            }

            return Ok(photoModel);
        }
    }
}