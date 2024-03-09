import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesDetailsComponent } from './services-details.component';

describe('ServicesDetailsComponent', () => {
  let component: ServicesDetailsComponent;
  let fixture: ComponentFixture<ServicesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServicesDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
