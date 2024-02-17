import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhistSectionComponent } from './whist-section.component';

describe('WhistSectionComponent', () => {
  let component: WhistSectionComponent;
  let fixture: ComponentFixture<WhistSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhistSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WhistSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
