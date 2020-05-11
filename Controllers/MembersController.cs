using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SS.Data;
using SS.Models;
using SS.Models.ApiDtos;
using Microsoft.AspNetCore.Authorization;

namespace SS.Controllers
{
    // [Authorize]
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class MembersController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public MembersController(ApplicationDbContext context)
        {
            dbContext = context;
        }

        // GET: api/Members
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Member>>> GetMembers()
        {
            return await dbContext.Members
                .Include(m => m.Organization)
                .OrderBy(o => o.Number)
                .ToListAsync();
        }

        [HttpGet("GetMembers/{organizationId}")]
        public async Task<ActionResult<IEnumerable<Member>>> GetMembers(int organizationId)
        {
            return await dbContext.Members
                .Include(m => m.Organization)
                .Where(m => m.OrganizationId == organizationId)
                .OrderBy(o => o.Number).ToListAsync();
        }

        // GET: api/Members/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Member>> GetMember(int id)
        {
            var member = await dbContext.Members.Include(m => m.Organization).FirstOrDefaultAsync(m => m.Id == id);

            if (member == null)
            {
                return NotFound();
            }

            return member;
        }

        // PUT: api/Members/5
        [HttpPut]
        public async Task PutMember([FromForm]MemberDto memberDto)
        {
            Member member = await dbContext.Members
                .Include(m => m.File)
                .FirstOrDefaultAsync(m => m.Id == memberDto.Id);

            if (memberDto.File != null && member.File != null)
            {
                dbContext.Files.Remove(member.File);
            }
            
            memberDto.UpdateEntity(member);
            await dbContext.SaveChangesAsync();
        }

        // POST: api/Members
        [HttpPost]
        public async Task PostMember([FromForm]MemberDto memberDto)
        {
            var newMember = new Member();
            memberDto.UpdateEntity(newMember);

            dbContext.Members.Add(newMember);
            await dbContext.SaveChangesAsync();
        }

        // DELETE: api/Members/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Member>> DeleteMember(int id)
        {
            Member member = await dbContext.Members.Include(m => m.File).FirstOrDefaultAsync(m => m.Id == id);

            if (member == null)
            {
                return NotFound();
            }

            if (member.FileId.HasValue)
            {
                dbContext.Files.Remove(member.File);
            }

            dbContext.Members.Remove(member);
            await dbContext.SaveChangesAsync();

            return member;
        }
    }
}
