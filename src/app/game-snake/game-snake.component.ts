import { Component, HostListener, OnInit } from '@angular/core';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';
import screenfull from 'screenfull';
import { FullScreenService } from 'src/service/full-screen.service';

enum Direction {
  Up,
  Down,
  Left,
  Right,
}

@Component({
  selector: 'app-game-snake',
  templateUrl: './game-snake.component.html',
  styleUrls: ['./game-snake.component.scss'],
})
export class GameSnakeComponent implements OnInit {
  canvasWidths: number = 1500;
  canvasHeight: number = 600;
  blockSize: number = 20;
  context: any;
  snake: any = [];
  food: any = [];
  direction: Direction = Direction.Right;
  source: number = 0;

  gameStarted: boolean = false;
  gameOver: boolean = false;

  touchStartX: number = 0;
  touchStartY: number = 0;

  velocity: number = 100;
  gameInterval: any;
  sidebarVisible: boolean = false;

  isFullscreen: boolean = false;

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    switch (event.keyCode) {
      case 37:
        if (this.direction !== Direction.Right) {
          this.direction = Direction.Left;
        }
        break;
      case 38:
        if (this.direction !== Direction.Down) {
          this.direction = Direction.Up;
        }
        break;
      case 39:
        if (this.direction !== Direction.Left) {
          this.direction = Direction.Right;
        }
        break;
      case 40:
        if (this.direction !== Direction.Up) {
          this.direction = Direction.Down;
        }
        break;
    }
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
    this.touchStartY = event.touches[0].clientY;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    const touchEndX = event.touches[0].clientX;
    const touchEndY = event.touches[0].clientY;
    const dx = touchEndX - this.touchStartX;
    const dy = touchEndY - this.touchStartY;

    if (Math.abs(dx) > Math.abs(dy)) {
      // Horizontal swipe
      if (dx > 0 && this.direction !== Direction.Left) {
        this.direction = Direction.Right;
      } else if (dx < 0 && this.direction !== Direction.Right) {
        this.direction = Direction.Left;
      }
    } else {
      // Vertical swipe
      if (dy > 0 && this.direction !== Direction.Up) {
        this.direction = Direction.Down;
      } else if (dy < 0 && this.direction !== Direction.Down) {
        this.direction = Direction.Up;
      }
    }
  }

  constructor(
    private confirmationService: ConfirmationService,
    private fullScreenService: FullScreenService
  ) {}

  ngOnInit(): void {
    const canvas = <HTMLCanvasElement>document.getElementById('gameCanvas');
    this.context = canvas.getContext('2d');
    this.gameStarted = false;
    this.gameOver = false;

    if (screenfull.isEnabled) {
      document.addEventListener(
        'fullscreenchange',
        this.handleFullscreenChange.bind(this)
      );
    }
  }

  handleFullscreenChange() {
    this.isFullscreen = !!document.fullscreenElement;
  }

  toggleFullscreen() {
    if (screenfull.isEnabled) {
      screenfull.toggle();
      this.isFullscreen = !screenfull.isFullscreen;
      console.log('🏍️ ~ this.isFullscreen: ', this.isFullscreen);
    }
  }

  changeDirection(direction: string) {
    if (!this.gameStarted || this.gameOver) {
      return;
    }

    switch (direction) {
      case 'up':
        if (this.direction !== Direction.Down) {
          this.direction = Direction.Up;
        }
        break;
      case 'down':
        if (this.direction !== Direction.Up) {
          this.direction = Direction.Down;
        }
        break;
      case 'left':
        if (this.direction !== Direction.Right) {
          this.direction = Direction.Left;
        }
        break;
      case 'right':
        if (this.direction !== Direction.Left) {
          this.direction = Direction.Right;
        }
        break;
    }
  }

  exit() {
    this.toggleFullscreen();
    this.endGame(false);
  }

  startGame() {
    if (screenfull.isEnabled && !this.isFullscreen) {
      screenfull.toggle();
      this.isFullscreen = !screenfull.isFullscreen;
      this.canvasHeight = 700;
      console.log('🏍️ ~ this.isFullscreen: ', this.isFullscreen);
    }
    this.snake = [
      [6, 6],
      [5, 6],
      [4, 6],
    ];

    this.food = this.generateFood();
    this.direction = Direction.Right;
    this.source = 0;
    this.gameStarted = true;
    this.gameOver = false;
    if (this.gameInterval) {
      clearInterval(this.gameInterval);
    }

    this.gameInterval = setInterval(() => this.move(), this.velocity);
  }

  move() {
    const head = [...this.snake[0]];
    switch (this.direction) {
      case Direction.Left: {
        head[0] -= 1;
        break;
      }
      case Direction.Right: {
        head[0] += 1;
        break;
      }
      case Direction.Up: {
        head[1] -= 1;
        break;
      }
      case Direction.Down: {
        head[1] += 1;
        break;
      }
    }

    this.snake.unshift(head);

    if (this.isCollision()) {
      this.endGame();
      return;
    }

    if (this.isEatingFood()) {
      this.source += 1;
      this.food = this.generateFood();
    } else {
      this.snake.pop();
    }
    this.draw();
  }

  endGame(isShowMess: boolean = true) {
    this.gameOver = true;
    console.log('🏍️ ~ this.gameOver: ', this.gameOver);
    this.gameStarted = false;
    this.snake = [];
    this.food = [];

    if (this.gameInterval) {
      clearInterval(this.gameInterval);
    }

    if (isShowMess) {
      this.confirmationService.confirm({
        message: `Điểm của bạn: ${this.source}`,
        header: 'Game Over',
        icon: 'pi pi-exclamation-triangle',
        rejectLabel: 'Thoát',
        acceptLabel: 'Chơi lại',
        accept: () => {
          this.startGame();
        },
        reject: (type: any) => {},
      });
    }
  }

  draw() {
    this.context.clearRect(0, 0, this.canvasWidths, this.canvasHeight);
    this.context.fillStyle = 'green';
    this.snake.forEach((segment: any) => {
      this.context.fillRect(
        segment[0] * this.blockSize,
        segment[1] * this.blockSize,
        this.blockSize,
        this.blockSize
      );
    });
    this.context.fillStyle = 'red';
    this.context.fillRect(
      this.food[0] * this.blockSize,
      this.food[1] * this.blockSize,
      this.blockSize,
      this.blockSize
    );
  }

  generateFood() {
    const foodX = Math.floor(
      Math.random() * (this.canvasWidths / this.blockSize)
    );
    const foodY = Math.floor(
      Math.random() * (this.canvasHeight / this.blockSize)
    );
    return [foodX, foodY];
  }

  isEatingFood() {
    const head = this.snake[0];
    const [headX, headY] = head;
    return headX === this.food[0] && headY === this.food[1];
  }

  isCollision() {
    const head = this.snake[0];
    const [headX, headY] = head;

    if (
      headX < 0 ||
      headX >= this.canvasWidths / this.blockSize ||
      headY < 0 ||
      headY >= this.canvasHeight / this.blockSize ||
      this.snake.some(
        (segment: any[], index: number) =>
          index !== 0 && segment[0] === headX && segment[1] === headY
      )
    ) {
      return true;
    }

    return false;
  }
}
