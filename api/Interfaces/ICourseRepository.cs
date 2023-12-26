using api.Models;

namespace api.Interfaces;

public interface ICourseRepository
{
    Task<Course> CreateAsync(Course courseIn, CancellationToken cancellationToken);
    Task<List<Course>> GetAllAsync(CancellationToken cancellationToken);
}
