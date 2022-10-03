var prevCoords = ''
function draw(mouse){
    if(prevCoords!=[mouse.offsetX, mouse.offsetY]){
        ctx.moveTo(prevCoords[0],prevCoords[1]);
        ctx.lineTo(mouse.offsetX, mouse.offsetY);
        ctx.stroke();
        prevCoords=[mouse.offsetX, mouse.offsetY]
    }
    else{
        
    }
}