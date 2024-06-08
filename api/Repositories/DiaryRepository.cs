using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.QueryObjects;
using api.Interfaces;
using Microsoft.EntityFrameworkCore;
using api.Models;
using api.Mappers;
using api.Dtos.Diary;

namespace api.Repositories
{
    public class DiaryRepository : IDiaryRepository
    {
        private readonly ApplicationDbContext _context;
        public DiaryRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Diary> CreateAsync(Diary diaryModel)
        {
            await _context.Diaries.AddAsync(diaryModel);
            await _context.SaveChangesAsync();
            return diaryModel;
        }

        public async Task<Diary?> DeleteAsync(int id)
        {
            var diaryModel = await _context.Diaries.FirstOrDefaultAsync(x => x.Id == id);

            if (diaryModel == null)
            {
                return null;
            }

            _context.Diaries.Remove(diaryModel);
            await _context.SaveChangesAsync();
            return diaryModel;
        }

        public async Task<List<Diary>> GetAllAsync(DiaryQueryObject diaryQueryObject)
        {
            var diaries = _context.Diaries.AsQueryable();

            if (!string.IsNullOrWhiteSpace(diaryQueryObject.Title))
            {
                diaries = diaries.Where(a => a.Title == diaryQueryObject.Title);
            };
        
            return await diaries.ToListAsync();
        }

        public async Task<Diary?> GetByIdAsync(int id)
        {
            return await _context.Diaries.FirstOrDefaultAsync(c => c.Id == id);
        }


        public async Task<Diary?> UpdateAsync(int id, DiaryUpdateDto diaryUpdateDto)
        {
            var existingDiary = await _context.Diaries.FirstOrDefaultAsync(x => x.Id == id);

            if (existingDiary == null)
            {
                return null;
            }

            existingDiary.UpdateFromDto(diaryUpdateDto);

            await _context.SaveChangesAsync();

            return existingDiary;
        }

    }
}