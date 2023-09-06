import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridRestauranteComponent } from './grid-restaurante.component';

describe('GridRestauranteComponent', () => {
  let component: GridRestauranteComponent;
  let fixture: ComponentFixture<GridRestauranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridRestauranteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
