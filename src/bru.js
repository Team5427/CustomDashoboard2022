onkeydown = key => {
    if (key.key === 'Escape') {
        alert("eeee");
    }
  };

document.body.requestPointerLock = document.body.requestPointerLock ||
                            document.body.mozRequestPointerLock;

document.exitPointerLock = document.exitPointerLock ||
                           document.mozExitPointerLock;


    function startLock() {
        document.body.requestPointerLock();
    }

    function endLock(event) {
        if (event.key == e) {
            document.exitPointerLock();
        }
        
    }

  function showCoords(event) {
    var x = event.movementX;
    var y = event.movementY;

    var coor = "X coords: " + x + ", Y coords: " + y;
    document.getElementById("demo").innerHTML = coor;
  }
  
  function clearCoor() {
    document.getElementById("demo").innerHTML = "";
  }