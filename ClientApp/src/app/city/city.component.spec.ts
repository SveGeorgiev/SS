import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { CityComponent } from './city.component';
import { CityService } from './city.service';

const dummyCities: any[] = [
    { name: 'Asenovgrad' },
    { name: 'Plovdiv' }
  ];
  
  class FakeCitySerivce {
    getCities() {
      return Observable.of(dummyCities);
    }
  }
  
describe('CityComponent', () => {
    let component: CityComponent;
    let fixture: ComponentFixture<CityComponent>;
    let injector;
    let cityService: CityService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
          imports: [ HttpClientTestingModule, ReactiveFormsModule ],
          declarations: [ CityComponent ],
          providers: [
            { provide: CityService, useClass: FakeCitySerivce }
          ]
        })
        .compileComponents();
    
        injector = getTestBed();
        cityService = injector.get(CityService);
      }));
    
      beforeEach(() => {
        fixture = TestBed.createComponent(CityComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      describe('#ngOnInit', () => {
        it('should work', (async() => {
            cityService.getCities().subscribe((cities: any[]) => {
                expect(cities.length).toBe(2);
                expect(cities).toEqual(dummyCities);
            });
        }));
      });
});