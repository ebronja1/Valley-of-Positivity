using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Dtos.Quote
{  
    public class QuoteDto
    {
        public int Id { get; set; }

        public string Text { get; set; } = string.Empty;

        public string Author { get; set; } = string.Empty;

        public QuoteType Type { get; set; }
    }
}