using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Diary
    {
        public int Id { get; set; }
        
        public string Title { get; set; } = string.Empty;
        
        // Foreign key property
        [Required]
        public string AppUserId { get; set; } = string.Empty;
    
        // Navigation property for the user
        public AppUser? AppUser { get; set; }

        // Navigation property for DiaryNotes (one-to-many)
        public List<DiaryNote> DiaryNotes { get; set; } = new List<DiaryNote>();
    }
}