/// <reference path= "../../lib/p5.global-mode.d.ts"/>

       let mass = [];
       let positionX = [];
       let positionY = [];
       let velocityX = [];
       let velocityY = [];


        function setup()
        {
            createCanvas( 800, 600 );
            noStroke();
            fill(64, 255, 255, 150);
        }

        function draw()
        {
            background( 96, 96, 96 );

            for (var particleA = 0; particleA < mass.length; particleA++) {
                var accelerationX = 0, accelerationY = 0;
                
                for (var particleB = 0; particleB < mass.length; particleB++) {
                    if (particleA != particleB) {
                        var distanceX = positionX[particleB] - positionX[particleA];
                        var distanceY = positionY[particleB] - positionY[particleA];
        
                        var distance = sqrt(distanceX * distanceX + distanceY * distanceY);
                        if (distance < 1) distance = 1;
        
                        var force = (distance - 320) * mass[particleB] / distance;
                        accelerationX += force * distanceX;
                        accelerationY += force * distanceY;
                    }
                }
                
                velocityX[particleA] = velocityX[particleA] * 0.99 + accelerationX * mass[particleA];
                velocityY[particleA] = velocityY[particleA] * 0.99 + accelerationY * mass[particleA];
            }
            
            for (var particle = 0; particle < mass.length; particle++) {
                positionX[particle] += velocityX[particle];
                positionY[particle] += velocityY[particle];
                
                ellipse(positionX[particle], positionY[particle], mass[particle] * 1000, mass[particle] * 1000);
            }
        }
        

        function addNewParticle(){
            mass.push(random(0.003, 0.03));
            positionX.push(mouseX);
            positionY.push(mouseY);
            velocityX.push(0);
            velocityY.push(0);
        }

        //bug
        function minusNewParticle(){
            mass.remove(random(0.003, 0.03));
            positionX.remove(mouseX);
            positionY.remove(mouseY);
            velocityX.remove(0);
            velocityY.remove(0);
        }
        

        function mouseClicked() {
            if(mousePressed == LEFT)
            {
                addNewParticle();
            }


            //bug 
            if(mousePressed == RIGHT)
            {
                minusNewParticle();
            }
        }

        function mouseDragged() {
            addNewParticle();
        }