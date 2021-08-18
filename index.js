const express = require('express');
const app = express();
const fs = require('fs');
const server = require('https').createServer(
	{
		key: fs.readFileSync('/etc/letsencrypt/live/www.chop.click/privkey.pem'),
    	cert: fs.readFileSync('/etc/letsencrypt/live/www.chop.click/cert.pem')
	},
app);
const io = require('socket.io')(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

    //Connected/Disconnect
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    
    //Message
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        console.log('message: ' + msg);
      });

});


const port = 3001;
server.listen(port, function(){  
  console.log(`https://www.chop.click:${port}/`); 
});