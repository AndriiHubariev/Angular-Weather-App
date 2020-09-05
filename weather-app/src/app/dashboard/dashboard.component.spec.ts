import { DashboardComponent } from './dashboard.component';
import { DataRepositoryService } from '../model/data-repository.service';
import { DashboardService } from './dashboard.service';
import { LocationService } from '../model/location.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let repository: DataRepositoryService;
  let service: DashboardService;
  let location: LocationService;

  beforeEach(() => {
    service = new DashboardService();
    location = new LocationService();
    repository = new DataRepositoryService(null, location);
    component = new DashboardComponent(repository, service);
    component.ngOnInit();
  });
  it('should return a city string err OnInit', () => {
    expect(component.wrongCityErr).toBe('');
  });
  it('should return err if services subject isWrongCity is true', () => {
    service.isWrongCity.next(true);
    expect(component.wrongCityErr).toBe('wrong city name');
  });
  it('should return empty string if services subject isWrongCity is false', () => {
    service.isWrongCity.next(false);
    expect(component.wrongCityErr).toBe('');
  });
  it('should send value from service sidebarToggle to its sidebarToggle and be equal', () => {
    service.sidebarToggle.next(true);
    expect(component.sidebarToggle).toBeTruthy();
  });
});
