using System.Collections.Generic;
using System.Threading.Tasks;
using api.Dtos.DiaryNote;
using api.Models;
using api.QueryObjects;

namespace api.Interfaces
{
    public interface IDiaryNoteRepository
    {
        Task<DiaryNote?> GetByIdAsync(int id);
        Task<IEnumerable<DiaryNote>> GetAllAsync(DiaryNoteQueryObject query);
        Task<DiaryNote> CreateAsync(DiaryNote diaryNote);
        Task<DiaryNote> UpdateAsync(int id, DiaryNoteUpdateDto diaryNoteUpdateDto);
        Task<DiaryNote?> DeleteAsync(int id);
    }
}
