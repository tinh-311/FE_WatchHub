import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSnakeComponent } from './game-snake.component';

describe('GameSnakeComponent', () => {
  let component: GameSnakeComponent;
  let fixture: ComponentFixture<GameSnakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameSnakeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameSnakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
