class Viewport {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.zoonm = 1;

    this._addEventListeners();
  }

  _addEventListeners() {
    this.canvas.addEventListener(
      "mousewheel",
      this._handleMouseWheel.bind(this)
    );
  }

  _handleMouseWheel(e) {
    console.log(e.deltaY);
  }
}
