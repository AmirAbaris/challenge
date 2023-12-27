import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CourseService } from './services/course.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  readonly #courseService = inject(CourseService);
  readonly #platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    this.getLocalStorageValues()
  }

  getLocalStorageValues(): void {
    if (isPlatformBrowser(this.#platformId)) {
      const cardValue = localStorage.getItem('courses');

      if (cardValue) {
        this.#courseService.addToCard(JSON.parse(cardValue));
      }
    }
  }
}
