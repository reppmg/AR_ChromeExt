
var username = "";


document.addEventListener('DOMContentLoaded', function () {
    var link = document.getElementById('start');
    // onClick's logic below:
    link.addEventListener('click', start);
});
document.addEventListener('DOMContentLoaded', function () {
    var link = document.getElementById('stop');
    // onClick's logic below:
    link.addEventListener('click', stop);
});

function changeButtonState(inProgress) {
    inProgress = inProgress || false;
    document.getElementById("start").disabled = inProgress;
    document.getElementById("stop").disabled = !inProgress;
}

function start() {
    username = document.getElementById("username").value;
    if (username === "") {
        document.getElementById("ar_ext_label").innerHTML = "Please, insert username!";
        return
    }

    chrome.runtime.sendMessage({type: "start", username: username}, function (response) {
        console.log("name sent !!!");
    });

    changeButtonState(true);
}

function stop() {
    chrome.runtime.sendMessage({type: "stop"}, function (response) {

    });

    changeButtonState(false);
}

