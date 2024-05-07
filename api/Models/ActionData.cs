using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class ActionData
    {
        [Required]
        public string Id { get; set; } = string.Empty;      
        
        [Required]
        [StringLength(100)]
        public string Action { get; set; } = string.Empty;
        
        [Required]
        [StringLength(100)]
        public string ElementClass { get; set; } = string.Empty;
       
        public DateTime Timestamp { get; set; } = DateTime.Now;
        
        [Required]
        public int Quantity { get; set; } = 0;
        
        // Foreign key for AppUser
        [Required]
        public string AppUserId { get; set; } = string.Empty;

        public AppUser? AppUser { get; set; }
    }
}