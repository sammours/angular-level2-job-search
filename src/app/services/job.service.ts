import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { filter, map, of } from "rxjs";
import { JobSummary } from "../models/job-summary.model";
import { Job } from "../models/job.model";

@Injectable({
    providedIn: "root",
})
export class JobService {
    constructor(private readonly httpClient: HttpClient) { }

    /** 
     * Get all jobs from the mock by calling the API
     * Session storage is used in this case to persist the favorite state on browser refresh
     * Alternative, Local storage could also be used if the values should be persist even after the browser is closed but in this case it is not a requirement
     * @returns Observable of JobSummary Array
    */
    public getAllJobs() {
        const existingJobs = sessionStorage.getItem('jobs'); 
        if (existingJobs != null) {
            return of(existingJobs).pipe(
                map((data) => JSON.parse(data) as JobSummary[]));
        }
        
        return this.httpClient.get(`/jobs`).pipe(
            map((response) => {
                const data = response as JobSummary[];
                // fetch the data for the first time. Set all favorite status to false
                data.forEach(x => x.isFavorite = false);

                // save the initial list in the session storage for later retrieval 
                sessionStorage.setItem('jobs', JSON.stringify(data)); 
                return data;
            }));
    }

    public getJobById(id: number) {
        return this.httpClient.get(`/jobs/${id}`).pipe(
            map((response) => response as Job));
    }

    /**
     * Get only favorite jobs by filtering the flag isFavorite
     */
    public getFavorites() {
        return this.getAllJobs().pipe(
            map(jobs => jobs.filter(j => j.isFavorite))
        );
    }

    public setIsFavorite(id: number, isFavorite: boolean) {
        const existingJobs = sessionStorage.getItem('jobs');
        if (existingJobs != null) {
            const jobs = JSON.parse(existingJobs) as JobSummary[];
            const selectedJob = jobs.find(j => j.id === id); 
            if (selectedJob) {
                selectedJob.isFavorite = isFavorite;
            }
            
            // Set the storage again after updating the favorite status
            sessionStorage.setItem('jobs', JSON.stringify(jobs)); 
        }
    }
}