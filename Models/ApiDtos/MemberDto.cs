using LazZiya.ImageResize;
using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Threading.Tasks;


namespace SS.Models.ApiDtos
{
    public class MemberDto : BaseDto
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
        public IFormFile File { get; set; }

        public MemberDto() { }

        public MemberDto(Member member)
        {
            CopyEntityData(member);
        }

        private void CopyEntityData(Member member)
        {
            Id = member.Id;
            Number = member.Number;
            Name = member.Name;
            Location = member.Location;
            Workplace = member.Workplace;
            YearOfBirth = member.YearOfBirth;
            PhoneNumber = member.PhoneNumber;
            Car = member.Car;
            OrganizationId = member.OrganizationId;
            FileId = member.FileId;
        }

        public void UpdateEntity(Member member)
        {
            member.Id = Id;
            member.Number = Number;
            member.Name = Name;
            member.Location = Location;
            member.Workplace = Workplace;
            member.YearOfBirth = YearOfBirth;
            member.PhoneNumber = PhoneNumber;
            member.Car = Car;
            member.OrganizationId = OrganizationId;
            member.FileId = FileId;

            if (File != null)
            {
                member.File = ResizeImage(File);
            }
        }
    }
}

