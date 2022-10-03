function Mdraw(mouse){
    let coords = document.getElementById('coords')
    coords.innerHTML=(`${mouse.pageX}, ${mouse.pageY}`)
    view.x+=(view.x>0&&view.x<=30000)?(mousedown_coords[0]-mouse.offsetX)/10:0
    view.y+=(view.y>=0&&view.y<=30000)?(mousedown_coords[1]-mouse.offsetY)/10:0
    
    view.x=(view.x>30000)?30000:view.x
    view.y=(view.y>30000)?30000:view.y
    window.scroll(view.x,view.y)
}