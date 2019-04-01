import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Complaint } from './complaint';
import { NewComplaint } from './new-complaint';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  private baseUrl = `${environment.baseUrl}/Complaints`;

  constructor(private http: HttpClient) { }

  getComplaints() {
    return this.http.get<Complaint[]>(this.baseUrl);
  }

  getComplaint(id: number) {
    return this.http.get<Complaint>(`${this.baseUrl}/${id}`);
  }

  saveComplaint(complaint: NewComplaint) {
    return this.http.post<Complaint>(this.baseUrl, complaint);
  }

  updateComplaint(id: number, complaint: NewComplaint) {
    return this.http.put<Complaint>(`${this.baseUrl}/${id}`, complaint);
  }
}
