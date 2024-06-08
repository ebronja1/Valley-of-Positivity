using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Dtos.Quote
{  
    public class QuoteCreateDto
    {

        public string Text { get; set; } = string.Empty;

        public string Author { get; set; } = string.Empty;

        public QuoteType Type { get; set; }
    }
}