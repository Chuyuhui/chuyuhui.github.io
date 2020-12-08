
/*jquery UI Slider*/
$( function() {
  $(".slider").each(function(index,element) {

  var track = $(this + " > #slider_" + index+1);
  var handle = $(this + " > #custom-handle_"+ index+1);

  track.slider({
    range:false,
    step: 0.1,
    min:-100,
    max:0,
    create: function() {
      handle.css("background-size", "cover");
      handle.css("background-color", "transparent");
      handle.css("border", "0px black solid");
    },
    slide: function( event, ui ) {
      recordScore(Math.abs(ui.value));
      handle.css("background-image", "url('https://imgur.com/94YyvTo.png')");
      track.css("background","#777");
    }});
  track.hover(()=>{
    track.css("background","#777");
    handle.css("background-image", "url('https://imgur.com/94YyvTo.png')");
  },()=>{
    track.css("background","#ccc");
    handle.css("background-image", "url('https://imgur.com/06zVfHc.png')");});
  track.focus(()=>{
    track.css("background","#777");
    handle.css("background-image", "url('https://imgur.com/94YyvTo.png')");
  });
  track.blur(()=>{
    track.css("background","#ccc");
    handle.css("background-image", "url('https://imgur.com/06zVfHc.png')");});
  }
	});
});

