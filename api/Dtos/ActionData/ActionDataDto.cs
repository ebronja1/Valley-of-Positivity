using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.ActionData
{
    public class ActionDataDto
    {
        public int Id { get; set; }
        
        public string Action { get; set; } = string.Empty;
        
        public string ElementClass { get; set; } = string.Empty;
        
        public int Quantity { get; set; } = 0;
        
        public DateTime Timestamp { get; set; } = DateTime.Now;

        public string AppUserId { get; set; } = string.Empty;
    }
}