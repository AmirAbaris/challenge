import { Instructor } from "./instructor.model";
import { Tag } from "./tags.model";

export interface Course {
    id: string,
    title: string,
    instructor: Instructor,
    description: string,
    duration: string,
    level: string,
    numStudents: number,
    price: number,
    rating: number,
    tags: Tag[]
}