class Firework {
  constructor() {
    this.pos = createVector(random(width), height);
    this.vel = createVector(0, random(-5, -12));
    this.acc = createVector();
    this.size = 10;
    this.particles = []
    this.exploded = false;
    this.lifespan = 255;
    this.h = random(200, 490)
    this.s = random(30, 80)
  }
  explose(){
    let maxForce, maxSpeed, size = 10
    for (let a = 0; a < TWO_PI; a += 0.08){
      const r = this.size;
      const x = r * 16 * pow(sin(a), 3) -10
      const y = -r * (13 * cos(a) -5*cos(2 * a) -2*cos(3 * a) -cos(4 * a))
      const newX = random((x-10), (x+10))
      const newY = random((y-10), (y +10))
      let target
      target = createVector(this.pos.x + x, this.pos.y + y)
      if (!cbox.checked()) {
        target = createVector(this.pos.x + x, this.pos.y + y)
      }
      else {
        target = createVector(this.pos.x + newX, this.pos.y + newY)
        maxForce = random(0.1, 1)
        maxSpeed = random(2,5)
        size = 13
      }

      this.particles.push(new Particle(this.pos, target, this.h, maxForce, maxSpeed, size))
    }
  }
  draw(){
    noStroke();
    fill(this.h, this.s, this.s);
    ellipse(this.pos.x, this.pos.y, this.size);
  }
  isDead(){
    return (this.exploded && this.particles.length === 0)
  }
  applyForce(force){
    this.acc.add(force);
  }
  update(){
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);

    if (this.exploded) {
      this.particles.forEach(p => p.update());
      this.particles = this.particles.filter(p => !p.isDead())
    }else {
      this.draw();
    }
    if (this.vel.y > 0 && !this.exploded) {
      this.exploded = true
      this.explose()
    }

    this.applyForce(gravity);
  }
};
