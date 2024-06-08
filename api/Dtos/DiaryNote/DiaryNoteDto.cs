using System;

namespace api.Dtos.DiaryNote
{
    public class DiaryNoteDto
    {
        public int Id { get; set; }
        public string Content { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; } = DateTime.Now;
        public int DiaryId { get; set; }
    }
}
