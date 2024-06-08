using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.DiaryNote;

namespace api.Dtos.Diary
{
    public class DiaryDto
    {
        public int Id { get; set; }

        public string AppUserId { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;

        public List<DiaryNoteDto>? DiaryNotes { get; set; }
    }
}