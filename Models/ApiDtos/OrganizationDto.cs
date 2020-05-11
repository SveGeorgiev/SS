using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace SS.Models.ApiDtos
{
    public class OrganizationDto : BaseDto
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(150)]
        public string Name { get; set; }
        [MaxLength(300)]
        public string Description { get; set; }
        [Required]
        public int CityId { get; set; }
        public int? FileId { get; set; }
        public IFormFile File { get; set; }
        public bool IsDeleted { get; set; }

        public OrganizationDto() { }

        public OrganizationDto(Organization organization, bool isDeleted = false)
        {
            CopyEntityData(organization, isDeleted);
        }

        private void CopyEntityData(Organization organization, bool isDeleted)
        {
            Id = organization.Id;
            Name = organization.Name;
            Description = organization.Description;
            CityId = organization.CityId;
            FileId = organization.FileId;
            IsDeleted = isDeleted;
        }

        public void UpdateEntity(Organization organization)
        {
            organization.Id = Id;
            organization.Name = Name;
            organization.Description = Description;
            organization.CityId = CityId;
            organization.FileId = FileId;

            if (File != null)
            {
                organization.File = ResizeImage(File);
            }
        }
    }
}
