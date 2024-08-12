using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos;
using api.Interfaces;
using api.Mappers;
using api.Models;
using api.QueryObjects;
using api.Dtos.DiaryNote;
using Microsoft.AspNetCore.Identity;
using api.Extensions;

namespace api.Controllers
{
    [Route("api/diarynote")]
    [ApiController]
    public class DiaryNoteController : ControllerBase
    {
        private readonly IDiaryNoteRepository _diaryNoteRepository;
        private readonly IDiaryRepository _diaryRepo;
        private readonly UserManager<AppUser> _userManager;

        public DiaryNoteController(IDiaryNoteRepository diaryNoteRepository, IDiaryRepository diaryRepo,  UserManager<AppUser> userManager)

        {
            _diaryNoteRepository = diaryNoteRepository;
            _diaryRepo = diaryRepo;
            _userManager = userManager;
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var diaryNote = await _diaryNoteRepository.GetByIdAsync(id);
            
            if (diaryNote == null)
            {
                return NotFound();
            }

            return Ok(diaryNote.ToDiaryNoteDto());
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] DiaryNoteQueryObject query)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var diaryNotes = await _diaryNoteRepository.GetAllAsync(query);
            var diaryNoteDtoList = diaryNotes.Select(dn => dn.ToDiaryNoteDto()).ToList();
            
            if (!diaryNoteDtoList.Any())
            {
                return NotFound("ActionData not found");
            }

            return Ok(diaryNoteDtoList);
        }

        [HttpPost("{diaryId:int}")]
        public async Task<IActionResult> Create([FromRoute] int diaryId, [FromBody] DiaryNoteCreateDto diaryNoteCreateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var diaryNote = diaryNoteCreateDto.ToDiaryNote();
            diaryNote.DiaryId = diaryId;
            var createdDiaryNote = await _diaryNoteRepository.CreateAsync(diaryNote);
            var createdDiaryNoteDto = createdDiaryNote.ToDiaryNoteDto();
            return CreatedAtAction(nameof(GetById), new { id = createdDiaryNoteDto.Id }, createdDiaryNoteDto);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] DiaryNoteUpdateDto diaryNoteUpdateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var diaryNoteModel = await _diaryNoteRepository.UpdateAsync(id, diaryNoteUpdateDto);

            if (diaryNoteModel == null)
            {
                return NotFound();
            }

            return Ok(diaryNoteModel.ToDiaryNoteDto());
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var diaryNoteModel = await _diaryNoteRepository.DeleteAsync(id);
            
            if (diaryNoteModel == null)
            {
                return NotFound();
            }

            return Ok(diaryNoteModel.ToDiaryNoteDto());
        }
    }
}
