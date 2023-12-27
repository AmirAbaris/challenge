import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'course/:id', component: CourseDetailComponent },
    { path: '**', redirectTo: '' }
];
