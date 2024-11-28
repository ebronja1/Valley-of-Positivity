using api.Models;
using api.Dtos.Quote;
using api.QueryObjects;

namespace api.Repositories
{
    public interface IQuoteRepository
    {
        Task<List<Quote>> GetAllAsync(QuoteQueryObject queryObject);
        Task<Quote?> GetByIdAsync(int id);
        Task<Quote> CreateAsync(Quote QuoteModel);
        Task<Quote?> UpdateAsync(int id, QuoteUpdateDto quoteUpdateDto);
        Task<Quote?> DeleteAsync(int id);
    }
}