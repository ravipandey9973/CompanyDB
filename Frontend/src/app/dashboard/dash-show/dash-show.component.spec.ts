import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashShowComponent } from './dash-show.component';

describe('DashShowComponent', () => {
  let component: DashShowComponent;
  let fixture: ComponentFixture<DashShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashShowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
