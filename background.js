var timer;

chrome.runtime.onMessage.addListener(function (message, callback) {
    console.log("received message")
    if (message.type === "start") {

        timer = setInterval(function () {
                sendCurrentUrl(message.username)
            },
            1000
        )
    }

    if (message.type === "stop") {
        clearTimeout(timer);
    }
});


function sendRecord(username, pageUrl) {
    fetch("https://tsdb.informatik.uni-rostock.de:8086/write?db=loggerTestDB", {
        method: "POST",
        headers: {},
        body: "activity_tracking,user=" + username + " file=\"" + pageUrl + "\",app=\"Google Chrome Ext\""
    }).then(function (response) {

        console.log(response);
        return response.json();
    })
        .then(function (myJson) {
            console.log(JSON.stringify(myJson));
        });
}

function sendCurrentUrl(username) {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        if (tabs.length > 0) {
            var url = tabs[0].url;
            sendRecord(username, url);
        }

    });
}