using Microsoft.AspNetCore.Http;
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using LazZiya.ImageResize;

namespace SS.Models.ApiDtos
{
    public class BaseDto
    {
        public File ResizeImage(IFormFile file)
        {
            using (var stream = file.OpenReadStream())
            {
                var uploadedImage = Image.FromStream(stream);
                var ms = new MemoryStream();

                if (uploadedImage.Width > 640 && uploadedImage.Height > 480)
                {
                    Image img = ImageResize.Scale(uploadedImage, 640, 480);
                    img.Save(ms, ImageFormat.Png);
                }
                else
                {
                    Image img = ImageResize.Scale(uploadedImage, uploadedImage.Width, uploadedImage.Height);
                    img.Save(ms, ImageFormat.Png);
                }

                return new File
                {
                    FileName = file.FileName,
                    MimeType = file.ContentType,
                    Content = ms.ToArray(),
                    LastModified = DateTime.Now.ToUniversalTime()
                };
            }
        }
    }
}
