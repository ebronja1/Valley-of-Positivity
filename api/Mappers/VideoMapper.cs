using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Video;
using api.Models;

namespace api.Mappers
{
    public static class VideoMapper
    {
        public static VideoDto ToVideoDto(this Video videoModel)
        {
            return new VideoDto
            {
                Id = videoModel.Id,
                Title = videoModel.Title,
                VideoUrl = videoModel.VideoUrl,
                Type = videoModel.Type,
            };
        }

        public static Video ToVideoFromCreateDto (this VideoCreateDto videoCreateDto)
        {
            return new Video
            {
                Title = videoCreateDto.Title,
                VideoUrl = videoCreateDto.VideoUrl,
                Type = videoCreateDto.Type,
            };
        }
        public static void UpdateFromDto(this Video video, VideoUpdateDto dto)
        {
            if (dto.Title != null)
            {
                video.Title = dto.Title;
            }
            if (dto.VideoUrl != null)
            {
                video.VideoUrl = dto.VideoUrl;
            }
            if (dto.Type.HasValue)
            {
                video.Type = dto.Type.Value;
            }
        }
    }

}
