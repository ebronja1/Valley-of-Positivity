using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.IRepositories;
using api.Models;
using api.QueryObjects;
using api.Dtos.DiaryNote;
using api.Mappers;

namespace api.Repositories
{
    public class DiaryNoteRepository : IDiaryNoteRepository
    {
        private readonly ApplicationDbContext _context;

        public DiaryNoteRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<DiaryNote?> GetByIdAsync(int id)
        {
            return await _context.DiaryNotes.FirstOrDefaultAsync(dn => dn.Id == id);
        }

        public async Task<IEnumerable<DiaryNote>> GetAllAsync(DiaryNoteQueryObject query)
        {
            var diaryNotes = _context.DiaryNotes.AsQueryable();
            
            if (query.IsDecsending == true)
            {
                diaryNotes = diaryNotes.OrderByDescending(dn => dn.Timestamp);
            }
            return await _context.DiaryNotes.ToListAsync();
        }

        public async Task<DiaryNote> CreateAsync(DiaryNote diaryNote)
        {
            await _context.DiaryNotes.AddAsync(diaryNote);
            await _context.SaveChangesAsync();
            return diaryNote;
        }

        public async Task<DiaryNote> UpdateAsync(int id, DiaryNoteUpdateDto diaryNoteUpdateDto)
        {
            var existingDiaryNote = await _context.DiaryNotes.FirstOrDefaultAsync(dn => dn.Id == id);
            
            if (existingDiaryNote == null)
            {
                return null;
            }

            existingDiaryNote.Content = diaryNoteUpdateDto.Content;

            await _context.SaveChangesAsync();
            return existingDiaryNote;
        }

        public async Task<DiaryNote?> DeleteAsync(int id)
        {
            var existingDiaryNote = await _context.DiaryNotes.FirstOrDefaultAsync(dn => dn.Id == id);
            
            if (existingDiaryNote == null)
            {
                return null;
            }

            _context.DiaryNotes.Remove(existingDiaryNote);
            await _context.SaveChangesAsync();
            return existingDiaryNote;
        }
    }
}
