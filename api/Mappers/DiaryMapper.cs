using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Diary;
using api.Models;

namespace api.Mappers
{
    public static class DiaryMapper
    {
        public static DiaryDto ToDiaryDto(this Diary diaryModel)
        {
            return new DiaryDto
            {
                Id = diaryModel.Id,
                Title = diaryModel.Title,
                DiaryNotes = diaryModel.DiaryNotes.Select(c => c.ToDiaryNoteDto()).ToList()
            };
        }

        public static Diary ToDiaryFromCreateDto (this DiaryCreateDto diaryCreateDto)
        {
            return new Diary
            {
                Title = diaryCreateDto.Title
            };
        }
        public static void UpdateFromDto(this Diary Diary, DiaryUpdateDto dto)
        {
            if (dto.Title != null)
            {
                Diary.Title = dto.Title;
            }
        }
    }

}