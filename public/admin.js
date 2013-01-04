$(document).ready(function () {
  var socket = io.connect("http://"+window.location.hostname);

  socket.on('message', function(msg){
        
      console.log(msg);
    
  });

});