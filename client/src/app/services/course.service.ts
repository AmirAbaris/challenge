import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Course } from '../models/course.model';
import { environment } from '../../environments/environment.development';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  readonly #http = inject(HttpClient);
  readonly #platformId = inject(PLATFORM_ID);

  private cardItemSource = new BehaviorSubject<Course[] | null>(null);
  cardItems$ = this.cardItemSource.asObservable();

  readonly #baseApiUrl = environment.apiUrl + 'course/';

  getAll(): Observable<Course[] | null> {
    return this.#http.get<Course[]>(this.#baseApiUrl + 'get-all').pipe(
      map((res: Course[] | null) => {
        return res || null;
      })
    );
  }

  getById(courseId: string): Observable<Course | null> {
    return this.#http.get<Course>(this.#baseApiUrl + 'get-by-id/' + courseId).pipe(
      map((res) => {
        return res || null;
      })
    );
  }

  addToCard(course: Course): void {
    const currentCourses = this.cardItemSource.getValue() || []; // Handle null case
    const updatedCourses = [...currentCourses, course];

    this.cardItemSource.next(updatedCourses);

    if (isPlatformBrowser(this.#platformId)) {
      localStorage.setItem('courses', JSON.stringify(updatedCourses));
    }
  }
}