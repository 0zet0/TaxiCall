export default class dragElement {
  constructor(el, zoom, parent, draggingStyle = 'background-color: rgba(0, 0, 0, 0.2);') {
    this.element = el;
    this.reset();
    this.draggingStyle = draggingStyle;
    this.parent = parent;
    this.scale = zoom;
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
      this.dragElement.style = this.draggingStyle;
      this.dragElement.style.width = `${this.element.clientWidth}px`;
      this.dragElement.style.height = `${this.element.clientHeight}px`;
      this.dragElement.style.position = 'absolute';
      this.dragElement.style.zIndex = 5;
      this.dragElement.style.pointerEvents = 'none';
      this.element.classList.add('--ghost');
      this.dragElement.classList.add('--dragging');
      this.isDragging = true;
    }

    this.dragElement.style.left = `${(e.clientX - this.shiftX) / this.scale}px`;
    this.dragElement.style.top = `${(e.clientY - this.shiftY) / this.scale}px`;

    // eslint-disable-next-line consistent-return
    return this.findDroppable(e);
  }

  drop(e) {
    this.element.classList.remove('--ghost');
    const droppable = this.findDroppable(e);
    this.reset();
    return droppable;
  }

  findDroppable(e) {
    this.dragElement.visibility = 'hidden';
    const elem = document.elementFromPoint(e.clientX, e.clientY);
    this.dragElement.visibility = '';

    if (elem === null) return null;
    return elem;
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
}
