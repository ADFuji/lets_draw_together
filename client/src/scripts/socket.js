const socket = io('http://localhost:3000');
    var form = document.querySelector('form')
    var username = document.getElementById('username')
    var password = document.getElementById('password')



    /*import BrushMenu from './src/classes/BrushMenu';
    import Canvas from './src/classes/Canvas';

    var brushMenu = new BrushMenu();
    var canvas = new Canvas(document.getElementById('lets_draw'), brushMenu.current_brush);*/

    
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

    socket.on('connected', function(data) {
        let try_login = document.getElementById('try_login')
        try_login.setAttribute('style', 'display: none')
        let login_succes = document.getElementById('login_succes')
        login_succes.setAttribute('style', 'display: block')
        setTimeout(function() {
            login_succes.setAttribute('style', 'display: none')
            let main_page = document.getElementById('main_page')
            main_page.setAttribute('style', 'display: block')
        }, 3000)
    })