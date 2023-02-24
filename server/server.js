//MONGODB MONGOOSE
const connect = require('./src/modules/dbconnect');
const User = require('./src/models/User');
const Plot = require('./src/models/Plot')
const Layer = require('./src/models/Layer');

//BCRYPT
const bcrypt = require('bcrypt')

//SERVER
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
socket = io.Server

//ROUTER
const layersRouter = require("./src/routes/Layer")
app.use("/layers", layersRouter)

const plotsRouter = require("./src/routes/Plot")
app.use('/plots', plotsRouter)


//new admin
/*connect.then(db => {
    bcrypt.hash("admin", 10)
    .then(hash => {
        let admin = new User({
            username: "AD",
            password: hash
        })
        admin.save()
    })
})*/

io.on('connection', (socket) => {
    console.log(socket.id)
    socket.on('try_to_connect', (data) => {
        console.log(data)
        connect.then((db) => {
            User.findOne({username: data.username}, (err, user) => {
                if (err) {
                    console.log(err)
                } else {
                    if (user) {
                        bcrypt.compare(data.password, user.password)
                        .then(result=>{
                            console.log(result)
                            if(result){
                                io.to(socket.id).emit('connected', user.username)
                            }else{
                                io.to(socket.id).emit('not_connected','not connected')
                            }
                        })
                    } else {
                        io.to(socket.id).emit('not_connected','not connected')
                    }
                }
            })
        })
    })
    connect.then((db) => {
        Layer.find({}, (err, layers) => {
            if (err) {
                console.log(err)
            } else {
                socket.emit('reload_layer', layers)
            }
        })
    })
    io.to(socket.id).emit('reload_layer', 'connected')
    socket.on('test', (data) => {
        console.log(data)
    })
    socket.on('console.log', (data) => {
        console.log(data)
    })

    socket.on('edit_layer', (data) => {
        console.log(data)
        connect.then((db) => {
            Layer.findOne({id: data.id}, (err, layer) => {
                if (err) {
                    console.log(err)
                } else {
                    if (layer) {
                        layer.image = data.image
                        layer.save()
                    } else {
                        let newLayer = new Layer({
                            id: data.id,
                            image: data.image
                        })
                        newLayer.save()
                        io.emit('reload_layer', data)
                    }
                }
            })
        })
    })
    socket.on('new_plot', (plot)=>{
        console.log(plot)
        connect.then(db=>{
            let _plot = new Plot({
                drawer: plot.username,
                coordinates: plot.position,
                brush_id: plot.brush,
                color: plot.color,
                size: plot.size
            })
            _plot.save()
        })
    })
    
});
server.listen(3000, () => {
    console.log('listening on *:3000')
});