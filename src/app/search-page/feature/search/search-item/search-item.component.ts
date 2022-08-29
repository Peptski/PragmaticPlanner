import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  enterSubmit,
  updateSearchParams,
} from 'src/app/search-page/data-access/actions/search-page.actions';

@Component({
  selector: 'app-search-item',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.css'],
})
export class SearchItemComponent implements OnInit {
  @Input() targetStop!: string;
  @Input() index!: number;
  templateElement = false;
  searchForm!: FormGroup;
  // patternMatching: Stop[] = [];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search: new FormControl(this.targetStop),
    });
  }

  toggleActive() {
    this.templateElement = !this.templateElement;
  }

  search() {
    this.store.dispatch(enterSubmit());
  }

  changeSearchParams(event: Event, index: number) {
    this.store.dispatch(
      updateSearchParams({
        search: (<HTMLTextAreaElement>event.target).value,
        index: index,
      })
    );
  }
}
