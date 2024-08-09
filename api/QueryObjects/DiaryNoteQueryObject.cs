using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.QueryObjects
{ 
    public class DiaryNoteQueryObject 
    {
        public bool IsDecsending { get; set; } = false;
        public int diaryId {get; set;} = 0;
    }
}