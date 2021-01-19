import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() currentCityName: string;
  @Input() wrongCityErr: string;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSearchCity = new EventEmitter<boolean>();

  searchCity() {
    this.onSearchCity.emit(true);
  }
}
