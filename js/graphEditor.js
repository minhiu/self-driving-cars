class GraphEditor {
  constructor(viewport, graph) {
    this.viewport = viewport;
    this.canvas = viewport.canvas;
    this.graph = graph;

    this.hovered = null;
    this.selected = null;

    this.drag = {
      start: null,
      end: null,
      active: false,
      reset: () => {
        this.drag.start = null;
        this.drag.end = null;
        this.drag.active = false;
      },
    };

    this.ctx = this.canvas.getContext("2d");
    this._addEventListeners();
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

  dispose() {
    this.graph.dispose();
    this.selected = null;
    this.hovered = null;
    this.drag.reset();
  }

  _addEventListeners() {
    this.canvas.addEventListener("mousedown", this._handleMouseDown.bind(this));
    this.canvas.addEventListener("mousemove", this._handleMouseMove.bind(this));
    this.canvas.addEventListener("contextmenu", (e) => e.preventDefault());
    this.canvas.addEventListener("mouseup", () => {
      this.drag.active = false;
      // Don't select a point that was dragged
      if (
        this.drag.start &&
        this.drag.end &&
        !this.drag.start.equals(this.drag.end)
      ) {
        this.selected = null;
        this.drag.reset();
      }
    });
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
        this.drag.active = true;
        this.drag.start = new Point(this.hovered.x, this.hovered.y);
        return;
      }
      this.graph.addPoint(this.mouse);

      this._selectPoint(this.mouse);
      this.hovered = this.mouse;
    }
  }

  _handleMouseMove(e) {
    this.mouse = this.viewport.getMouse(e, true);
    this.hovered = getNearestPoint(this.mouse, this.graph.points, 18);
    if (this.drag.active === true) {
      this.selected.x = this.mouse.x;
      this.selected.y = this.mouse.y;
      this.drag.end = new Point(this.selected.x, this.selected.y);
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
}
