using api.Data;
using api.QueryObjects;
using Microsoft.EntityFrameworkCore;
using api.Models;
using api.Mappers;
using api.Dtos.Video;

namespace api.Repositories
{
    public class VideoRepository : IVideoRepository
    {
        private readonly ApplicationDbContext _context;
        public VideoRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Video> CreateAsync(Video videoModel)
        {
            await _context.Videos.AddAsync(videoModel);
            await _context.SaveChangesAsync();
            return videoModel;
        }

        public async Task<Video?> DeleteAsync(int id)
        {
            var videoModel = await _context.Videos.FirstOrDefaultAsync(x => x.Id == id);

            if (videoModel == null)
            {
                return null;
            }

            _context.Videos.Remove(videoModel);
            await _context.SaveChangesAsync();
            return videoModel;
        }

        public async Task<List<Video>> GetAllAsync(VideoQueryObject queryObject)
        {
            var videos = _context.Videos.AsQueryable();

            if (!string.IsNullOrWhiteSpace(queryObject.Title))
            {
                videos = videos.Where(a => a.Title == queryObject.Title);
            };
            if (queryObject.Type != 0)
            {
                videos = videos.Where(a => a.Type == queryObject.Type);
            };

            return await videos.ToListAsync();
        }

        public async Task<Video?> GetByIdAsync(int id)
        {
            return await _context.Videos.FirstOrDefaultAsync(c => c.Id == id);
        }


        public async Task<Video?> UpdateAsync(int id, VideoUpdateDto updateVideoDto)
        {
            var existingVideo = await _context.Videos.FirstOrDefaultAsync(x => x.Id == id);

            if (existingVideo == null)
            {
                return null;
            }

            existingVideo.UpdateFromDto(updateVideoDto);

            await _context.SaveChangesAsync();

            return existingVideo;
        }

    }
}