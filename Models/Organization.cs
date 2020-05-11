using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SS.Models
{
    public class Organization
    {
        public Organization()
        {
            Members = new HashSet<Member>();
        }

        public int Id { get; set; }
        [Required]
        [MaxLength(150)]
        public string Name { get; set; }
        [MaxLength(300)]
        public string Description { get; set; }

        [Required]
        public int CityId { get; set; }
        public City City { get; set; }

        public int? FileId { get; set; }
        public File File { get; set; }

        public IEnumerable<Member> Members { get; set; }
    }
}
