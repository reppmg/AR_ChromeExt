var timer;
var username = "";


document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('start');
    // onClick's logic below:
    link.addEventListener('click', start);
});
document.addEventListener('DOMContentLoaded', function() {
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
        alert("Enter username!");
        return
    }
    changeButtonState(true);
    timer = setInterval(sendCurrentUrl, 1000)
}

function stop() {
    clearTimeout(timer);
    changeButtonState(false);
}

function sendRecord(pageUrl) {
    fetch("https://tsdb.informatik.uni-rostock.de:8086/write?db=loggerTestDB", {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "activity_tracking,user=max file=\""+ pageUrl +"\",app=\"Google Chrome Ext\""
    }).then(function (response) {
        console.log(response);
        return response.json();
    })
        .then(function (myJson) {
            console.log(JSON.stringify(myJson));
        });
}

function sendCurrentUrl() {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        var url = tabs[0].url;
        sendRecord(url)
    });
}