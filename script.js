document.addEventListener("DOMContentLoaded", function() {
    const spiderpig = document.getElementById("spiderpig");
    const spiderpig_gif = 'assets/img/spidercochon.gif';
    const spiderpig_png = 'assets/img/spidercochon.png';
    spiderpig.style.backgroundImage = "url(" + spiderpig_png + ")";
    
    const spiderpig_audio = document.getElementById("spiderpig_audio");
    const spiderpig_move_src = 'assets/mp3/spidercochon_move.mp3';
    const spiderpig_stop_src = 'assets/mp3/spidercochon_stop.mp3';
    spiderpig_audio.volume = 0.4;
    
    let spiderpig_isMoving = false;
    
    spiderpig.addEventListener("click", () => {
      if (!spiderpig_isMoving) {
        spiderpig.style.animation = "pigMove 5s linear infinite alternate";
        spiderpig.style.backgroundImage = "url(" + spiderpig_gif + ")";
        spiderpig_audio.src = spiderpig_move_src;
        spiderpig_audio.loop = true;
        spiderpig_audio.play();
      } else {
        spiderpig.style.animation = "none"; // Arrête l'animation
        spiderpig.style.backgroundImage = "url(" + spiderpig_png + ")";
        spiderpig.style.transform = "scaleX(-1)";
        spiderpig_audio.src = spiderpig_stop_src;
        spiderpig_audio.loop = false;
        spiderpig_audio.play();
      }
      spiderpig_isMoving = !spiderpig_isMoving;
    });
    
    // Détection du changement de direction (alterner)
    spiderpig.addEventListener("animationiteration", () => {
      if (spiderpig.style.transform == "scaleX(1)") {
        spiderpig.style.transform = "scaleX(-1)";
      } else {
        spiderpig.style.transform = "scaleX(1)";
      }
    });
});
  