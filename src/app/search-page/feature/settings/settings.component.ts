import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
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
  mode$: Observable<string>;
  dateForm: FormGroup;

  constructor(private store: Store) {
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
    this.store.dispatch(updateTimeMode({ mode }));
  }
}
