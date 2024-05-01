using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class DiaryNote
    {
        public int Id { get; set; }        
        
        [Required]
        [StringLength(100)]
        public string Content { get; set; } = string.Empty;

        public DateTime Timestamp { get; set; } = DateTime.Now;
        // Dodajte dodatne informacije koje želite pratiti

        // Foreign key for Diary
        public int DiaryId { get; set; }
        public Diary? Diary { get; set; } // Navigation property
    }
}