const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d"); // 2d drawing
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//----------CREATING A PLAYER----------------
class Player {
  constructor({ position, velocity }) {
    this.position = position; //position is going to be {x,y}
    this.velocity = velocity;
    this.rotation = 0;
  }
  //----------DRAWING THE PLAYER----------------
  draw() {
    c.save();
    c.translate(this.position.x, this.position.y);
    c.rotate(this.rotation);
    //-----------RED TARGET IN THE MIDDLE---------------
    c.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2, false);
    c.fillStyle = "red";
    c.fill();
    //-----------SPACESHIP PLAYER---------------
    c.beginPath();
    c.moveTo(this.position.x, this.position.y - 20); // Move to the top point of the spaceship
    c.lineTo(this.position.x + 10, this.position.y + 10); // Draw a line to the bottom-right corner
    c.lineTo(this.position.x + 5, this.position.y + 25); // Draw a line to the bottom-middle
    c.lineTo(this.position.x - 5, this.position.y + 25); // Draw a line to the bottom-middle
    c.lineTo(this.position.x - 10, this.position.y + 10); // Draw a line to the bottom-left corner
    c.closePath(); // Close the path to complete the shape
    c.strokeStyle = "white";
    c.stroke(); //need to call the stroke method to be able to see it
    c.restore();
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
//-------------------------------------------

//----------POSITION AND VELOCITY OF THE PLAYER----------------
// incase there are 2 players: const player2 = new Player({ x: 0, y: 0 });
const player = new Player({
  position: { x: canvas.width / 2, y: canvas.height / 2 },
  velocity: { x: 0, y: 0 },
});
//-------------------------------------------------------------------------

//-------------------DECLARING KEYS------------------------------------
const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

function animate() {
  //what function do we want to call over and over again! calling the function within the function! endless loop until we say stop.
  window.requestAnimationFrame(animate);
  console.log("animate");
  c.fillStyle = "black"; //the color of the rect
  c.fillRect(0, 0, canvas.width, canvas.height); //canvas position,width, height
  //----------CALLING UPDATE METHOD TO DISPLAY PLAYER ON SCREEN----------------
  player.update();
  player.velocity.x = 0; //if keyw is not pressed, stop. 0 to start
  if (keys.w.pressed) player.velocity.x = 1; //the player will move to the right whenever w is pressed
  if (keys.d.pressed) player.rotation += 0.01;
}
animate();

//----------KEYS FOR MOVING THE PLAYER-----------------------------------------------
window.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "KeyW":
      keys.w.pressed = true;
      break;
    case "KeyA":
      keys.a.pressed = true;
      break;
    case "KeyD":
      keys.d.pressed = true;
      break;
    case "KeyS":
      break;
  }
});
window.addEventListener("keyup", (event) => {
  switch (event.code) {
    case "KeyW":
      keys.w.pressed = false;
      break;
    case "KeyA":
      keys.a.pressed = false;
      break;
    case "KeyD":
      keys.d.pressed = false;
      break;
    case "KeyS":
      break;
  }
});
