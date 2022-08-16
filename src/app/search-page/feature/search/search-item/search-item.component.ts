import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Stop } from 'src/app/search-page/utils/stop.model';
import { SearchService } from 'src/app/search-page/data-access/search.service';
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
export class SearchItemComponent implements OnInit, OnDestroy {
  @Input() targetStop: string = '';
  @Input() templateElement: boolean = false;
  @Input() index!: number;
  searchForm!: FormGroup;
  patternMatching: Stop[] = [];

  subscriptions: Subscription[] = [];

  constructor(private searchService: SearchService, private store: Store) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search: new FormControl(this.targetStop),
    });

    this.subscriptions.push(
      this.searchForm.valueChanges.subscribe(({ search }) => {
        this.store.dispatch(updateSearchParams({ search }));
        this.searchService.patternMatching(search, this.index);
      })
    );

    this.subscriptions.push(
      this.searchService.searchUpdated.subscribe((patternMatching) => {
        this.patternMatching = patternMatching;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  toggleActive() {
    this.templateElement = !this.templateElement;
  }

  search() {
    this.store.dispatch(enterSubmit());

    this.searchService.performSearch.emit(true);
  }
}
