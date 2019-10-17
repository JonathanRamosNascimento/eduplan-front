import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplinaNewComponent } from './disciplina-new.component';

describe('DisciplinaNewComponent', () => {
  let component: DisciplinaNewComponent;
  let fixture: ComponentFixture<DisciplinaNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisciplinaNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplinaNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
