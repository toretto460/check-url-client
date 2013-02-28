function update( schema, msg ) {
  console.log(msg);
  msg = JSON.parse(msg);
  var el = "#" + msg.id;

  label_class = mapCodeToLabel(msg.code);

  var url = msg.url.substring(0, 25) + '...';

  var structure = '<li id="' + msg.id + '">';
  structure+= '<a data-powertip="' + msg.url + '" class="tip" target="_blank" href="' + msg.url +'">';
  structure+= '<i class="icon-white icon-arrow-up"></i>';
  structure+= '<span class=" url-name" >' +  url + '</span>';
  structure+= '</a>';
  structure+= '<span class="label label-info pull-right">' + msg.response_time + 'ms</span>';
  structure+= '<span class="badge badge-' + label_class + ' pull-right">'+ msg.code +'</span></li>';


  if( $(el).length ){
    //Updating
    $(el).fadeOut(1000, function(){
      $(this).html(structure);
      $(this).fadeIn(300);
    });
  } else {
    $('#url-list').append(structure);
    $('.tip').powerTip();
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