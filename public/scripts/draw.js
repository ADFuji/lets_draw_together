
console.log('wewe')
var div = document.querySelector('div')
var canvas = document.getElementById('lets_draw')
canvas.draw = function(){}
canvas.width=div.clientWidth
canvas.height=div.clientHeight
canvas.fnc="Rdraw"
var ctx = canvas.getContext('2d')
console.log(ctx)
ctx.lineJoin = "round";
ctx.lineWidth=1
ctx.thickness=5
var isDown = false
var brushs = document.querySelector('#brushs')
var i=0

var prevCoords = ''

var data = {
    function:'',
    thickness: ctx.thickness,
    color: ctx.strokeStyle,
    dots: []
}

canvas.addEventListener('mouseup',(mouse)=>{
    isDown=false
    canvas.drawing=false
    i=0
    prevCoords=[]

    console.log(data)
    socket.emit('new points', data)
    data = {
        function:'',
        thickness: ctx.thickness,
        color: ctx.strokeStyle,
        dots: []
    }
    
})
canvas.addEventListener('mousedown',(mouse)=>{
    if(!brushs.grab){
        isDown=true
        canvas.drawing=true
        prevCoords=[mouse.offsetX, mouse.offsetY]
        console.log(canvas.fnc)
        data.function=canvas.fnc
        data.thickness=ctx.thickness
        data.color=ctx.strokeStyle
    }
})
canvas.addEventListener('mousemove',(mouse)=>{
    if(mouse.buttons!=0&&!brushs.grab){
        canvas.draw(mouse)

        
        /*
        if(prevCoords!=[mouse.offsetX, mouse.offsetY]){
            ctx.moveTo(prevCoords[0],prevCoords[1]);
            ctx.lineTo(mouse.offsetX, mouse.offsetY);
            ctx.stroke();
            prevCoords=[mouse.offsetX, mouse.offsetY]
        }
        else{
            
        }*/
    }
    else{
        prevCoords=[]
    }
/*

        ctx.beginPath();
        ctx.arc(mouse.offsetX, mouse.offsetY, 1, 0, 2 * Math.PI);
        i+=0.5
        ctx.stroke();
        ctx.fill()*/
    

})
var thickness = document.getElementById('thickness')
thickness.value=5
ctx.thickness=thickness.value
thickness.addEventListener('input',(e)=>{
    console.log(thickness.value)
    ctx.thickness=thickness.value
})
var color = document.getElementById('color')
color.addEventListener('change',()=>{
    console.log(typeof(color.value))
    ctx.strokeStyle=color.value
    ctx.fillStyle=color.value
    console.log(ctx)
})

ctx.imageSmoothingEnabled = false;