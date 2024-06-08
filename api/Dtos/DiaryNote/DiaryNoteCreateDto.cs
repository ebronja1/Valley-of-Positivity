using System;

namespace api.Dtos.DiaryNote
{
    public class DiaryNoteCreateDto
    {
        public string Content { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; } = DateTime.Now;
    }
}
