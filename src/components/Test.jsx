import React, { useRef, useEffect } from "react";
import p5 from "p5";
import "./Test.css";

const BoidsSimulation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // The main p5 sketch function
    const P5Sketch = (p) => {
      let flock;

      // --- Boid Class (Individual Dove/Entity) ---
      class Boid {
        constructor(x, y) {
          this.acceleration = p.createVector(0, 0);
          this.velocity = p.Vector.random2D();
          this.position = p.createVector(x, y);
          this.r = 3.0;
          this.maxspeed = 3;
          this.maxforce = 0.05;
          this.home = p.createVector(125, 100);
        }

        update() {
          this.velocity.add(this.acceleration);
          this.velocity.limit(this.maxspeed);
          this.position.add(this.velocity);
          this.acceleration.mult(0);
        }

        applyForce(force) {
          this.acceleration.add(force);
        }

        seek(target) {
          let desired = p.Vector.sub(target, this.position);
          desired.normalize();
          desired.mult(this.maxspeed);
          let steer = p.Vector.sub(desired, this.velocity);
          steer.limit(this.maxforce);
          return steer;
        }

        flock(boids) {
          let sep = this.separate(boids);
          let ali = this.align(boids);
          let coh = this.cohesion(boids);
          let seekHome = this.seek(this.home);

          sep.mult(1.5);
          ali.mult(1.0);
          coh.mult(1.0);
          seekHome.mult(0.05);

          // Mouse repulsion logic (interactive element)
          if (
            p.mouseX > 0 &&
            p.mouseX < p.width &&
            p.mouseY > 0 &&
            p.mouseY < p.height
          ) {
            let mouseLoc = p.createVector(p.mouseX, p.mouseY);
            let distToMouse = p.Vector.dist(this.position, mouseLoc);
            let repulsionRadius = 100;
            if (distToMouse < repulsionRadius) {
              let repelForce = p.Vector.sub(this.position, mouseLoc);
              repelForce.normalize();
              repelForce.mult(this.maxspeed);
              repelForce.mult(p.map(distToMouse, 0, repulsionRadius, 1.5, 0));
              this.applyForce(repelForce);
            }
          }

          this.applyForce(sep);
          this.applyForce(ali);
          this.applyForce(coh);
          this.applyForce(seekHome);
        }

        borders() {
          if (this.position.x < -this.r) this.position.x = p.width + this.r;
          if (this.position.y < -this.r) this.position.y = p.height + this.r;
          if (this.position.x > p.width + this.r) this.position.x = -this.r;
          if (this.position.y > p.height + this.r) this.position.y = -this.r;
        }

        show() {
          let theta = this.velocity.heading() + p.HALF_PI;
          p.fill(0, 0, 200, 200); // Semi-transparent blue
          p.stroke(0, 0, 200);
          p.strokeWeight(1);
          p.push();
          p.translate(this.position.x, this.position.y);
          p.rotate(theta);
          p.beginShape(p.TRIANGLES);
          p.vertex(0, -this.r * 2);
          p.vertex(-this.r, this.r * 2);
          p.vertex(this.r, this.r * 2);
          p.endShape(p.CLOSE);
          p.pop();
        }

        // Flocking Rules (separate, align, cohesion) are identical to the original p5 code
        separate(boids) {
          let desiredseparation = 25.0;
          let steer = p.createVector(0, 0);
          let count = 0;
          for (let other of boids) {
            let d = p.Vector.dist(this.position, other.position);
            if (d > 0 && d < desiredseparation) {
              let diff = p.Vector.sub(this.position, other.position);
              diff.normalize();
              diff.div(d);
              steer.add(diff);
              count++;
            }
          }
          if (count > 0) {
            steer.div(count);
          }
          if (steer.mag() > 0) {
            steer.normalize();
            steer.mult(this.maxspeed);
            steer.sub(this.velocity);
            steer.limit(this.maxforce);
          }
          return steer;
        }

        align(boids) {
          let neighborDist = 50;
          let sum = p.createVector(0, 0);
          let count = 0;
          for (let other of boids) {
            let d = p.Vector.dist(this.position, other.position);
            if (d > 0 && d < neighborDist) {
              sum.add(other.velocity);
              count++;
            }
          }
          if (count > 0) {
            sum.div(count);
            sum.normalize();
            sum.mult(this.maxspeed);
            let steer = p.Vector.sub(sum, this.velocity);
            steer.limit(this.maxforce);
            return steer;
          } else {
            return p.createVector(0, 0);
          }
        }

        cohesion(boids) {
          let neighborDist = 50;
          let sum = p.createVector(0, 0);
          let count = 0;
          for (let other of boids) {
            let d = p.Vector.dist(this.position, other.position);
            if (d > 0 && d < neighborDist) {
              sum.add(other.position);
              count++;
            }
          }
          if (count > 0) {
            sum.div(count);
            return this.seek(sum);
          } else {
            return p.createVector(0, 0);
          }
        }
      }

      // --- Flock Class (Manages all Boids) ---
      class Flock {
        constructor() {
          this.boids = [];
        }

        run() {
          for (let boid of this.boids) {
            boid.flock(this.boids);
            boid.update();
            boid.borders();
            boid.show();
          }
        }

        addBoid(b) {
          this.boids.push(b);
        }
      }

      // --- p5.js Core Setup and Draw ---

      p.setup = () => {
        // Attach the canvas to the container referenced by canvasRef
        p.createCanvas(600, 400).parent(canvasRef.current);
        p.background(0);

        p.textFont("Georgia, serif");
        p.textSize(50);
        p.textAlign(p.LEFT, p.CENTER);

        flock = new Flock();
        for (let i = 0; i < 50; i++) {
          let b = new Boid(p.random(50, 200), p.random(50, 150));
          flock.addBoid(b);
        }
      };

      p.draw = () => {
        p.background(0); // Black background

        // Draw the "Believers" text
        p.fill(0, 0, 200); // Deep royal blue
        p.noStroke();
        p.text("Believers", 100, 250);

        // Run the simulation
        flock.run();
      };
    };

    // Instantiate the p5 sketch
    const p5Instance = new p5(P5Sketch, canvasRef.current);

    // Cleanup: Remove the p5 canvas when the component is unmounted
    return () => {
      p5Instance.remove();
    };
  }, []); // Run only once on mount

  // Render the container for the canvas
  return (
    <div className="boids-container">
      {/* The p5 canvas will be inserted into this div */}
      <div ref={canvasRef} className="boids-canvas-wrapper" />
    </div>
  );
};

export default BoidsSimulation;
