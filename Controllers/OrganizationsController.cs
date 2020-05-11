using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SS.Data;
using SS.Models;
using SS.Models.ApiDtos;


namespace SS.Controllers
{
    // [Authorize]
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class OrganizationsController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public OrganizationsController(ApplicationDbContext context)
        {
            dbContext = context;
        }

        // GET: api/Organizations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Organization>>> GetOrganizations()
        {
            return await dbContext.Organizations
                .Include(o => o.City)
                .ToListAsync();
        }

        [HttpGet("GetOrganizationsByCity/{cityId}")]
        public async Task<ActionResult<IEnumerable<Organization>>> GetOrganizationsByCity(int cityId)
        {
            return await dbContext.Organizations
                .Include(o => o.City)
                .Where(o => o.CityId == cityId)
                .ToListAsync();
        }

        // GET: api/Organizations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Organization>> GetOrganization(int id)
        {
            var organization = await dbContext.Organizations
                .Include(o => o.City)
                .Include(o => o.Members)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (organization == null)
            {
                return NotFound();
            }

            return organization;
        }

        // PUT: api/Organizations/5
        [HttpPut]
        public async Task PutOrganization([FromForm]OrganizationDto organizationDto)
        {
            Organization organization = await dbContext.Organizations
                .Include(o => o.File)
                .FirstOrDefaultAsync(o => o.Id == organizationDto.Id);

            if (organizationDto.File != null && organization.File != null)
            {
                dbContext.Files.Remove(organization.File);
            }

            organizationDto.UpdateEntity(organization);
            await dbContext.SaveChangesAsync();
        }

        // POST: api/Organizations
        [HttpPost]
        public async Task PostOrganization([FromForm]OrganizationDto organizationDto)
        {
            var newOrganization = new Organization();
            organizationDto.UpdateEntity(newOrganization);

            dbContext.Organizations.Add(newOrganization);
            await dbContext.SaveChangesAsync();
        }

        // DELETE: api/Organizations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<OrganizationDto>> DeleteOrganization(int id)
        {
            Organization organization = await dbContext.Organizations.Include(o => o.File).FirstOrDefaultAsync(o => o.Id == id);

            if (organization == null)
            {
                return NotFound();
            }

            if (await dbContext.Members.AnyAsync(m => m.OrganizationId == id))
            {
                return new OrganizationDto(organization);
            }

            if (organization.FileId.HasValue)
            {
                dbContext.Files.Remove(organization.File);
            }

            dbContext.Organizations.Remove(organization);
            await dbContext.SaveChangesAsync();

            return new OrganizationDto(organization, true);
        }
    }
}
