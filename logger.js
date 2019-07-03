var username = "";

window.onload = function (ev) {

    chrome.storage.local.get(function (items) {
        if (items.user) {
            document.getElementById("username").value = items.user;
        }
        if (items.started) {
            changeButtonState(items.started);
        }

    });


};
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

    chrome.storage.local.set({started: true, user: username});

    chrome.runtime.sendMessage({type: "start", username: username}, function (response) {
        console.log("name sent !!!");
    });

    changeButtonState(true);
}

function stop() {
    chrome.runtime.sendMessage({type: "stop"}, function (response) {

    });

    chrome.storage.local.set({started: false});
    chrome.storage.local.remove("user");

    changeButtonState(false);
}

