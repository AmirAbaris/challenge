import { Component, OnInit, inject } from '@angular/core';
import { Course } from '../../models/course.model';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { error } from 'console';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent implements OnInit {
  readonly #router = inject(ActivatedRoute);
  readonly #courseService = inject(CourseService);

  course: Course | null | undefined;

  ngOnInit(): void {
    this.#router.params.subscribe(params => {
      const courseId = params['id'];
    });
  }

  getCourseDetails(courseId: string): void {
    this.#courseService.getById(courseId).subscribe({
      next: (res) => {
        this.course = res;
      },
      error: (err) => console.log(err)
    });
  }
}
