import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { JobService } from '../services/job.service';
import { Job } from '../models/job.model';
import { takeUntil } from 'rxjs';
import { BaseComponent } from '../base.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-description',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './job-description.component.html',
  styleUrl: './job-description.component.scss'
})
export class JobDescriptionComponent extends BaseComponent implements OnInit {
  @Input() jobId: number | undefined;
  protected job: Job | undefined;

  constructor(private readonly jobService: JobService,
    private readonly router: Router
  ) {
    super();
  }

  ngOnInit() {
    if (this.jobId) {
      this.jobService.getJobById(this.jobId).pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(x => this.job = x);
    }
  }

  protected navigateToJobs() {
    this.router.navigate(['/jobs']);
  }
}
