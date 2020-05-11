using System;
using System.ComponentModel.DataAnnotations;

namespace SS.Models
{
    public class File
    {
        public int Id { get; set; }

        [MaxLength(256)]
        [Required]
        public string FileName { get; set; }

        [Required]
        [MaxLength(256)]
        public string MimeType { get; set; }

        [Required]
        public DateTime LastModified { get; set; }

        public byte[] Content { get; set; }
    }
}
