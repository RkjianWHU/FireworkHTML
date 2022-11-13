const FIREWORK_TYPE=1;
//0：附带自动效果，1000ms一个
//1：比较胖的爱心线，1、2、3都是鼠标点击有效果
//2：普通圆形，带点重力效果
//3：见下
const N=0;
//FIREWORK_TYPE==3时，
//N可以选择[0~5]任意值,粒子效果是三叶草线，N控制叶子数


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

        createFireworks1(x,y);
        createFireworks2(x,y);
    }
    document.addEventListener("mousedown",mouseDownHandler); 

    var particles = [];
    
    if(FIREWORK_TYPE==0){
        setInterval(
            function(){
            createFireworks1(Math.random()*canvas.width,Math.random()*canvas.height)
        },1000)
    }
    function createFireworks1(x,y){
        var count = 1500;
        var radius = 1;
        var hue = Math.floor(Math.random()*260)+20;
        var hueVariance =40;
        for(var i = 0;i<count;i++){
            var lim = i/count;
            var radians = lim-1;
            var p = {};
            p.x = x;
            p.y = y;
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
    function drawFireworksleft1(){
            clearCanvas();
            for(var i = 0;i<particles.length;i++){
                var p = particles[i];
    
                var vx=(1-Math.cos(p.radians*Math.PI*2))*Math.cos(p.radians*Math.PI*2-Math.PI/2)*p.radius;
                var vy=(1-Math.cos(p.radians*Math.PI*2))*Math.sin(p.radians*Math.PI*2-Math.PI/2)*p.radius+1;
                p.x += vx;
                p.y += vy;
                p.radius *=1 - p.speed/150;
                p.alpha -= 0.005;

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
    function drawFireworksleft2(){
        clearCanvas();
        for(var i = 0;i<particles.length;i++){
            var p = particles[i];

            var vx=Math.cos(p.radians*Math.PI*2-Math.PI/2)*p.radius;
            var vy=Math.sin(p.radians*Math.PI*2-Math.PI/2)*p.radius+1;
            p.x += vx;
            p.y += vy;
            p.radius *=1 - p.speed/150;
            p.alpha -= 0.005;

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
function drawFireworksleft3(){
    clearCanvas();
    
    var type_array = [4,6,8,10,12,14]
    var type = type_array[N]
    for(var i = 0;i<particles.length;i++){
        var p = particles[i]; 
        var vx=Math.sin(p.radians*Math.PI*type)*Math.cos(p.radians*Math.PI*2-Math.PI/2)*p.radius;
        var vy=Math.sin(p.radians*Math.PI*type)*Math.sin(p.radians*Math.PI*2-Math.PI/2)*p.radius+1;
        p.x += vx;
        p.y += vy;
        p.radius *=1 - p.speed/150;
        p.alpha -= 0.005;

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
        switch(FIREWORK_TYPE) {
            case 1:
                drawFireworksleft1();
                break;
            case 2:
                drawFireworksleft2();
                break;
            case 3:
                drawFireworksleft3();
                break;
            default:
                drawFireworksleft1();
                break;
    }   
requestAnimationFrame(tick02);
        }    tick02();
})();