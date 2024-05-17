export interface JobSummary {
    id: number;
    companyName: string;
    title: string;
    companyLogo: string;
    reference: string;
    
    /**
     * A toggle to indicate if the job is marked as favorite
     */
    isFavorite: boolean;
}