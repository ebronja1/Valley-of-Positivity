using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Photo;
using api.Models;

namespace api.Mappers
{
    public static class PhotoMapper
    {
        public static PhotoDto ToPhotoDto(this Photo photoModel)
        {
            return new PhotoDto
            {
                Id = photoModel.Id,
                Title = photoModel.Title,
                ImageUrl = photoModel.ImageUrl,
                Type = photoModel.Type,
            };
        }

        public static Photo ToPhotoFromCreateDto (this PhotoCreateDto photoCreateDto)
        {
            return new Photo
            {
                Title = photoCreateDto.Title,
                ImageUrl = photoCreateDto.ImageUrl,
                Type = photoCreateDto.Type,
            };
        }
        public static Photo ToPhotoFromUpdateDto (this PhotoUpdateDto photoUpdateDto)
        {
            return new Photo
            {
                Title = photoUpdateDto.Title,
                ImageUrl = string.Empty,
                Type = photoUpdateDto.Type,
            };
        }

    }
}