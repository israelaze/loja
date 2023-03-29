import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoUpdateComponent } from './produto-update.component';

describe('ProdutoUpdateComponent', () => {
  let component: ProdutoUpdateComponent;
  let fixture: ComponentFixture<ProdutoUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutoUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
