export default class DraggerElement {
  constructor(el, zoom, parent, parentClassName = '', isLocked = false) {
    this.element = el;
    this.reset();
    this.parent = parent;
    this.scale = zoom;
    this.parentClassName = parentClassName;
    this.isLocked = isLocked;
  }

  startDrag(e) {
    this.reset();
    const coords = this.getCoords(this.element);

    this.shiftX = e.pageX - coords.left;
    this.shiftY = e.pageY - coords.top;
  }

  drag(e) {
    const moveX = e.pageX;
    const moveY = e.pageY;

    if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) return;

    if (!this.dragElement) {
      this.dragElement = this.element.cloneNode(true);
      this.parent.appendChild(this.dragElement);
      this.dragElement.style.position = 'absolute';
      this.dragElement.style.pointerEvents = 'none';
      this.dragElement.style.zIndex = 5;
      this.dragElement.style.bottom = 'auto';
      this.dragElement.style.right = 'auto';
      this.dragElement.style.transform = 'none';
      this.element.classList.add(`${this.parentClassName}--ghost`);
      this.dragElement.classList.add(`${this.parentClassName}--dragging`);
      this.isDragging = true;
    }

    let x = (e.clientX - this.shiftX) / this.scale;
    let y = (e.clientY - this.shiftY) / this.scale;

    if (this.isLocked) {
      if (x < 0) x = 0;
      if (y < 0) y = 0;

      const containerBox = this.parent.getBoundingClientRect();
      const width = containerBox.width / this.scale;
      const height = containerBox.height / this.scale;

      const selected = this.getBoundingClientRect();
      const coords = {
        width: selected.width / this.scale,
        height: selected.height / this.scale,
      };

      if (x + coords.width > width) x = width - coords.width;
      if (y + coords.height > height) y = height - coords.height;
    }

    this.dragElement.style.left = `${x}px`;
    this.dragElement.style.top = `${y}px`;
  }

  drop() {
    this.element.classList.remove(`${this.parentClassName}--ghost`);
    this.reset();
  }

  reset() {
    this.isDragging = false;
    if (this.dragElement) this.dragElement.remove();
    this.dragElement = null;
    this.shiftX = 0;
    this.shiftY = 0;
  }

  getCoords() {
    const box = this.element.getBoundingClientRect();

    return {
      left: box.left + scrollX,
      top: box.top + scrollY,
    };
  }

  getBoundingClientRect() {
    return this.dragElement ? this.dragElement.getBoundingClientRect() : {};
  }
}
