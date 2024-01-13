import { useStore } from 'vuex';

export default class Draw {
  constructor(convas, setProgress, setAccuracy) {
    this.configs = {
      history: [],
      color: '#13c5f7',
      size: 25,
    };
    this.c = convas;
    this.ctx = this.c.getContext('2d', {
      willReadFrequently: true,
    });

    this.mouseDown = false;
    this.mouseX = 0;
    this.mouseY = 0;
    this.tempHistory = [];
    this.store = useStore();
    this.correctPixels = 0;
    this.wrongPixels = 0;
    this.setProgress = setProgress;
    this.setAccuracy = setAccuracy;

    this.setSize();

    this.listen();

    this.redraw();
  }

  listen() {
    this.c.addEventListener('mousedown', (e) => {
      this.mouseDown = true;
      this.mouseX = e.offsetX;
      this.mouseY = e.offsetY;
      this.setDummyPoint();
    });

    this.c.addEventListener('mouseup', async () => {
      if (this.mouseDown) {
        this.setDummyPoint();
      }
      this.mouseDown = false;

      await this.findPixels();
      this.setProgress(this.getProgress());
    });

    this.c.addEventListener('mouseleave', () => {
      if (this.mouseDown) {
        this.setDummyPoint();
        this.setAccuracy();
      }
      this.mouseDown = false;
    });

    this.c.addEventListener('mousemove', (e) => {
      this.moveMouse(e);

      if (this.mouseDown) {
        this.mouseX = e.offsetX;
        this.mouseY = e.offsetY;

        const item = {
          isDummy: false,
          x: this.mouseX,
          y: this.mouseY,
          c: this.configs.color,
          r: this.configs.size,
        };

        this.configs.history.push(item);
        this.draw(item, this.configs.history.length);
      }
    });

    this.c.addEventListener('resize', () => this.onResize());
  }

  onResize() {
    this.setSize();
    this.redraw();
  }

  setSize() {
    const { width, height } = this.c.getBoundingClientRect();

    this.c.width = width / this.store.state.zoom;
    this.c.height = height / this.store.state.zoom;
  }

  setColor(color) {
    this.configs.color = color.hex;
  }

  setActiveColor(color) {
    this.colorToCompare = color;
  }

  moveMouse() {
    // let x = e.offsetX;
    // let y = e.offsetY;
    // const cursor = document.getElementById('cursor');
    // cursor.style.transform = `translate(${x - 10}px, ${y - 10}px)`;
  }

  getDummyItem() {
    const lastPoint = this.configs.history[this.configs.history.length - 1];

    return {
      isDummy: true,
      x: lastPoint?.x,
      y: lastPoint?.y,
      c: null,
      r: null,
    };
  }

  setDummyPoint() {
    const item = this.getDummyItem();
    this.configs.history.push(item);
    this.draw(item, this.configs.history.length);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.c.width, this.c.height);
    this.configs.history = [];
  }

  redraw() {
    this.ctx.clearRect(0, 0, this.c.width, this.c.height);
    this.drawBgDots();

    if (!this.configs.history.length) {
      return true;
    }

    this.configs.history.forEach((item, i) => {
      this.draw(item, i);
    });
  }

  drawBgDots() {
    const gridSize = 50;
    this.ctx.fillStyle = 'rgba(0, 0, 0, .2)';

    for (let i = 0; i * gridSize < this.c.width; i++) {
      for (let j = 0; j * gridSize < this.c.height; j++) {
        if (i > 0 && j > 0) {
          this.ctx.beginPath();
          this.ctx.rect(i * gridSize, j * gridSize, 2, 2);
          this.ctx.fill();
          this.ctx.closePath();
        }
      }
    }
  }

  draw(item, i) {
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';

    const prevItem = this.configs.history[i - 2];

    if (i < 2) {
      return false;
    }

    if (!item.isDummy && !this.configs.history[i - 1].isDummy && !prevItem.isDummy) {
      this.ctx.strokeStyle = item.c;
      this.ctx.lineWidth = item.r;

      this.ctx.beginPath();
      this.ctx.lineTo(item.x, item.y);
      this.ctx.stroke();
      this.ctx.closePath();
    } else if (!item.isDummy) {
      this.ctx.strokeStyle = item.c;
      this.ctx.lineWidth = item.r;

      this.ctx.beginPath();
      this.ctx.lineTo(item.x, item.y);
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }

  isMousedown() {
    return this.mouseDown;
  }

  getProgress() {
    const progress = (Math.floor((this.correctPixels * 100) / (this.correctPixels + this.wrongPixels)) * 100) / 25;

    return progress > 100 ? 100 : progress;
  }

  async findPixels() {
    this.paintArea = this.ctx.getImageData(0, 0, this.c.width, this.c.height).data;
    this.pixelsToCompare = [];
    this.correctPixels = 0;
    this.wrongPixels = 0;

    for (let i = 0; i < this.paintArea.length; i += 4) {
      if (
        this.paintArea[i + 0] == this.colorToCompare.R &&
        this.paintArea[i + 1] == this.colorToCompare.G &&
        this.paintArea[i + 2] == this.colorToCompare.B &&
        this.paintArea[i + 3] == 255
      )
        this.correctPixels++;
      else this.wrongPixels++;
    }
  }
}
