//const FIREWORK_TYPE=3;

!(function (){
    var canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.style.position = "fixed";
    canvas.style.left = "0";
    canvas.style.top = "0";
    canvas.style.zIndex = 0;
    var context = canvas.getContext("2d");
    function resizeCanvas(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        clearCanvas();
    }
    function clearCanvas(){
        context.fillStyle = "#000000";
        context.fillRect(0,0,canvas.width,canvas.height);
    }
    resizeCanvas();
    window.addEventListener("resize",resizeCanvas);
    function mouseDownHandler(e){
        var x = e.clientX;
        var y = e.clientY;
        var N=Math.floor(Math.random()*10);
        var type=[1,2,3,1,2,3,1,2,3,1];
        var FIREWORK_TYPE = type[Math.floor(Math.random()*10)];
        createFireworks1(x,y,N,FIREWORK_TYPE);
        //createFireworks2(x,y);
    }
    document.addEventListener("mousedown",mouseDownHandler); 

    var particles = [];
        setInterval(
            function(){
            createFireworks1(Math.random()*canvas.width,Math.random()*canvas.height-canvas.height/4,Math.floor(Math.random()*10),4)
        },300)
    function createFireworks1(x,y,N,FIREWORK_TYPE){
        var count = 350;
        var radius = 1;
        var hue = Math.floor(Math.random()*260)+20;
        var hueVariance =40;
        for(var i = 0;i<count;i++){
            var lim = i/count;
            var radians = lim-1;
            var p = {};
            p.x = x;
            p.y = y;
            p.N=N;
            p.FIREWORK_TYPE=FIREWORK_TYPE;
            p.radians = radians;
            p.size = 2;
            p.speed = (Math.random()*5)+.4;
            p.radius = p.speed;
            p.hue = Math.floor(Math.random()*(( hue + hueVariance) - (hue - hueVariance)))+(hue - hueVariance);
            p.brightness = Math.floor(Math.random()*31)+50;
            p.alpha = (Math.floor(Math.random()*61)+40)/100;

            particles.push(p);
        }
    }
    function drawFireworksleft(){
            clearCanvas();
            var type_array = [4,6,8,10,12,14,4,6,8,10];
            for(var i = 0;i<particles.length;i++){
                var p = particles[i];
                switch(p.FIREWORK_TYPE) {
                    case 1:
                        var vx=(1-Math.cos(p.radians*Math.PI*2))*Math.cos(p.radians*Math.PI*2-Math.PI/2)*p.radius;
                        var vy=(1-Math.cos(p.radians*Math.PI*2))*Math.sin(p.radians*Math.PI*2-Math.PI/2)*p.radius+1;
                        break;
                    case 2:
                        var vx=Math.cos(p.radians*Math.PI*2-Math.PI/2)*p.radius;
                        var vy=Math.sin(p.radians*Math.PI*2-Math.PI/2)*p.radius+1;
                        break;
                    case 3:
                        var vx=Math.sin(p.radians*Math.PI*type_array[p.N])*Math.cos(p.radians*Math.PI*2-Math.PI/2)*p.radius;
                        var vy=Math.sin(p.radians*Math.PI*type_array[p.N])*Math.sin(p.radians*Math.PI*2-Math.PI/2)*p.radius+1;  
                        break;
                    default:
                        var vx=0.4*(1-Math.cos(p.radians*Math.PI*2))*Math.cos(p.radians*Math.PI*2-Math.PI/2)*p.radius;
                        var vy=0.4*(1-Math.cos(p.radians*Math.PI*2))*Math.sin(p.radians*Math.PI*2-Math.PI/2)*p.radius+1;
                        break;
            }
                p.x += vx;
                p.y += vy;
                p.radius *=1 - p.speed/150;
                p.alpha -= 0.004;

                if(p.alpha<=0){
                    particles.splice(i,1);
                    continue;
                }

                context.beginPath();
                context.arc(p.x,p.y,p.size,0,Math.PI*2,false);
                context.closePath();

                context.fillStyle ='hsla('+p.hue+',100%,'+p.brightness+'%,'+p.alpha+')';
                context.fill();
    
            }
    }
    function tick02(){
        context.globalCompositeOperation = 'destination-out';
        context.fillStyle = 'rgba(0,0,0,'+10/100+')';
        context.fillRect(0,0,canvas.width,canvas.height);
        context.globalCompositeOperation ='lighter' ;
                drawFireworksleft();
requestAnimationFrame(tick02);
        }    tick02();
})();