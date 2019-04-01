import { Component, OnInit } from '@angular/core';
import { ComplaintService } from '../complaint.service';
import { Complaint } from '../complaint';

@Component({
  selector: 'szia-complaint-list',
  templateUrl: './complaint-list.component.html',
  styleUrls: ['./complaint-list.component.scss']
})
export class ComplaintListComponent implements OnInit {
  complaints: Complaint[];

  constructor(private complaintService: ComplaintService) { }

  ngOnInit() {
    this.complaintService.getComplaints().subscribe(complaints => this.complaints = complaints);
  }

}
