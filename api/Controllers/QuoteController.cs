using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using api.Extensions;
using api.Data;
using api.Models;
using api.QueryObjects;
using api.Dtos.Quote;
using api.Mappers;
using api.Repositories;

[Route("api/quote")]
[ApiController]
public class QuoteController : ControllerBase
{
    private readonly IQuoteRepository _quoteRepo;
    private readonly UserManager<AppUser> _userManager;

    public QuoteController(IQuoteRepository quoteRepo, UserManager<AppUser> userManager)
    {
        _quoteRepo = quoteRepo;
        _userManager = userManager;
    }

    [Authorize]
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] QuoteQueryObject query)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var username = User.GetUsername();
        var appUser = await _userManager.FindByNameAsync(username);
        query.AppUserId = appUser.Id;

        var quotes = await _quoteRepo.GetAllAsync(query);
        var quoteDtoList = quotes.Select(s => s.ToQuoteDto()).ToList();

        if (!quoteDtoList.Any())
            return NotFound("Quote not found");

        return Ok(quoteDtoList);
    }

    [Authorize]
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var quote = await _quoteRepo.GetByIdAsync(id);

        if (quote == null)
            return NotFound();

        return Ok(quote.ToQuoteDto());
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] QuoteCreateDto quoteCreateDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var username = User.GetUsername();
        var appUser = await _userManager.FindByNameAsync(username);

        var quoteModel = quoteCreateDto.ToQuoteFromCreateDto();
        quoteModel.AppUserId = appUser.Id;

        await _quoteRepo.CreateAsync(quoteModel);
        return CreatedAtAction(nameof(GetById), new { id = quoteModel.Id }, quoteModel.ToQuoteDto());
    }

    [Authorize]
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] QuoteUpdateDto quoteUpdateDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var existingQuote = await _quoteRepo.GetByIdAsync(id);
        if (existingQuote == null)
            return NotFound("Quote not found!");

        var updatedQuote = await _quoteRepo.UpdateAsync(id, quoteUpdateDto);
        return Ok(updatedQuote.ToQuoteDto());
    }

    [Authorize]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var quote = await _quoteRepo.GetByIdAsync(id);
        if (quote == null)
            return NotFound("Quote does not exist");

        var deletedQuote = await _quoteRepo.DeleteAsync(id);
        return Ok(deletedQuote);
    }
}
