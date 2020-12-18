let g_MassArray = [];
let g_positionXArray = [];
let g_positionYArray = [];
let g_velocityXArrat = [];
let g_velocityYArrat = [];


function setup() {
	createCanvas(windowWidth, windowHeight);
	noStroke();
	fill(64, 255, 255, 192);
}

function draw() {
	background(32);
	
	for (let i = 0; i < g_MassArray.length; i++) {
		let accelerationX = 0, accelerationY = 0;
		
		for (let j = 0; j < g_MassArray.length; j++) {
			if (i != j) {
				let distanceX = g_positionXArray[j] - g_positionXArray[i];
				let distanceY = g_positionYArray[j] - g_positionYArray[i];

				let distance = sqrt(distanceX * distanceX + distanceY * distanceY);
				if (distance < 1) distance = 1;

				let force = (distance - 320) * g_MassArray[j] / distance;
				accelerationX += force * distanceX;
				accelerationY += force * distanceY;
			}
		}
		
		g_velocityXArrat[i] = g_velocityXArrat[i] * 0.99 + accelerationX * g_MassArray[i];
		g_velocityYArrat[i] = g_velocityYArrat[i] * 0.99 + accelerationY * g_MassArray[i];
	}
	
	for (let particle = 0; particle < g_MassArray.length; particle++) {
		g_positionXArray[particle] += g_velocityXArrat[particle];
		g_positionYArray[particle] += g_velocityYArrat[particle];
        
        fill(random(0,255), random(0,255), random(0,255));
		ellipse(g_positionXArray[particle], g_positionYArray[particle], g_MassArray[particle] * 1000, g_MassArray[particle] * 1000);
	}
}

function addNewParticle( positionX, positionY) {
	g_MassArray.push(random(0.003, 0.03));
	g_positionXArray.push(positionX);
	g_positionYArray.push(positionY);
	g_velocityXArrat.push(0);
	g_velocityYArrat.push(0);
}

function mouseClicked() {
	addNewParticle(mouseX, mouseY);
}

function mouseDragged() {
	addNewParticle(mouseX, mouseY);
}