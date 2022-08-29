import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  enterSubmit,
  updatePatternMatching,
  updateSearchParams,
} from 'src/app/search-page/data-access/actions/search-page.actions';
import { selectPatternMatching } from 'src/app/search-page/data-access/reducers/search.reducer';
import { Observable } from 'rxjs';

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
  pattern = false;
  templateElement = false;
  searchForm!: FormGroup;
  patternMatching$: Observable<string[]>;

  constructor(private store: Store) {
    this.patternMatching$ = store.select(selectPatternMatching);
  }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search: new FormControl(this.targetStop),
    });

    this.searchForm.valueChanges.subscribe((data) => {
      console.log(this.index);
      this.store.dispatch(
        updatePatternMatching({
          search: data.search,
          index: this.index,
        })
      );
    });
  }

  togglePattern() {
    this.pattern = !this.pattern;
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
