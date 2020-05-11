using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Headers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using SS.Data;
using SS.Models;

namespace SS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;
        private const double LastModifiedEpsilonSeconds = 1;

        public ImageController(ApplicationDbContext context)
        {
            dbContext = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<File>> GetImage(int id)
        {
            File image = dbContext.Files.SingleOrDefault(f => f.Id == id);

            if (image == null)
            {
                return NotFound();
            }

            if (DateTime.TryParse(HttpContext.Request.Headers["If-Modified-Since"], out DateTime lastModified) && lastModified.AddSeconds(LastModifiedEpsilonSeconds) >= image.LastModified)
            {
                return StatusCode(304);
            }

            ResponseHeaders responseHeaders = HttpContext.Response.GetTypedHeaders();
            responseHeaders.CacheControl = new CacheControlHeaderValue
            {
                Private = true,
                MaxAge = TimeSpan.FromDays(365)
            };
            responseHeaders.LastModified = image.LastModified;
            responseHeaders.Expires = DateTime.UtcNow.AddDays(365);

            HttpContext.Response.ContentType = image.MimeType;
            await HttpContext.Response.Body.WriteAsync(image.Content, 0, image.Content.Length);
            await HttpContext.Response.Body.FlushAsync();

            return image;
        }
    }
}