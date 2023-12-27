import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Course } from '../../models/course.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatButtonModule,
    MatMenuModule,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  readonly #courseService = inject(CourseService);
  readonly #destroyRef = inject(DestroyRef);

  courses: Course[] | null | undefined;

  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses(): void {
    this.#courseService.getAll().pipe(takeUntilDestroyed(this.#destroyRef)).subscribe({
      next: (res) => {
        this.courses = res;
      },
      error: (err) => console.log(err)
    });
  }

  addToCard(course: Course): void {
    this.#courseService.addToCard(course);
  }

  getCardCount(): Observable<number | undefined> {
    return this.#courseService.cardItems$.pipe(
      map((courses) => courses?.length)
    );
  }

  getCardTotalPrice(): Observable<number | null> {
    return this.#courseService.cardItems$.pipe(
      map((courses) => {
        if (courses) {
          return courses.reduce((total, course) => total + course.price, 0)
        }

        return null;
      })
    );
  }
}
