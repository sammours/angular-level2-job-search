import { Component } from '@angular/core';
import { JobSummary } from '../models/job-summary.model';
import { JobService } from '../services/job.service';
import { BaseComponent } from '../base.component';
import { takeUntil } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { JobListItemComponent } from '../job-list-item-components/job-list-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorite-jobs',
  standalone: true,
  imports: [CommonModule, FormsModule, JobListItemComponent, BaseComponent],
  templateUrl: './favorite-jobs.component.html',
  styleUrl: './favorite-jobs.component.scss'
})
export class FavoriteJobsComponent extends BaseComponent {
  public favoriteJobs: JobSummary[] = [];

  constructor(private readonly jobService: JobService) {
    super();
  }

  ngOnInit() {
    this.jobService.getFavorites().pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe(data => this.favoriteJobs = data);
  }
}
