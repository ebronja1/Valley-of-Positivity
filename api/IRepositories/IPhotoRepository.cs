using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Photo;
using api.Models;
using api.QueryObjects;

namespace api.Repositories
{
    public interface IPhotoRepository
    {
        Task<List<Photo>> GetAllAsync(PhotoQueryObject queryObject);
        Task<Photo?> GetByIdAsync(int id);
        Task<Photo> CreateAsync(Photo photoModel);
        Task<Photo?> UpdateAsync(int id, PhotoUpdateDto photoUpdateDto);
        Task<Photo?> DeleteAsync(int id);
    }
}