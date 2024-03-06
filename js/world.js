class World {
  constructor(graph, roadWidth = 100, roadRoundess = 3) {
    this.graph = graph;
    this.roadWidth = roadWidth;
    this.roadRoundess = roadRoundess;

    this.envelopes = [];
    this.generate();
  }

  generate() {
    this.envelopes.length = 0;
    for (const seg of this.graph.segments) {
      this.envelopes.push(new Envelope(seg, this.roadWidth, this.roadRoundess));
    }

    this.intersections = [];
    if (this.envelopes.length > 1) {
      this.intersections = Polygon.break(
        this.envelopes[0].poly,
        this.envelopes[1].poly
      );
    }
  }

  draw(ctx) {
    for (const env of this.envelopes) {
      env.draw(ctx);
    }
  }
}
