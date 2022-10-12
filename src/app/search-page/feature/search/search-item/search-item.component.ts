import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  enterSubmit,
  swapDestOrigin,
  toggleExtraStop,
  updatePatternMatching,
  updateSearchParams,
} from 'src/app/search-page/data-access/actions/search-page.actions';
import { selectPatternMatching } from 'src/app/search-page/data-access/reducers/search.reducer';
import { Observable } from 'rxjs';
import { ForceListPipe } from 'src/app/search-page/utils/force-list.pipe';
import { MaxTenPipe } from 'src/app/search-page/utils/most-ten.pipe';

@Component({
  selector: 'app-search-item',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ForceListPipe, MaxTenPipe],
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.css'],
})
export class SearchItemComponent implements OnInit, AfterViewInit {
  @Input() targetStop!: string;
  @Input() index!: number;
  pattern = false;
  templateElement = false;
  searchForm!: FormGroup;

  patternMatching$: Observable<string[][]>;

  constructor(private store: Store) {
    this.patternMatching$ = this.store.select(selectPatternMatching);
  }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search: new FormControl({
        value: this.targetStop,
        disabled: this.index == 1 && this.targetStop === '',
      }),
    });

    if (this.index == 1 && this.targetStop === '') this.toggleActive();
  }

  ngAfterViewInit(): void {
    this.searchForm.valueChanges.subscribe((data) => {
      this.store.dispatch(
        updatePatternMatching({
          search: data.search,
        })
      );
    });
  }

  openPattern() {
    setTimeout(() => {
      this.pattern = true;
    }, 150);
  }

  closePattern() {
    setTimeout(() => {
      this.pattern = false;
    }, 150);
  }

  toggleActive() {
    if (this.templateElement) {
      this.templateElement = false;
      this.searchForm.enable();
    } else {
      this.templateElement = true;
      this.searchForm.disable();
    }
    this.store.dispatch(toggleExtraStop({ mode: !this.templateElement }));
  }

  search() {
    this.store.dispatch(enterSubmit());
  }

  setParam(name: string, id: string) {
    this.store.dispatch(
      updateSearchParams({
        name: name,
        id: String(id),
        index: this.index,
      })
    );
    this.closePattern();
  }

  swap() {
    this.store.dispatch(swapDestOrigin());
  }
}
