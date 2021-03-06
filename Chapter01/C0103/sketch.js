// Mutual repulsion, with optional gravity

var g_Particles = [];		// 파티클 배열
var g_NumParticles = 250;	// 파티클 갯수
var g_MaxRadius = 160;	 	//파티클 생성시 최대 반지름
var clicked = false;
var margin = 20
var oldMouseX = 0
var oldMouseY = 0
var count = 0

//==========================================================



function setup() {
	createCanvas(800, 600);
	noStroke()

	for (var i = 0; i < g_NumParticles; i++) {
		var radius = random(0, g_MaxRadius)
		var angle = random(0, TWO_PI)
		var rx = cos(angle) * radius + width / 2
		var ry = sin(angle) * radius + height / 2
		// var rx = random(width/2 - radius, width/2 + radius);
		// var ry = random(height/2 - radius, height/2 + radius);
		g_Particles[i] = new Particle(random(5, 7));
		g_Particles[i].set(rx, ry);
	}
}


function keyPressed() {
	for (var i = 0; i < g_Particles.length; i++) {
		g_Particles[i].px = random(width);
		g_Particles[i].py = random(height);
	}
}


//==========================================================
function draw() {
	if (oldMouseX == mouseX && oldMouseY == mouseY) {
		count += 1
	} else {
		count = 0
	}
	print(count)
	background( 126, 126, 126);

	var gravityForcex = 0;
	var gravityForcey = 0.05;
	var mutualRepulsionAmount = .5;
	var mouseMutualRepulsionAmount = 500;


	for (var i = 0; i < g_Particles.length; i++) {
		var ithParticle = g_Particles[i];
		var px = ithParticle.px;
		var py = ithParticle.py;


		for (var j = 0; j < i; j++) {
			var jthParticle = g_Particles[j];
			var qx = jthParticle.px;
			var qy = jthParticle.py;

			var dx = px - qx;
			var dy = py - qy;
			var dh = sqrt(dx * dx + dy * dy);
			if (dh > 1.0) {

				var componentInX = dx / dh;
				var componentInY = dy / dh;
				var proportionToDistanceSquared = 1.0 / (dh * dh);

				var repulsionForcex = mutualRepulsionAmount * componentInX * proportionToDistanceSquared;
				var repulsionForcey = mutualRepulsionAmount * componentInY * proportionToDistanceSquared;

				ithParticle.addForce(repulsionForcex, repulsionForcey); // add in forces
				jthParticle.addForce(-repulsionForcex, -repulsionForcey); // add in forces
			}
		}

		var dMouseX = px - mouseX
		var dMouseY = py - mouseY
		var dMouse = sqrt(dMouseX ** 2 + dMouseY ** 2);

		if (dMouse < 400 && dMouse > 8) {

			var mouseComponentInX = dMouseX / dMouse;
			var mouseComponentInY = dMouseY / dMouse;
			var mouseProportionToDistanceSquared = 1.0 / (dMouse ** 2);

			var mouseRepulsionForcex = (mouseMutualRepulsionAmount) * mouseComponentInX * mouseProportionToDistanceSquared;
			var mouseRepulsionForcey = (mouseMutualRepulsionAmount) * mouseComponentInY * mouseProportionToDistanceSquared;

			if (count < 200) {
				ithParticle.addForce(-mouseRepulsionForcex, -mouseRepulsionForcey);


			} else { }
		} else { }


	}
	for (var i = 0; i < g_Particles.length; i++) {
		g_Particles[i].bPeriodicBoundaries = false;
		g_Particles[i].bElasticBoundaries = true;

		// var distanceFromCenter = getDistance(width/2, height/2, myParticles[i].px, myParticles[i].py)
		// if(distanceFromCenter <= maxRadius ){
		//   myParticles[i].update();
		// } // update all locations
		g_Particles[i].update();
	}

	for (var i = 0; i < g_Particles.length; i++) {
		g_Particles[i].render(); // draw all particles
	}

	fill(200, 200, 200);
	noStroke();
	textSize(20);
	textFont('Avenir')

	if (clicked == false) {
		text("Mouse over a dot!", margin * 12 + width / 2 - 60, height / 2);
	}

	oldMouseX = mouseX
	oldMouseY = mouseY
}


//==========================================================
//========================================================== 
function Particle(size) {
	this.px = 0;
	this.py = 0;
	this.vx = 0;
	this.vy = 0;
	this.damping = 0.96;
	this.mass = 1.0;
	this.bLimitVelocities = true;
	this.bPeriodicBoundaries = false;
	this.bElasticBoundaries = true;
	this.size = size


	this.set = function (x, y) {
		this.px = x;
		this.py = y;
		this.vx = 0;
		this.vy = 0;
		this.damping = 0.96;
		this.mass = 1.0;
	}

	this.addForce = function (fx, fy) {
		ax = fx / this.mass;
		ay = fy / this.mass;
		this.vx += ax;
		this.vy += ay;
	}

	this.update = function () {
		this.vx *= this.damping;
		this.vy *= this.damping;
		this.limitVelocities();
		this.handleBoundaries();
		this.px += this.vx;
		this.py += this.vy;
	}

	this.limitVelocities = function () {
		if (this.bLimitVelocities) {
			var speed = sqrt(this.vx * this.vx + this.vy * this.vy);
			var maxSpeed = 10;
			if (speed > maxSpeed) {
				this.vx *= maxSpeed / speed;
				this.vy *= maxSpeed / speed;
			}
		}
	}

	this.inBounds = function () {
		return (this.px < width && this.px > 0 && this.py < height && this.py > 0);
	}

	this.handleBoundaries = function () {
		var distanceFromCenter = getDistance(width / 2, height / 2, this.px, this.py)
		// if(distanceFromCenter > maxRadius){
		//   this.px = this.px * .999 + width/2 * .001
		//   this.py = this.py * .999 + height/2 * .001
		// }
		// if(distanceFromCenter > maxRadius){
		//   if(this.px>width/2 + maxRadius)this.vx=-this.vx;
		//   if(this.px<width/2 - maxRadius)this.vx=-this.vx;
		//   if(this.py>height/2 + maxRadius)this.vy=-this.vy;
		//   if(this.py<height/2 - maxRadius)this.vy=-this.vy;      
		// }

		// if(distanceFromCenter > maxRadius){
		//   if(this.px>width/2 + maxRadius)this.px-=maxRadius* 2;
		//   if(this.px<width/2 - maxRadius)this.px+=maxRadius* 2;
		//   if(this.py>height/2 + maxRadius)this.py-=maxRadius * 2;
		//   if(this.py<height/2 - maxRadius)this.py+=maxRadius * 2;     
		// }
		if (this.bPeriodicBoundaries) {
			if (this.px > width) this.px -= width;
			if (this.px < 0) this.px += width;
			if (this.py > height) this.py -= height;
			if (this.py < 0) this.py += height;
		} else if (this.bElasticBoundaries) {
			if (this.px > width) this.vx = -this.vx;
			if (this.px < 0) this.vx = -this.vx;
			if (this.py > height) this.vy = -this.vy;
			if (this.py < 0) this.vy = -this.vy;
		}
	}
	this.render = function (size) {
		var distance = getDistance(mouseX, mouseY, this.px, this.py)
		var factor = map(distance, 0, 75, 3, 1)
		if (distance >= 75) {
			var size = this.size + log(abs(this.vx) * 50)
		} else {
			clicked = true
			var size = (this.size + log(abs(this.vx) * 50)) * factor
		}

		var opacity = map(size, 0, 40, 100, 255);

		// var opacity = map(size, 0, 100, 3, 1)
		fill(132, 0, 248, opacity);

		ellipse(this.px, this.py, size, size);
	}
}

function getDistance(x1, y1, x2, y2) {
	return sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)
}