import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit, AfterViewInit {
  @ViewChild('form') dateForm!: NgForm;

  constructor() {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      let date = new Date();
      this.dateForm.setValue({
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString().slice(0, -3),
      });
    });
  }

  ngOnInit(): void {}
}
