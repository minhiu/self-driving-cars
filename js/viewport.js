class Viewport {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.zoom = 1;
    this.offset = new Point(0, 0);

    this.drag = {
      start: new Point(0, 0),
      end: new Point(0, 0),
      offset: new Point(0, 0),
      active: false,
    };

    this._addEventListeners();
  }

  getMouse(e) {
    return new Point(e.offsetX * this.zoom, e.offsetY * this.zoom);
  }

  getOffset() {
    return add(this.offset, this.drag.offset);
  }

  _addEventListeners() {
    this.canvas.addEventListener(
      "mousewheel",
      this._handleMouseWheel.bind(this)
    );
    this.canvas.addEventListener("mousedown", this._handleMouseDown.bind(this));
    this.canvas.addEventListener("mousemove", this._handleMouseMove.bind(this));
    this.canvas.addEventListener("mouseup", this._handleMouseUp.bind(this));
  }

  _handleMouseWheel(e) {
    const dir = Math.sign(e.deltaY);
    const step = 0.1;
    this.zoom += dir * step;
    this.zoom = Math.max(1, Math.min(5, this.zoom));
  }

  _handleMouseDown(e) {
    // Middle button
    if (e.button === 1) {
      this.drag.active = true;
      this.drag.start = this.getMouse(e);
    }
  }

  _handleMouseMove(e) {
    if (this.drag.active) {
      this.drag.end = this.getMouse(e);
      this.drag.offset = substract(this.drag.end, this.drag.start);
    }
  }

  _handleMouseUp() {
    if (this.drag.active) {
      this.offset = add(this.offset, this.drag.offset);
      this.drag = {
        start: new Point(0, 0),
        end: new Point(0, 0),
        offset: new Point(0, 0),
        active: false,
      };
    }
  }
}
