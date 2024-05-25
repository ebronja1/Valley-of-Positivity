using System.Threading.Tasks;
using api.Models;

namespace api.Dtos.Quote
{  
    public class QuoteUpdateDto
    {

        public string Text { get; set; } = string.Empty;

        public string Author { get; set; } = string.Empty;

        public QuoteType Type { get; set; }
    }
}