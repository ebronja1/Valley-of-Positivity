using api.Models;
using api.Dtos.DiaryNote;

namespace api.Mappers
{
    public static class DiaryNoteMapper
    {
        public static DiaryNoteDto ToDiaryNoteDto(this DiaryNote diaryNote)
        {
            return new DiaryNoteDto
            {
                Id = diaryNote.Id,
                Content = diaryNote.Content,
                Timestamp = diaryNote.Timestamp,
                DiaryId = diaryNote.DiaryId
            };
        }

        public static DiaryNote ToDiaryNote(this DiaryNoteCreateDto diaryNoteCreateDto)
        {
            return new DiaryNote
            {
                Content = diaryNoteCreateDto.Content,
                Timestamp = diaryNoteCreateDto.Timestamp,
            };
        }
    }
}
