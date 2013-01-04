function update( msg ) {
  msg = JSON.parse(msg);
  var el = "#" + msg.id;
  if( $(el).length ){
    $(el).val(msg.url + ": " + msg.code);
  } else {
    $("#list").append('<li id="' + msg.id + '">' + msg.url + ': ' + msg.code + '</li>')
  }
}

$(document).ready(function () {
  var socket = io.connect("http://"+window.location.hostname);

  socket.on('message', function(msg){
        
      update(msg);
    
  });

});