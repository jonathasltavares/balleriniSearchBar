import { Component } from '@angular/core';
import { SearchService } from './shared/services/search.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';
import { Comunity } from './shared/interfaces/result';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'balleriniSearchBar';
  private searchTerms = new Subject<string>();
  results$!: Observable<any[]>;
  results: boolean = false
  

  constructor(private searchService: SearchService) {}

  search(event: any): void {
    this.results = true;
    const term = (event.target as HTMLInputElement).value;
    this.searchTerms.next(term);
    this.results$.subscribe(
      (data) => this.results$ = of(data)
    )
  }

  ngOnInit() {
    this.results$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.searchService.getComunity(term))
    );
  }
  cancel(){
    setTimeout(()=>{
      this.results$ = of([])
      this.results = false;
    }, 500);
  }
}
