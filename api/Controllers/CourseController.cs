using api.Models;

namespace api.Controllers;

public class CourseController(ICourseRepository _courseRepository) : BaseApiController
{
    [HttpPost]
    public async Task<ActionResult<Course>> Create(Course courseIn, CancellationToken cancellationToken)
    {
        return await _courseRepository.CreateAsync(courseIn, cancellationToken);
    }

    [HttpGet("get-all")]
    public async Task<ActionResult<IEnumerable<Course>>> GetAll(CancellationToken cancellationToken)
    {
        return await _courseRepository.GetAllAsync(cancellationToken);
    }
}
