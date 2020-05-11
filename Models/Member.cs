using System.ComponentModel.DataAnnotations;

namespace SS.Models
{
    public class Member
    {
        public int Id { get; set; }
        public int? Number { get; set; }
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
        [MaxLength(100)]
        public string Location { get; set; }
        [MaxLength(100)]
        public string Workplace { get; set; }
        [MaxLength(20)]
        public string YearOfBirth { get; set; }
        [MaxLength(50)]
        public string PhoneNumber { get; set; }
        [MaxLength(50)]
        public string Car { get; set; }
        [Required]
        public int OrganizationId { get; set; }
        public Organization Organization { get; set; }
        public int? FileId { get; set; }
        public File File { get; set; }
    }
}
