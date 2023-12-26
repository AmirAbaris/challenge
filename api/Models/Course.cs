namespace api.Models;

public record Course(
    [property: BsonId, BsonRepresentation(BsonType.ObjectId)] string? Id,
    string Title,
    Instructor Instructor,
    string Description,
    string Duration,
    string Level,
    int NumStudents,
    decimal Price,
    double Rating,
    List<Tag> Tags
);