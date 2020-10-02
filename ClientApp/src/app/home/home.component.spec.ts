import {
    ComponentFixture,
    TestBed,
    async,
  } from '@angular/core/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [HomeComponent],
      });
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
  
      fixture.detectChanges();
    });

    
  afterEach(() => {
    // destroy the component to cancel the timer again
    fixture.destroy();
  });

  it(
    'HomeComponent should work',
    async(() => {
        const el = fixture.nativeElement.querySelector('h1');

      expect(el.innerText).toContain('Spy System');
    })
  );
});