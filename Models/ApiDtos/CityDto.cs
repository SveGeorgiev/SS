namespace SS.Models.ApiDtos
{
    public class CityDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsDeleted { get; set; }

        public CityDto() { }
        public CityDto(City city, bool isDeleted = false)
        {
            Id = city.Id;
            Name = city.Name;
            IsDeleted = isDeleted;
        }
    }
}
