using api.Models;

namespace api.Repositories;

public class CourseRepository : ICourseRepository
{
    private const string _collectionName = "courses";
    private readonly IMongoCollection<Course> _collection;

    // Dependency Injection
    public CourseRepository(IMongoClient client, IMongoDbSettings dbSettings)
    {
        var dbName = client.GetDatabase(dbSettings.DatabaseName);
        _collection = dbName.GetCollection<Course>(_collectionName);
    }

    public async Task<Course> CreateAsync(Course courseIn, CancellationToken cancellationToken)
    {
        Course course = new(
            Id: null,
            Title: courseIn.Title,
            Instructor: new(
                Name: courseIn.Instructor.Name,
                Email: courseIn.Instructor.Email
            ),
            Description: courseIn.Description,
            Duration: courseIn.Duration,
            Level: courseIn.Level,
            NumStudents: courseIn.NumStudents,
            Price: courseIn.Price,
            Rating: courseIn.Rating,
            Tags: courseIn.Tags
        );

        await _collection.InsertOneAsync(course, null, cancellationToken);

        return course;
    }

    public async Task<List<Course>> GetAllAsync(CancellationToken cancellationToken)
    {
        List<Course> courses = await _collection.Find(new BsonDocument()).ToListAsync(cancellationToken);

        return courses;
    }

    public async Task<Course?> GetByIdAsync(string courseId, CancellationToken cancellationToken)
    {
        Course? course = await _collection.Find<Course>(course => course.Id == courseId).FirstOrDefaultAsync(cancellationToken);

        if (course is not null)
            return course;

        return null;
    }
}
