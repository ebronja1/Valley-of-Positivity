using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class ActionData
    {
        public int Id { get; set; }        
        
        
        [Required]
        [StringLength(100)]
        public string Action { get; set; } = string.Empty;
        
        [Required]
        [StringLength(100)]
        public string Element { get; set; } = string.Empty;
       
        public DateTime Timestamp { get; set; } = DateTime.Now;
        // Dodajte dodatne informacije koje želite pratiti

        // Foreign key for AppUser
        [Required]
        public string AppUserId { get; set; } = string.Empty;

        public AppUser? AppUser { get; set; }
    }
}