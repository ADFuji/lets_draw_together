
window.onload=()=>{
    view={x:1500,y:1500}
    window.scroll(view.x,view.y)

    var canvas = document.getElementById('lets_draw')
    canvas.draw = Rdraw
    console.log(canvas)
    

    var mousedown_coords

    window.addEventListener('mousedown',(mouse)=>{
        mousedown_coords=[parseInt(mouse.x,10), parseInt(mouse.y,10)]
    })
    window.addEventListener('mouseup',()=>{
        mousedown_coords=[0,0]
    })
    window.addEventListener('mousemove',(mouse)=>{
        moveBrushs(mouse)
    })
}