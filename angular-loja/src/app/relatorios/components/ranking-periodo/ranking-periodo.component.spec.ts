import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingPeriodoComponent } from './ranking-periodo.component';

describe('RankingPeriodoComponent', () => {
  let component: RankingPeriodoComponent;
  let fixture: ComponentFixture<RankingPeriodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankingPeriodoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankingPeriodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
