class GraphEditor {
  constructor(canvas, graph) {
    this.canvas = canvas;
    this.graph = graph;

    this.hovered = null;
    this.selected = null;
    this.dragging = false;

    this.ctx = this.canvas.getContext("2d");
    this._addEventListeners();
  }

  _addEventListeners() {
    this.canvas.addEventListener("mousedown", this._handleMouseDown.bind(this));
    this.canvas.addEventListener("mousemove", this._handleMouseMove(this));
    this.canvas.addEventListener("contextmenu", (e) => e.preventDefault());
    this.canvas.addEventListener("mouseup", (e) => (this.dragging = false));
  }

  _handleMouseDown(e) {
    // Right click
    if (e.button === 2) {
      if (this.selected) {
        this.selected = null;
      } else if (this.hovered) {
        this._removePoint(this.hovered);
      }
    }

    // Left click
    if (e.button === 0) {
      if (this.hovered) {
        this._selectPoint(this.hovered);
        this.dragging = true;
        return;
      }
      this.graph.addPoint(this.mouse);

      this._selectPoint(this.mouse);
      this.selected = this.mouse;
      this.hovered = this.mouse;
    }
  }

  _handleMouseMove(e) {
    this.mouse = new Point(e.offsetX, e.offsetY);
    this.hovered = getNearestPoint(this.mouse, this.graph.points, 18);
    if (this.dragging === true) {
      this.selected.x = this.mouse.x;
      this.selected.y = this.mouse.y;
    }
  }

  _selectPoint(point) {
    this.selected &&
      this.graph.tryAddSegment(new Segment(this.selected, point));
    this.selected = point;
  }

  _removePoint(point) {
    this.graph.removePoint(point);
    this.hovered = null;
    point === this.selected && (this.selected = null);
  }

  display() {
    this.graph.draw(this.ctx);
    if (this.hovered) {
      this.hovered.draw(this.ctx, { fill: true });
    }

    if (this.selected) {
      const intent = this.hovered || this.mouse;
      new Segment(this.selected, intent).draw(ctx, { dash: [3, 3] });
      this.selected.draw(this.ctx, { outline: true });
    }
  }
}
