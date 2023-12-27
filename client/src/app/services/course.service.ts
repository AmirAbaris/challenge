import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Course } from '../models/course.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  readonly #http = inject(HttpClient);

  readonly #baseApiUrl = environment.apiUrl + 'course/';

  getAll(): Observable<Course[] | null> {
    return this.#http.get<Course[]>(this.#baseApiUrl + 'get-all').pipe(
      map((res: Course[] | null) => {
        return res || null;
      })
    );
  }

  getById(): Observable<Course | null> {
    return this.#http.get<Course>(this.#baseApiUrl + 'get-by-id').pipe(
      map((res) => {
        return res || null;
      })
    );
  }
}
