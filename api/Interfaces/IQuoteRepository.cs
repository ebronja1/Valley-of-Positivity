using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.QueryObjects;

namespace api.Interfaces
{
    public interface IQuoteRepository
    {
        Task<List<Quote>> GetAllAsync(QuoteQueryObject queryObject);
        Task<Quote?> GetByIdAsync(int id);
        Task<Quote> CreateAsync(Quote QuoteModel);
        Task<Quote?> UpdateAsync(int id, Quote QuoteModel);
        Task<Quote?> DeleteAsync(int id);
    }
}