using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.QueryObjects
{ 
    public class VideoQueryObject 
    {
        public string Title { get; set; } = string.Empty;

        public VideoType Type { get; set; } = 0;
    }
}