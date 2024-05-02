using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;


namespace api.Models
{
    public class AppUser : IdentityUser
    {
        
        // Navigation property for the diary
        public Diary? Diary { get; set; }
        // Navigation property for Actions (one-to-many)
        public List<ActionData> ActionDatas { get; set; } = new List<ActionData>();
    }
}