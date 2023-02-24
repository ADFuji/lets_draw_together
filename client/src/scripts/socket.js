
const socket = io('http://localhost:3000');

export class MySocket{
    constructor(){
        //this.username = "AD"
        this.socket = socket
        this.socket.on('connected', (data) => {
            console.log(data)
        });
    }
    async setUsername(username){
        this.username = username
    }
    async emit(event, data){
        console.log(event, data)
        this.socket.emit(event, data);
    }
    newPlot(brush){
        let plot = new Plot({
            username: this.username, 
            position: brush.getPosition(), 
            brush: brush.id,
            color: brush.color,
            size: brush.size
        })
        this.socket.emit('new_plot', plot)
    }
    async log(arg){
        this.socket.emit('console.log', arg);
    }
    async on(event, callback){
        console.log(event, callback)
        this.socket.on(event, callback);
    }
    async login(){
        var form = document.querySelector('form')
        var username = document.getElementById('username')
        var password = document.getElementById('password')

        let main_page = document.getElementById('main_page')
        main_page.setAttribute('style', 'display: none;')

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (username.value&&password.value) {
                let data = {
                    username: username.value,
                    password: password.value
                }
                socket.emit('try_to_connect', data)
                username.value = ''
                password.value = ''
            }
            

        });

        socket.on('connected', data => {
            this.username = data
            socket.emit('console.log', this.username)
            let try_login = document.getElementById('try_login')
            try_login.setAttribute('style', 'display: none')
            let login_succes = document.getElementById('login_succes')
            login_succes.setAttribute('style', 'display: initial')
            setTimeout(function() {
                login_succes.setAttribute('style', 'display: none')
                let main_page = document.getElementById('main_page')
                main_page.setAttribute('style', 'display: initial')
            }, 3000)
        })
        await this.init()
        this.log(this.init_data)

    }
    async init(){
        let data = await fetch('http://localhost:3000/plots')
        data = await data.json()
        this.init_data = data

    }

    test(){
        this.socket.emit('test', 'test');
    }
    getUsername(){
        return this.username
    }
}