/// <reference path= "../../lib/p5.global-mode.d.ts"/>

       let g_MassArray = [];
       let g_PositionXArray = [];
       let g_PositionYArray = [];
       let g_VelocityXArray = [];
       let g_VelocityXArray = [];


        function setup()
        {
            createCanvas( 800, 600 );
            noStroke();
            fill(64, 255, 255, 150);
        }

        function draw()
        {
            background( 96, 96, 96 );

            for (let particleA = 0; particleA < g_MassArray.length; particleA++) {
                let accelerationX = 0, accelerationY = 0;
                
                for (let particleB = 0; particleB < g_MassArray.length; particleB++) {
                    if (particleA != particleB) {
                        let distanceX = g_PositionXArray[particleB] - g_PositionXArray[particleA];
                        let distanceY = positionY[particleB] - positionY[particleA];
        
                        let distance = sqrt(distanceX * distanceX + distanceY * distanceY);
                        if (distance < 1) distance = 1;
        
                        let force = (distance - 320) * g_MassArray[particleB] / distance;
                        accelerationX += force * distanceX;
                        accelerationY += force * distanceY;
                    }
                }
                
                g_VelocityXArray[particleA] = g_VelocityXArray[particleA] * 0.99 + accelerationX * g_MassArray[particleA];
                g_VelocityXArray[particleA] = g_VelocityXArray[particleA] * 0.99 + accelerationY * g_MassArray[particleA];
            }
            
            for (let particle = 0; particle < g_MassArray.length; particle++) {
                g_PositionXArray[particle] += g_VelocityXArray[particle];
                positionY[particle] += g_VelocityXArray[particle];
                
                ellipse(g_PositionXArray[particle], positionY[particle], g_MassArray[particle] * 1000, g_MassArray[particle] * 1000);
            }
        }
        

        function addNewParticle(){
            g_MassArray.push(random(0.003, 0.03));
            g_PositionXArray.push(mouseX);
            positionY.push(mouseY);
            g_VelocityXArray.push(0);
            g_VelocityXArray.push(0);
        }

        //bug
        function minusNewParticle(){
            g_MassArray.remove(random(0.003, 0.03));
            g_PositionXArray.remove(mouseX);
            positionY.remove(mouseY);
            g_VelocityXArray.remove(0);
            g_VelocityXArray.remove(0);
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