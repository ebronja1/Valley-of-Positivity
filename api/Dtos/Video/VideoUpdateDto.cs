using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Dtos.Video
{
    public class VideoUpdateDto
    {
        public string? Title { get; set; }
        public VideoType? Type { get; set; }

        public string? VideoUrl { get; set; }
    }
}