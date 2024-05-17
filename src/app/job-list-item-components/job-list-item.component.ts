import { Component, Input, Output, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobSummary } from '../models/job-summary.model';
import { RouterModule } from '@angular/router';
import { JobService } from '../services/job.service';

type PageType = 'All' | 'Favorite';

@Component({
  selector: 'app-job-list-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './job-list-item.component.html',
  styleUrl: './job-list-item.component.scss'
})
export class JobListItemComponent {
  @Input() jobItem: JobSummary | undefined;
  @Input() pageType: PageType = 'All';

  constructor(private readonly jobService: JobService) {
  }

  protected onFavoriteClicked(job: JobSummary) {
    job.isFavorite = !job.isFavorite;
    this.jobService.setIsFavorite(job.id, job.isFavorite);
  }
}
