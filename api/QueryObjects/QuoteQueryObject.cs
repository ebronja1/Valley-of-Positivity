using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.QueryObjects
{ 
    public class QuoteQueryObject 
    {
        public string Author { get; set; } = string.Empty;

        public QuoteType Type { get; set; } = 0;
    }
}