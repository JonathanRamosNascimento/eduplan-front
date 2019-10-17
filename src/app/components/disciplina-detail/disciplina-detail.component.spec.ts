import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplinaDetailComponent } from './disciplina-detail.component';

describe('DisciplinaDetailComponent', () => {
  let component: DisciplinaDetailComponent;
  let fixture: ComponentFixture<DisciplinaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisciplinaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplinaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
