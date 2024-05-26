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

        public static void UpdateFromDto(this Quote quote, QuoteUpdateDto dto)
        {
            if (dto.Text != null)
            {
                quote.Text = dto.Text;
            }
            if (dto.Author != null)
            {
                quote.Author = dto.Author;
            }
            if (dto.Type.HasValue)
            {
                quote.Type = dto.Type.Value;
            }
        }

    }
}