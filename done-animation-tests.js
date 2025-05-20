<div>
<svg width="1280" height="1659" viewBox="0 0 1280 1659" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- 15 shapes wrapped in <g> to enable local-center rotation -->
  <g class="gravity" transform="translate(640,1550)"><circle cx="0" cy="0" r="320" fill="#FF4900"/></g>
  <g class="gravity" transform="translate(600,1500)"><circle cx="0" cy="0" r="350" fill="#FFFFFF"/></g>
  <g class="gravity" transform="translate(670,1500)"><circle cx="0" cy="0" r="300" fill="#E42100"/></g>
  <g class="gravity" transform="translate(675,1500)"><rect x="-275" y="-50" rx="100" ry="100" width="550" height="100" fill="#FF4900"/></g>
  <g class="gravity" transform="translate(760,1480)"><rect x="-300" y="-60" rx="100" ry="100" width="600" height="120" fill="#FFFFFF"/></g>
  <g class="gravity" transform="translate(780,1455)"><rect x="-260" y="-55" rx="100" ry="100" width="520" height="110" fill="#E42100"/></g>
  <g class="gravity" transform="translate(690,1520)"><circle cx="0" cy="0" r="310" fill="#FFFFFF"/></g>
  <g class="gravity" transform="translate(610,1540)"><circle cx="0" cy="0" r="360" fill="#FF4900"/></g>
  <g class="gravity" transform="translate(770,1430)"><rect x="-290" y="-50" rx="100" ry="100" width="580" height="100" fill="#E42100"/></g>
  <g class="gravity" transform="translate(630,1430)"><circle cx="0" cy="0" r="340" fill="#FFFFFF"/></g>
  <g class="gravity" transform="translate(780,1395)"><rect x="-280" y="-45" rx="100" ry="100" width="560" height="90" fill="#FF4900"/></g>
  <g class="gravity" transform="translate(670,1480)"><circle cx="0" cy="0" r="330" fill="#E42100"/></g>
  <g class="gravity" transform="translate(610,1490)"><circle cx="0" cy="0" r="300" fill="#FFFFFF"/></g>
  <g class="gravity" transform="translate(820,1380)"><rect x="-300" y="-50" rx="100" ry="100" width="600" height="100" fill="#E42100"/></g>
  <g class="gravity" transform="translate(640,1500)"><circle cx="0" cy="0" r="340" fill="#FF4900"/></g>
</svg>


  </div>


<button>hover me</button>


* {
  margin: 0;
  padding: 0;
}

body {
  height: 100vh;
  width: 100vw;
}
.gravity {
    transform-box: fill-box;
  transform-origin: center;
}

div{
  width: 300px;
    height: 100px;
  background-color: #2bb818;
}
svg {
  height: 100%;
  width: 100%
}

button {
  position: fixed;
  top: 0;
  right: 0;
  
  
}


const elements = document.querySelectorAll(".gravity");

// Place elements above the screen
gsap.set(elements, {
  y: "random(-1000, -2000)",
  rotation: "random(-180, 180)" // optional initial rotation
});

// On click, animate with physics and rotation
document.querySelector('button').addEventListener('click', function() {
  gsap.set(elements, {
    y: 0,
  });

  gsap.to(elements, {
    y: 50,
    yProp: "top",
    top: 0,
    duration: 6,
    rotation: "random(-720, 2000)", // ⬅️ Add this line
    physics2D: {
      gravity: 500,
      velocity: "random(800, 1200)",
      angle: "random(200, 340)"
    }
  });
});
