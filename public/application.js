
$(document).ready(function () {
  bindLinksToSocket();
});

function bindLinksToSocket(){
	$(document).ready(function(){
   $(document).click(function(e){
      var data = {"x":e.pageX, "y": e.pageY, "page":window.location.href};
   		$.get('/msg/send',data);
   }); 
  });
}
