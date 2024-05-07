
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos < currentScrollPos) {
    document.getElementById("mainNav").style.top = "0";
    document.getElementById("mainNav").classList.add('navbar-shrink');
  } else {
    if (window.scrollY <= 0) { // Si estás en la parte superior de la página
      document.getElementById("mainNav").style.top = "-100px";
      document.getElementById("mainNav").classList.remove('navbar-shrink');
    }
  }
  prevScrollpos = currentScrollPos;
}
