import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { SearchService } from '../../data-access/search.service';
import { Store } from '@ngrx/store';
import {
  buttonSubmit,
  updateDate,
  updateTime,
  updateTimeMode,
} from '../../data-access/actions/search-page.actions';
import { selectMode } from '../../data-access/reducers/search.reducer';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent {
  dateForm: FormGroup;
  mode$: Observable<string>;
  mode = 'departure';

  constructor(private searchService: SearchService, private store: Store) {
    let date = new Date();
    this.dateForm = new FormGroup({
      time: new FormControl(date.toLocaleTimeString().slice(0, -3)),
      date: new FormControl(date.toLocaleDateString()),
    });

    this.mode$ = store.select(selectMode);
  }

  search() {
    this.store.dispatch(buttonSubmit());
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
    this.mode = mode;
    this.store.dispatch(updateTimeMode({ mode }));
  }
}
