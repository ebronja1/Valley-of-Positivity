using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class ActionData
    {
        public int Id { get; set; }        
        
        public int UserId { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Action { get; set; } = string.Empty;
        
        [Required]
        [StringLength(100)]
        public string Element { get; set; } = string.Empty;
       
        public DateTime Timestamp { get; set; } = DateTime.Now;
        // Dodajte dodatne informacije koje želite pratiti

        // Foreign key for RegisteredUser
        public int RegisteredUserId { get; set; }
        public RegisteredUser? RegisteredUser { get; set; } // Navigation property
    }
}