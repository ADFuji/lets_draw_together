//require the express module
const express = require("express")
const app = express()
const bodyParser = require("body-parser")

//require the http module
const http = require("http").Server(app)
// require the socket.io module
const io = require("socket.io")(http)
const port = 5000
//bodyparser middleware
app.use(bodyParser.json())
//routes
//set the express.static middleware
app.use(express.static(__dirname + "/public"))
//integrating socketio
socket = io.Server

const dotsRouter = require("./routes/Data")
let Data = require('./models/Data')
app.use("/dots", dotsRouter)
const connect = require("./dbconnect")

io.on('connection', (socket)=>{
    console.log('new connection', socket.id)

    socket.on('new points', (data)=>{
        socket.broadcast.emit('new points',data)
        console.log(data)
        connect.then(db=>{
            let paquet = new Data({
                function:data.function,
                thickness:data.thickness,
                color: data.color,
                dots: data.dots
            })
            paquet.save()
        })
    })
})



http.listen(port, () => {
    console.log("Running on Port: " + port);
  });