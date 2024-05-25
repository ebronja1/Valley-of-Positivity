using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Quote;
using api.Models;

namespace api.Mappers
{
    public static class QuoteMapper
    {
        public static QuoteDto ToQuoteDto(this Quote quoteModel)
        {
            return new QuoteDto
            {
                Id = quoteModel.Id,
                Text = quoteModel.Text,
                Author = quoteModel.Author,
                Type = quoteModel.Type,
            };
        }

        public static Quote ToQuoteFromCreateDto (this QuoteCreateDto quoteCreateDto)
        {
            return new Quote
            {
                Text = quoteCreateDto.Text,
                Author = quoteCreateDto.Author,
                Type = quoteCreateDto.Type,
            };
        }
        public static Quote ToQuoteFromUpdateDto (this QuoteUpdateDto quoteUpdateDto)
        {
            return new Quote
            {
                Text = quoteUpdateDto.Text,
                Author = quoteUpdateDto.Author,
                Type = quoteUpdateDto.Type,
            };
        }

    }
}