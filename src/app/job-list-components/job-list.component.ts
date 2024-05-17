import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { JobListItemComponent } from '../job-list-item-components/job-list-item.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobService } from '../services/job.service';
import { JobSummary } from '../models/job-summary.model';
import { BaseComponent } from '../base.component';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, FormsModule, JobListItemComponent, BaseComponent],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JobListComponent extends BaseComponent implements OnInit {
  public jobList: JobSummary[] = [];

  constructor(private readonly jobService: JobService) {
    super();
  }

  ngOnInit() {
    this.getAll();
  }

  public getAll() {
    this.jobService.getAllJobs().pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe(data => this.jobList = data);
  }
}
