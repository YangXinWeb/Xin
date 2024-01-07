let particles = [];

    function setup() {
      let canvas = createCanvas(windowWidth, document.body.scrollHeight);
    canvas.style('position', 'absolute');
    canvas.style('top', '0');
    canvas.style('left', '0');
    canvas.style('pointer-events', 'none'); // Allow mouse events to pass through the canvas
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

      function draw() {
    clear();  // Use clear() to maintain transparency and not cover other elements
    let newParticle = new Particle(mouseX, mouseY);
    particles.push(newParticle);

    for (let particle of particles) {
        particle.update();
        particle.show();
    }

    // Remove particles that are too old
    particles = particles.filter(p => !p.finished());
}

      function mousePressed() {
          // Scatter particles when the mouse is clicked
          for (let particle of particles) {
              particle.scatter();
          }
      }

      class Particle {
          constructor(x, y) {
              this.x = x;
              this.y = y;
              this.alpha = 225;
              this.size = random(1, 6);
              this.velocityX = random(0.5, 0.5);
              this.velocityY = random(0.2, 0.3);
          }

          finished() {
              return this.alpha < 0;
          }

          update() {
              this.x += this.velocityX;
              this.y += this.velocityY;
              this.alpha -= 5;
          }

          scatter() {
              this.velocityX = random(-3, 3);
              this.velocityY = random(-3, 3);
          }

          show() {
              noStroke();
              fill(255, 0, 0); // Red color
              ellipse(this.x, this.y, this.size);
          }
      }
      new p5(s);