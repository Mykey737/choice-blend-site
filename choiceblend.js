/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("choiceblendSideNav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("choiceblendSideNav").style.width = "0";
}

function deferVideo() {

  //defer html5 video loading
$("video source").each(function() {
  var sourceFile = $(this).attr("data-src");
  $(this).attr("src", sourceFile);
  var video = this.parentElement;
  video.load();
  // uncomment if video is not autoplay
  //video.play();
});

}
window.onload = deferVideo;

$('.carousel').carousel({
  interval: 4000
})

//Custom Soundcloud Player JS
$(document).ready(function(){
  
  var player = SC.Widget($('iframe.sc-widget')[0]);
  var pOffset = $('.player').offset();
  var pWidth = $('.player').width();
  var scrub;
  
  player.bind(SC.Widget.Events.READY, function() {
    setInfo();
    player.play();
  }); //Set info on load
  
  player.bind(SC.Widget.Events.PLAY_PROGRESS, function(e) {
    if( e.relativePosition < 0.003 ) { setInfo(); }
    //Event listener when track is playing
    $('.position').css('width', ( e.relativePosition*100)+"%");
  });
  
   $('.player').mousemove(function(e){ //Get position of mouse for scrubbing
    scrub = (e.pageX-pOffset.left);
  });
  
  $(document).on('keydown', function(e){
    switch(e.keyCode){
      case 32:
        player.toggle(); 
      break;
      case 39:
        player.next();
      break;
      case 37:
        player.prev();
      break;
    }
  });

  $('.player').click(function(){ //Use the position to seek when clicked
    $('.position').css('width',scrub+"px");
    var seek = player.duration*(scrub/pWidth); 
    
    //Seeking to the start would be a previous?
    if ( seek < player.duration * .05 ) {
      player.prev();
    } else if ( seek > player.duration * .99 ) {
      player.next();
    } else {      
      player.seekTo(seek);
    }
    
  });
  
   function setInfo() {
    player.getCurrentSound(function(song) {
      
        // Soundcloud just borked this api endpoint, hence this hack :/
        var waveformPng =
            song.waveform_url
                .replace('json', 'png')
                .replace('wis', 'w1');
        
        var artworkUrl = song.artwork_url || '';
        
       console.log(song);
      
      $('.waveform').css('background-image', "url('" + waveformPng + "')");    
      $('.player').css('background-image', "url('" + artworkUrl.replace('-large', '-t500x500') + "')");
      
      var info = song.title;
      $('.info').html(info);
      
      player.current = song;
    });
    
    player.getDuration(function(value){
      player.duration = value;
    });

    player.isPaused(function(bool){
      player.getPaused = bool;
    });
  }   
  
});