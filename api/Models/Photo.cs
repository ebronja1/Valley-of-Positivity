using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace api.Models
{

    public class Photo
    {
        public int Id { get; set; }
        [Required]
        [StringLength(100)]
        public string Title { get; set; } = string.Empty;
        
        [Required]
        [StringLength(500)]
        public string ImageUrl { get; set; } = string.Empty;
        
        public PhotoType Type { get; set; }
    }
}