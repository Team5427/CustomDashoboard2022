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
var x = 0.00;
var y = 0.00;
var z = 0.00;
const kMouseDivisor = 60;

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
  if (Math.abs(event.movementX) > kMouseDivisor) {
    z = Math.sign(event.movementX);
  }
  else {
    z = event.movementX / kMouseDivisor;
  }

  updateJoy();
};

function updateJoy() {
  x = 0;
  y = 0;
  var speed = .50;

  if (sprint) {
    speed = .70;
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

  driveInput.xAxis.textContent = x.toFixed(2);
  driveInput.yAxis.textContent = y.toFixed(2);
  driveInput.zAxis.textContent = z.toFixed(2);

  NetworkTables.putValue('/SmartDashboard/drive/x', x);
  NetworkTables.putValue('/SmartDashboard/drive/y', y);
  NetworkTables.putValue('/SmartDashboard/drive/z', z);

}

// function printButton(value) {
//   var autoSelect = document.getElementById('auto-select');
//   while (autoSelect.firstChild) {
//     autoSelect.removeChild(autoSelect.firstChild);
//   }
//   // Make an option for each autonomous mode and put it in the selector
//   for (let i = 0; i < value.length; i++) {
//     var option = document.createElement('li');
//     option.appendChild(document.createTextNode(value));
//     autoSelect.appendChild(option);
//   }
// }

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


