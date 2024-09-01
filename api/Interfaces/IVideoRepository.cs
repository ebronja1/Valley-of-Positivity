using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Video;
using api.Models;
using api.QueryObjects;

namespace api.Interfaces
{
    public interface IVideoRepository
    {
        Task<List<Video>> GetAllAsync(VideoQueryObject queryObject);
        Task<Video?> GetByIdAsync(int id);
        Task<Video> CreateAsync(Video videoModel);
        Task<Video?> UpdateAsync(int id, VideoUpdateDto videoUpdateDto);
        Task<Video?> DeleteAsync(int id);
    }
}