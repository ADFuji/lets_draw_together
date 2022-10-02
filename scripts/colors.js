var thickness = document.getElementById('thickness')

thickness.addEventListener('change',(e)=>{
    console.log(e)
    ctx.lineWidth=thickness.nodeValue
})