using System.ComponentModel.DataAnnotations;


namespace api.Models
{
    public class Diary
    {
        public int Id { get; set; }
        
        // Navigation property for DiaryNotes (one-to-many)
        public List<DiaryNote> DiaryNotes { get; set; } = new List<DiaryNote>();
    }
}