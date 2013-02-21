function update( schema, msg ) {
  msg = JSON.parse(msg);
  var el = "#" + msg.id;
  if( $(el).length ){
    $(el).remove(); 
  }

  label_class = mapCodeToLabel(msg.code);
  $("#list").append('<li id="' + msg.id + '"><span class="url-name">' + msg.url + ' -- (' + msg.response_time + 'ms)</span><span class="label label-' + label_class + '">'+ msg.code +'</span></li>');
}

function mapCodeToLabel(code) {
      if ( code == 200 ) {
      label_class = 'success';
    } else if (code == 500 ) {
      label_class = 'error';
    } else {
      label_class = 'warning';
    }
    return label_class;
}

$(document).ready(function () {
  var socket = io.connect("http://" + window.location.hostname);
  var schema;
  socket.on('presentation', function(msg){
    schema = msg;
  });

  socket.on('message', function(msg){
        
      update(schema, msg);
    
  });

});