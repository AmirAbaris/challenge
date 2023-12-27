import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { Course } from '../../models/course.model';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent implements OnInit {
  readonly #router = inject(ActivatedRoute); // TODO: more reseach about activated route
  readonly #courseService = inject(CourseService);
  readonly #destroyRef = inject(DestroyRef);

  course: Course | null | undefined;

  ngOnInit(): void {
    this.#router.params.pipe(take(1)).subscribe(params => {
      const courseId = params['id'];

      this.getCourseDetails(courseId);
    });
  }

  getCourseDetails(courseId: string): void {
    this.#courseService.getById(courseId).pipe(takeUntilDestroyed(this.#destroyRef)).subscribe({
      next: (res) => {
        this.course = res;
      },
      error: (err) => console.log(err)
    });
  }
}
