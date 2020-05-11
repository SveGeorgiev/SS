using System.ComponentModel.DataAnnotations;

namespace SS.Models
{
    public class City
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
    }
}
