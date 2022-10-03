//const { Socket } = require("socket.io")

const name = 'brushs'
var brushs = document.querySelector('#brushs')
var grab = brushs.querySelector('#button_brushs_grab')
var buttons = brushs.querySelector('ul')
console.log(buttons)

brushs.grab=false


var prevCoords = ''
var mousedown_coords


view={x:1500,y:1500}

function Rdraw(mouse){
    if(prevCoords!=[mouse.offsetX, mouse.offsetY]){
        let pre = prevCoords
        ctx.beginPath();
        ctx.lineCap = 'round';
        ctx.miterLimit=1
        ctx.moveTo(prevCoords[0], prevCoords[1])
        //ctx.arc(mouse.offsetX, mouse.offsetY, ctx.thickness/2, 0, 2 * Math.PI);
        ctx.lineTo(mouse.offsetX, mouse.offsetY);
        ctx.lineWidth=ctx.thickness
        ctx.fill();
        ctx.stroke()
        prevCoords=[mouse.offsetX, mouse.offsetY]
        data.dots.push([pre,prevCoords])



        //socket.emit('new point',`ctx.beginPath();ctx.lineCap = "round";ctx.miterLimit=1;ctx.moveTo(${prevCoords[0]}, ${prevCoords[1]});ctx.lineTo(${mouse.offsetX}, ${mouse.offsetY});ctx.lineWidth=${ctx.thickness};ctx.fill();ctx.stroke();prevCoords=[${mouse.offsetX}, ${mouse.offsetY}]`)
    }

}
function Mdraw(mouse){
    let coords = document.getElementById('coords')
    coords.innerHTML=(`${mouse.pageX}, ${mouse.pageY}`)
    view.x+=(view.x>0&&view.x<=30000)?(mousedown_coords[0]-mouse.offsetX)/10:0
    view.y+=(view.y>=0&&view.y<=30000)?(mousedown_coords[1]-mouse.offsetY)/10:0
    
    view.x=(view.x>30000)?30000:view.x
    view.y=(view.y>30000)?30000:view.y
    window.scroll(view.x,view.y)
}
function Expdraw(mouse){
    ctx.lineWidth=1
    i+=1.5
    ctx.beginPath();
    ctx.arc(mouse.offsetX, mouse.offsetY, 1+i, 0, 2 * Math.PI);
    ctx.stroke();
    data.dots.push([[],[mouse.offsetX, mouse.offsetY]])
}

brushs.addEventListener('mousedown', (mouse)=>{
    if(mouse.target.id=='button_brushs_grab' && !canvas.drawing){
        brushs.grab=true
        grab.setAttribute('style','cursor:grabbing;')
    }
    else{
        mousedown_coords=[parseInt(mouse.x,10), parseInt(mouse.y,10)]
    }
})
brushs.addEventListener('mouseup', (mouse)=>{
    if(brushs.grab){
        brushs.grab=false
        grab.setAttribute('style','')
    }
})
buttons.addEventListener('mousedown',(mouse)=>{
    switch(mouse.target.id){
        case('regular'):
            canvas.fnc="Rdraw"
            canvas.draw = Rdraw
            break
        case('exponential'):
            canvas.fnc="Expdraw"
            canvas.draw = Expdraw
            break
        case('move'):
            canvas.fnc="Mdraw"
            canvas.draw = Mdraw
            break
    }
})

function moveBrushs(mouse){
    if(brushs.grab){
        let string = `top:${mouse.clientY-10}px;left:${mouse.clientX-10}px`
        console.log(string)
        brushs.setAttribute('style',string)
    }
}

