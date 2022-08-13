import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SearchService } from '../shared/search.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  dateForm: FormGroup;

  constructor(private searchService: SearchService) {
    let date = new Date();
    this.dateForm = new FormGroup({
      time: new FormControl(date.toLocaleTimeString().slice(0, -3)),
      date: new FormControl(date.toLocaleDateString()),
    });
  }

  onSubmit() {}

  ngOnInit(): void {
    this.dateForm.valueChanges.subscribe((x) => console.log(x));
  }

  search() {
    this.searchService.searchTrip();
  }
}
