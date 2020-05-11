using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SS.Data;
using SS.Models;
using Microsoft.AspNetCore.Authorization;
using SS.Models.ApiDtos;
using System.Net.Http;
using System.Net;
using System;

namespace SS.Controllers
{
    // [Authorize]
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class CitiesController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public CitiesController(ApplicationDbContext context)
        {
            dbContext = context;
        }

        // GET: api/Cities
        [HttpGet]
        public async Task<ActionResult<IEnumerable<City>>> GetCities()
        {
            return await dbContext.Cities.ToListAsync();
        }

        // GET: api/Cities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<City>> GetCity(int id)
        {
            var city = await dbContext.Cities.FindAsync(id);

            if (city == null)
            {
                return NotFound();
            }

            return city;
        }

        // PUT: api/Cities/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCity(int id, City city)
        {
            if (id != city.Id)
            {
                return BadRequest();
            }

            dbContext.Entry(city).State = EntityState.Modified;

            try
            {
                await dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CityExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Cities
        [HttpPost]
        public async Task<ActionResult<City>> PostCity(City city)
        {
            dbContext.Cities.Add(city);
            await dbContext.SaveChangesAsync();

            return CreatedAtAction("GetCity", new { id = city.Id }, city);
        }

        // DELETE: api/Cities/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<CityDto>> DeleteCity(int id)
        {
            City city = await dbContext.Cities.FindAsync(id);

            if (city == null)
            {
                return NotFound();
            }

            if (await dbContext.Organizations.AnyAsync(o => o.CityId == id))
            {
                return new CityDto(city);
            }

            dbContext.Cities.Remove(city);
            await dbContext.SaveChangesAsync();


            return new CityDto(city, true);
        }

        private bool CityExists(int id)
        {
            return dbContext.Cities.Any(e => e.Id == id);
        }
    }
}
