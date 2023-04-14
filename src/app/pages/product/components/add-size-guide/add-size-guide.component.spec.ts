import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSizeGuideComponent } from './add-size-guide.component';

describe('AddSizeGuideComponent', () => {
  let component: AddSizeGuideComponent;
  let fixture: ComponentFixture<AddSizeGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSizeGuideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSizeGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
