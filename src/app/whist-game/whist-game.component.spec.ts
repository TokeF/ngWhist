import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhistGameComponent } from './whist-game.component';

describe('WhistGameComponent', () => {
  let component: WhistGameComponent;
  let fixture: ComponentFixture<WhistGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhistGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WhistGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
