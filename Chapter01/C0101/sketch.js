

/// <reference path= "../../lib/p5.global-mode.d.ts"/>

        function setup()
        {
            createCanvas( 800, 600 );

            textSize(20);
        }

        function draw()
        {
            background( 96, 96, 96 );



            
            stroke(255, 0, 0);
            strokeWeight( 5 );
            line( 0, mouseY, windowWidth, mouseY);
            text( "(" + parseInt(mouseX) + ")", 4, mouseY - 8);

            stroke(0, 255, 0);
            strokeWeight(5)
            line(mouseX, 0, mouseX, windowHeight);
            text( "(" + parseInt(mouseY) + ")", mouseX + 8, 24 );


         //   if ( touches.length >= 1 )
         //   {
              //  let mx = touches[0].x ;
              //  let my = touches[0].y ;

                
                //stroke(255, 0, 0);
                //strokeWeight( 5 );
                //line( 0, my, windowWidth, my );
               // text( "( " + parseInt( mx ) + " )", 4, my - 8 );
                //stroke(0, 255, 0);
                //strokeWeight(5)
                //line(mx, 0, mx, windowHeight);
                //text( "(" + parseInt(my) + ")", mx + 8, 24 );
           // }
       
        }