import { Routes } from '@angular/router';
import { JobListComponent } from './job-list-components/job-list.component';
import { JobDescriptionComponent } from './job-description-components/job-description.component';
import { FavoriteJobsComponent } from './favorite-jobs-components/favorite-jobs.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/jobs' },
    { path: 'jobs', component: JobListComponent },
    { path: 'favorites', component: FavoriteJobsComponent },
    { path: 'jobs/:jobId', component: JobDescriptionComponent },
];
