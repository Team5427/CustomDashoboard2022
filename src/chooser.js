var chooserBtn = document.getElementById('chooser-button');
var chooser = document.getElementById('chooser');
var choiceOne = document.getElementById('choice-one');

console.log('chooser');

chooserBtn.onclick = function(ev) {
    console.log('chooser2');
    document.body.classList.toggle('chooser', true);

    // choiceOne.disabled = false;
    // Add the default address and select xxxx
};

NetworkTables.addKeyListener('/SmartDashboard/SendableChooser[0]/options', (key, value) => {
    // Clear previous list
    while (chooser.firstChild) {
        chooser.removeChild(chooser.firstChild);
    }
    // Make an option for each autonomous mode and put it in the selector
    for (let i = 0; i < value.length; i++) {
        var option = document.createElement('button');
        option.classList = 'btn btn-primary btn-lg mx-1';
        option.id = 'choice' + i;
        option.innerText = value[i];
        option.onclick = function() {
            NetworkTables.putValue('/SmartDashboard/SendableChooser[0]/selected', value[i]);
            document.body.classList.toggle('chooser', false);
        };
        chooser.appendChild(option);
    }
    // Set value to the already-selected mode. If there is none, nothing will happen.
    chooserBtn.innerText = NetworkTables.getValue('/SmartDashboard/SendableChooser[0]/selected');
});

// Load previously selected mode
NetworkTables.addKeyListener('/SmartDashboard/SendableChooser[0]/selected', (key, value) => {
    chooserBtn.innerText = value;
});
