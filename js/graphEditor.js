class GraphEditor {
  constructor(canvas, graph) {
    this.canvas = canvas;
    this.graph = graph;

    this.hovered = null;
    this.selected = null;

    this.ctx = this.canvas.getContext("2d");
    this._addEventListeners();
  }

  _addEventListeners() {
    this.canvas.addEventListener("mousedown", (e) => {
      const mouse = new Point(e.offsetX, e.offsetY);
      this.hovered = getNearestPoint(mouse, this.graph.points, 18);
      if (this.hovered) {
        this.selected = this.hovered;
        return;
      }
      this.graph.addPoint(mouse);
      this.selected = mouse;
    });

    this.canvas.addEventListener("mousemove", (e) => {
      const mouse = new Point(e.offsetX, e.offsetY);
      this.hovered = getNearestPoint(mouse, this.graph.points, 18);
    });
  }

  display() {
    this.graph.draw(this.ctx);
    if (this.hovered) {
      this.hovered.draw(this.ctx, { fill: true });
    }

    if (this.selected) {
      this.selected.draw(this.ctx, { outline: true });
    }
  }
}
