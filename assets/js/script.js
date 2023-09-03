const website_project = 'https://laurent62.github.io/spider_cochon/';
const spiderpig_gif = website_project + 'assets/img/spidercochon.gif';
const spiderpig_png = website_project + 'assets/img/spidercochon.png';
const spiderpig_move_src = website_project + 'assets/mp3/spidercochon_move.mp3';
const spiderpig_stop_src = website_project + 'assets/mp3/spidercochon_stop.mp3';

const spiderpig_speed = 200; // Vitesse en pixels par seconde (par exemple, 250 px/s)
let spiderpig_animationID;
let spiderpig_direction = 1; // 1 pour droite, -1 pour gauche
let spiderpig_isMoving = false;

document.addEventListener("DOMContentLoaded", function () {

  const spiderpig = document.getElementById("spiderpig");
  spiderpig.style.backgroundImage = "url(" + spiderpig_png + ")";

  const spiderpig_audio = document.getElementById("spiderpig_audio");
  spiderpig_audio.volume = 0.3;

  spiderpig.addEventListener("click", () => {
    if (!spiderpig_isMoving) {
      moveSpiderpig();
      spiderpig.style.backgroundImage = "url(" + spiderpig_gif + ")";
      spiderpig_audio.src = spiderpig_move_src;
      spiderpig_audio.loop = true;
      spiderpig_audio.play();
    } else {
      cancelAnimationFrame(spiderpig_animationID); // Arrête l'animation
      spiderpig.style.backgroundImage = "url(" + spiderpig_png + ")";
      spiderpig.style.transform = "scaleX(-1)";
      spiderpig_direction = 1;
      spiderpig.style.right = 0;
      spiderpig_audio.src = spiderpig_stop_src;
      spiderpig_audio.loop = false;
      spiderpig_audio.play();
    }
    spiderpig_isMoving = !spiderpig_isMoving;
  });

});


function moveSpiderpig() {
  const startTime = performance.now();
  const duration = (window.innerWidth - spiderpig.offsetWidth) / spiderpig_speed * 1000;

  function step(currentTime) {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const newPosition = (spiderpig_direction === 1) ? progress * (window.innerWidth - spiderpig.offsetWidth) : (1 - progress) * (window.innerWidth - spiderpig.offsetWidth);
    spiderpig.style.right = newPosition + "px";

    if (progress < 1) {
      spiderpig_animationID = requestAnimationFrame(step);
    } else {
      // Inversez la spiderpig_direction lorsque le mouvement est terminé
      if (spiderpig_direction == 1) {
        spiderpig.style.transform = "scaleX(1)";
      } else {
        spiderpig.style.transform = "scaleX(-1)";
      }
      spiderpig_direction = -spiderpig_direction;
      spiderpig_animationID = requestAnimationFrame(moveSpiderpig);
    }
  }

  spiderpig_animationID = requestAnimationFrame(step);
}