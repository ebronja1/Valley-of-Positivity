using System.Threading.Tasks;
using api.Models;

namespace api.Dtos.Quote
{  
    public class QuoteUpdateDto
    {

        public string? Text { get; set; }

        public string? Author { get; set; }

        public QuoteType? Type { get; set; }
    }
}