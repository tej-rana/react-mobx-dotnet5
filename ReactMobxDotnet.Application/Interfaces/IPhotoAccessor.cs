using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using ReactMobxDotnet.Application.Photos;

namespace ReactMobxDotnet.Application.Interfaces
{
    public interface IPhotoAccessor
    {
        Task<PhotoUploadResult> AddPhoto(IFormFile file);
        Task<string> DeletePhoto(string publicId);
    }
}