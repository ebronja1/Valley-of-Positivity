using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.QueryObjects
{
    public class ActionDataQueryObject
    {
        public DateTime? Timestamp { get; set; }

        public string ElementClass { get; set; } = string.Empty;
        public string AppUserId { get; set; } = string.Empty;
        public string Action { get; set; } = string.Empty;
        public bool IsDecsending { get; set; } = false;
    }
}