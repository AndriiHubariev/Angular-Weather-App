import { Directive, ElementRef, Renderer2, HostListener, ViewChild, ViewChildren } from '@angular/core';
import { count } from 'console';
import { delay } from 'rxjs/operators';
import { DashboardComponent } from './dashboard.component';
import { DataRepositoryService } from '../services/data-repository.service';

@Directive({
  selector: '[appDirective]'
})
export class DirectiveDirective {
  constructor(private el: ElementRef, private r: Renderer2, private dataRepository: DataRepositoryService) {
    this.dataRepository.currentMultyWeather.subscribe(res => res.length > 0 ? this.show(el, r) : res);
  }
  show(el, r) {
    setTimeout(() => {
      let c = 0;
      setInterval(() => {
        // tslint:disable-next-line: curly
        if (c === 12) return;
        c % 2 === 0
        ? r.setStyle(el.nativeElement, 'transform', 'scale(1.4)')
        : r.setStyle(el.nativeElement, 'transform', 'scale(1)');
        c++;
      }, 300);
    }, 2000);
  }
}
