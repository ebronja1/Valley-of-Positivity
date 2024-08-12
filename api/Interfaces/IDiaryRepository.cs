using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Mappers;
using api.Models;
using api.QueryObjects;
using api.Dtos.Diary;

namespace api.Interfaces
{
    public interface IDiaryRepository
    {
        Task<List<Diary>> GetAllAsync(DiaryQueryObject diaryQueryObject);
        Task<Diary?> GetByIdAsync(int id);
        Task<Diary> CreateAsync(Diary DiaryModel);
        Task<Diary?> UpdateAsync(int id, DiaryUpdateDto diaryUpdateDto);
        Task<Diary?> DeleteAsync(int id);
        Task<Diary?> GetByUserIdAsync(string userId);
    }
}