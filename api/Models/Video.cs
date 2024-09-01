using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace api.Models
{

    public class Video
    {
        public int Id { get; set; }
        [Required]
        [StringLength(100)]
        public string Title { get; set; } = string.Empty;
        
        [Required]
        [StringLength(500)]
        public string VideoUrl { get; set; } = string.Empty;
        
        public VideoType Type { get; set; }
    }
}