using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.ActionData
{
    public class ActionDataUpdateDto
    {
        public string? Action { get; set; }
        public string? ElementClass { get; set; }
        public DateTime? Timestamp { get; set; }
        public int? Quantity { get; set; }
    }
}