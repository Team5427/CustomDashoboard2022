let driveInput = {
  xAxis: document.getElementById('x-axis'),
  yAxis: document.getElementById('y-axis'),
  zAxis: document.getElementById('z-axis')
};

let forward = false;
let back = false;
let left = false;
let right = false;
let sprint = false;
var x = 0;
var y = 0;
var z = 0;

onkeydown = key => {
  if (key.key == 'r') {
    sprint = true;
  }

  if (key.key == 'a') {
    left = true;
  }
  if (key.key == 'd') {
    right = true;
  }
  if (key.key == 'w') {
    forward = true;
  }
  if (key.key == 's') {
    back = true;
  }

  if (key.key === 'Escape') {
    endLock();
  }

  updateJoy();

  // if (key.key === 'Escape' && loginShown) {
  //   document.body.classList.toggle('login', false);
  //   loginShown = false;
  // } 
};

onkeyup = key => {
  if (key.key == 'r') {
    sprint = false;
  }

  if (key.key == 'a') {
    left = false;
  }
  if (key.key == 'd') {
    right = false;
  }
  if (key.key == 'w') {
    forward = false;
  }
  if (key.key == 's') {
    back = false;
  }

  updateJoy();

};

onmousemove = event => {
  if (Math.abs(event.movementX) > 30){
    z = Math.sign(event.movementX);
  }
  else{
    z = event.movementX / 30;
  }

  updateJoy();
};

function updateJoy() {
  x = 0;
  y = 0;
  var speed = .5;

  if (sprint) {
    speed = .7;
  }

  if (forward && !back) {
    y = speed;
  }
  if (!forward && back) {
    y = -speed;
  }
  if (left && !right) {
    x = -speed;
  }
  if (!left && right) {
    x = speed;
  }

  driveInput.xAxis.textContent = 'X-Axis : ' + x;
  driveInput.yAxis.textContent = 'Y-Axis : ' + y;
  driveInput.zAxis.textContent = 'Z-Axis : ' + z.toFixed(2);

  NetworkTables.putValue('/SmartDashboard/drive/x', x);
  NetworkTables.putValue('/SmartDashboard/drive/y', y);
  NetworkTables.putValue('/SmartDashboard/drive/z', z);

}

document.body.requestPointerLock = document.body.requestPointerLock ||
  document.body.mozRequestPointerLock;

document.exitPointerLock = document.exitPointerLock ||
  document.mozExitPointerLock;


function startLock() {
  document.body.requestPointerLock();
}

function endLock(event) {
    document.exitPointerLock();

}


