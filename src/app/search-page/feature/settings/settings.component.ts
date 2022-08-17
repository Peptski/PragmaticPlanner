import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SearchService } from '../../data-access/search.service';
import { Store } from '@ngrx/store';
import {
  buttonSubmit,
  updateDate,
  updateTime,
  updateTimeMode,
} from '../../data-access/actions/search-page.actions';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  dateForm: FormGroup;
  mode = 'departure';

  subscriptions: Subscription[] = [];

  constructor(private searchService: SearchService, private store: Store) {
    let date = new Date();
    this.dateForm = new FormGroup({
      time: new FormControl(date.toLocaleTimeString().slice(0, -3)),
      date: new FormControl(date.toLocaleDateString()),
    });

    this.subscriptions.push(
      this.searchService.performSearch.subscribe((_) => this.search())
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  search() {
    this.store.dispatch(buttonSubmit());

    this.searchService.searchTrip(
      this.mode,
      this.dateForm.value.time,
      this.dateForm.value.date
    );
  }

  updateTime(event: Event) {
    this.store.dispatch(
      updateTime({ time: (<HTMLTextAreaElement>event.target).value })
    );
  }

  updateDate(event: Event) {
    this.store.dispatch(
      updateDate({ date: (<HTMLTextAreaElement>event.target).value })
    );
  }

  updateMode(mode: string) {
    this.store.dispatch(updateTimeMode({ mode }));
  }

  toggleArrival() {
    if (this.mode === 'arrival') return;
    this.mode = 'arrival';
    document
      .querySelectorAll('.btn-mode')
      .forEach((ele) => ele.classList.toggle('active'));
  }

  toggleDeparture() {
    if (this.mode === 'departure') return;
    this.mode = 'departure';
    document
      .querySelectorAll('.btn-mode')
      .forEach((ele) => ele.classList.toggle('active'));
  }
}
