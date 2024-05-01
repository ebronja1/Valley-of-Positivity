using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Quote
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Text { get; set; } = string.Empty;
        
        [Required]
        [StringLength(100)]
        public string Author { get; set; } = string.Empty;
        
        public QuoteType Type { get; set; }
    }
}