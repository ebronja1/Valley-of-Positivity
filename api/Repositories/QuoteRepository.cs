using api.Data;
using api.QueryObjects;
using Microsoft.EntityFrameworkCore;
using api.Models;
using api.Dtos.Quote;
using api.Mappers;

namespace api.Repositories
{
    public class QuoteRepository : IQuoteRepository
    {
        private readonly ApplicationDbContext _context;
        public QuoteRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Quote> CreateAsync(Quote quoteModel)
        {
            await _context.Quotes.AddAsync(quoteModel);
            await _context.SaveChangesAsync();
            return quoteModel;
        }

        public async Task<Quote?> DeleteAsync(int id)
        {
            var QuoteModel = await _context.Quotes.FirstOrDefaultAsync(x => x.Id == id);

            if (QuoteModel == null)
            {
                return null;
            }

            _context.Quotes.Remove(QuoteModel);
            await _context.SaveChangesAsync();
            return QuoteModel;
        }

        public async Task<List<Quote>> GetAllAsync(QuoteQueryObject queryObject)
        {
            var Quotes = _context.Quotes.AsQueryable();

            if (!string.IsNullOrWhiteSpace(queryObject.Author))
            {
                Quotes = Quotes.Where(a => a.Author == queryObject.Author);
            };
            if (queryObject.Type != 0)
            {
                Quotes = Quotes.Where(a => a.Type == queryObject.Type);
            };

            return await Quotes.ToListAsync();
        }

        public async Task<Quote?> GetByIdAsync(int id)
        {
            return await _context.Quotes.FirstOrDefaultAsync(c => c.Id == id);
        }


        public async Task<Quote?> UpdateAsync(int id, QuoteUpdateDto updatedQuoteDto)
        {
            var existingQuote = await _context.Quotes.FirstOrDefaultAsync(x => x.Id == id);

            if (existingQuote == null)
            {
                return null;
            }

            existingQuote.UpdateFromDto(updatedQuoteDto);

            await _context.SaveChangesAsync();

            return existingQuote;
        }

    }
}