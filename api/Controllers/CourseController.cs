using api.Models;

namespace api.Controllers;

public class CourseController(ICourseRepository _courseRepository) : BaseApiController
{
    [HttpPost] // just a simple post end point to input mock obj
    public async Task<ActionResult<Course>> Create(Course courseIn, CancellationToken cancellationToken)
    {
        return await _courseRepository.CreateAsync(courseIn, cancellationToken);
    }

    [HttpGet("get-all")]
    public async Task<ActionResult<IEnumerable<Course>>> GetAll(CancellationToken cancellationToken)
    {
        return await _courseRepository.GetAllAsync(cancellationToken);
    }

    [HttpGet("get-by-id/{courseId}")]
    public async Task<ActionResult<Course>> GetById(string courseId, CancellationToken cancellationToken)
    {
        Course? course = await _courseRepository.GetByIdAsync(courseId, cancellationToken);

        if (course is not null)
            return course;

        return NoContent();
    }
}
