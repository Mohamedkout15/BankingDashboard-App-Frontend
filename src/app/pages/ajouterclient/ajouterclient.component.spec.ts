import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterClientComponent } from './ajouterclient.component';

describe('IconsComponent', () => {
  let component: AjouterClientComponent;
  let fixture: ComponentFixture<AjouterClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
