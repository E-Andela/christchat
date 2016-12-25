var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    io.emit('chat message', 'a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
        io.emit('chat message', 'user disconnected');
    });
    
    socket.on('chat message', function(data){
        console.log('message: ' + data.content);
        io.emit('chat message', data.userName + ': ' + data.content);
    });
    
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});