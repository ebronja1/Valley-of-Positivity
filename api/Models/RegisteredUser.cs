using System.ComponentModel.DataAnnotations;


namespace api.Models
{
    public class RegisteredUser : Person
    {
        [Required]
        public DateTime RegistrationDate { get; set; }

        // Navigation property for Actions (one-to-many)
        public List<Action> Actions { get; set; } = new List<Action>();
    }
}