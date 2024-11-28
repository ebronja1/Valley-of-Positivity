using api.Data;
using api.QueryObjects;
using Microsoft.EntityFrameworkCore;
using api.Models;
using api.Mappers;
using api.Dtos.Photo;

namespace api.Repositories
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly ApplicationDbContext _context;
        public PhotoRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Photo> CreateAsync(Photo photoModel)
        {
            await _context.Photos.AddAsync(photoModel);
            await _context.SaveChangesAsync();
            return photoModel;
        }

        public async Task<Photo?> DeleteAsync(int id)
        {
            var photoModel = await _context.Photos.FirstOrDefaultAsync(x => x.Id == id);

            if (photoModel == null)
            {
                return null;
            }

            _context.Photos.Remove(photoModel);
            await _context.SaveChangesAsync();
            return photoModel;
        }

        public async Task<List<Photo>> GetAllAsync(PhotoQueryObject queryObject)
        {
            var photos = _context.Photos.AsQueryable();

            if (!string.IsNullOrWhiteSpace(queryObject.Title))
            {
                photos = photos.Where(a => a.Title == queryObject.Title);
            };
            if (queryObject.Type != 0)
            {
                photos = photos.Where(a => a.Type == queryObject.Type);
            };

            return await photos.ToListAsync();
        }

        public async Task<Photo?> GetByIdAsync(int id)
        {
            return await _context.Photos.FirstOrDefaultAsync(c => c.Id == id);
        }


        public async Task<Photo?> UpdateAsync(int id, PhotoUpdateDto updatePhotoDto)
        {
            var existingPhoto = await _context.Photos.FirstOrDefaultAsync(x => x.Id == id);

            if (existingPhoto == null)
            {
                return null;
            }

            existingPhoto.UpdateFromDto(updatePhotoDto);

            await _context.SaveChangesAsync();

            return existingPhoto;
        }

    }
}