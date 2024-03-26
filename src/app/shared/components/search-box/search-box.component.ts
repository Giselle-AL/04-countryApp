import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, input } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy{


private deBouncer: Subject<string>= new Subject<string>();
private debouncerSus?: Subscription;

/*@ViewChild('txtInput')
public searchInput!: ElementRef<HTMLInputElement>
Searchtag(){
  const newTag = this.searchInput.nativeElement.value;
  console.log({newTag})
}*/

  @Input()
  public placeholder:string='';

  @Input()
  public initialValue: string='';

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSus=
    this.deBouncer
    .pipe(
      debounceTime(500)
    )
    .subscribe(value => {
      this.onDebounce.emit(value);
    })
  }

  ngOnDestroy(): void {
    this.debouncerSus?.unsubscribe();

  }

  emitvalue( value:string):void {
    this.onValue.emit(value);
  }

  onKeyPress (searchTerm : string) {
    this.deBouncer.next(searchTerm);
  }

}
