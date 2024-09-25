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
using api.Dtos.Quote;
using api.Mappers;

namespace api.Controllers
{
    [Route("api/quote")]
    [ApiController]
    public class quoteController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IQuoteRepository _quoteRepo;

        private readonly UserManager<AppUser> _userManager;

        public quoteController(ApplicationDbContext context, IQuoteRepository quoteRepo, UserManager<AppUser> userManager)
        {
            _quoteRepo = quoteRepo;
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] QuoteQueryObject query)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var quotes = await _quoteRepo.GetAllAsync(query);

            var quoteDtoList = quotes.Select(s => s.ToQuoteDto()).ToList();
            
            if (!quoteDtoList.Any())
            {
                return NotFound("Quote not found");
            }

            return Ok(quoteDtoList);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var quote = await _quoteRepo.GetByIdAsync(id);

            if (quote == null)
            {
                return NotFound();
            }

            return Ok(quote.ToQuoteDto());
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] QuoteCreateDto quoteCreateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var quoteModel = quoteCreateDto.ToQuoteFromCreateDto();
            await _quoteRepo.CreateAsync(quoteModel);
            return CreatedAtAction(nameof(GetById), new { id = quoteModel.Id }, quoteModel.ToQuoteDto());
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] QuoteUpdateDto quoteUpdateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var updatedQuote = await _quoteRepo.UpdateAsync(id, quoteUpdateDto);

            if (updatedQuote == null)
            {
                return NotFound("Quote not found!");
            }

            return Ok(updatedQuote.ToQuoteDto());
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var quoteModel = await _quoteRepo.DeleteAsync(id);

            if (quoteModel == null)
            {
                return NotFound("quote does not exist");
            }

            return Ok(quoteModel);
        }
    }
}