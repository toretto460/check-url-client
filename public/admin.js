function update( schema, msg ) {
  console.log(msg);
  msg = JSON.parse(msg);
  var el = "#" + msg.id;

  label_class = mapCodeToLabel(msg.code);
  //$("#list").append('<li id="' + msg.id + '"></li>');
  var structure = '<li id="' + msg.id + '"><span class="url-name">' + msg.url + '</span>';
  structure+= '<span class="label label-info">' + msg.response_time + 'ms</span>';
  structure+= '<span class="label label-' + label_class + '">'+ msg.code +'</span></li>';


  if( $(el).length ){
    //Updating
    $(el).fadeOut(1000, function(){
      $(this).html(structure);
      $(this).fadeIn(300);
    });
  } else {
    $('#list').append(structure);
    //init element
  }
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