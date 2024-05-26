using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Dtos.Photo
{
    public class PhotoUpdateDto
    {
        public string? Title { get; set; }
        public PhotoType? Type { get; set; }

        public string? ImageUrl { get; set; }
    }
}