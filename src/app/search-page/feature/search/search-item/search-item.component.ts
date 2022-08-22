import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Stop } from 'src/app/search-page/utils/stop.model';
import { SearchService } from 'src/app/search-page/data-access/search.service';
import { Store } from '@ngrx/store';
import {
  enterSubmit,
  updateSearchParams,
} from 'src/app/search-page/data-access/actions/search-page.actions';
import { selectSearchParams } from 'src/app/search-page/data-access/reducers/search.reducer';

@Component({
  selector: 'app-search-item',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.css'],
})
export class SearchItemComponent implements OnInit, OnDestroy {
  @Input() targetStop = '';
  @Input() index!: number;
  templateElement = false;
  searchForm!: FormGroup;
  patternMatching: Stop[] = [];

  subscriptions: Subscription[] = [];

  constructor(private searchService: SearchService, private store: Store) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search: new FormControl(this.targetStop),
    });

    // this.subscriptions.push(
    //   this.searchForm.valueChanges.subscribe(({ search }) => {
    //     this.searchService.patternMatching(search, this.index);
    //     this.store.dispatch(
    //       updateSearchParams({
    //         search: search,
    //         index: this.index,
    //       })
    //     );
    //   })
    // );

    // this.subscriptions.push(
    //   this.searchService.searchUpdated.subscribe((patternMatching) => {
    //     this.patternMatching = patternMatching;
    //   })
    // );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
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
