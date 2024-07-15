import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordCardComponent } from './password-card.component';

describe('PasswordCardComponent', () => {
  let component: PasswordCardComponent;
  let fixture: ComponentFixture<PasswordCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasswordCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
