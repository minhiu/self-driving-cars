class Graph {
  constructor(points = [], segments = []) {
    this.points = points;
    this.segments = segments;
  }

  addPoint(point) {
    this.points.push(point);
  }

  containsPoint(point) {
    return this.points.find((p) => p.equals(point));
  }

  tryAddPoint(point) {
    if (!this.containsPoint(point)) {
      this.addPoint(point);
      return true;
    }

    return false;
  }

  removePoint(point) {
    this.points.splice(this.points.indexOf(point), 1);
    this.segments = this.segments.filter((s) => !s.includes(point));
  }

  addSegment(segment) {
    this.segments.push(segment);
  }

  containsSegment(segment) {
    return this.segments.find((s) => s.equals(segment));
  }

  tryAddSegment(segment) {
    if (!this.containsSegment(segment) && segment.p1 !== segment.p2) {
      this.addSegment(segment);
      return true;
    }

    return false;
  }

  removeSegment(segment) {
    this.segments.splice(this.segments.indexOf(segment), 1);
  }

  draw(ctx) {
    for (const seg of this.segments) {
      seg.draw(ctx);
    }

    for (const pt of this.points) {
      pt.draw(ctx);
    }
  }

  dispose() {
    delete this.points;
    delete this.segments;

    this.points = [];
    this.segments = [];
  }
}
