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