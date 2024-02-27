import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfaceVisiteComponent } from './InterfaceVisite.component';

describe('DashboardComponent', () => {
  let component: InterfaceVisiteComponent;
  let fixture: ComponentFixture<InterfaceVisiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterfaceVisiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterfaceVisiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
