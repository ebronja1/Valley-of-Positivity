using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Dtos.Video
{  
    public class VideoDto
    {
        public int Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public string VideoUrl { get; set; } = string.Empty;

        public VideoType Type { get; set; }
    }
}