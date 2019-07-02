chrome.runtime.onMessage.addListener(function(message, callback) {
    if (message.data == "start") {
        start()
    } else if (message.data == "stop") {
        stop()
    } else if (message.data == "debug") {
        alert("This is my favorite website!");
        console.log("debug")
        chrome.tabs.executeScript(
            {code: 'document.body.style.backgroundColor="orange"'});
    };
});

chrome.runtime.onInstalled.addListener(function() {
    console.log("onInstaller")
    chrome.contextMenus.create({
        "id": "sampleContextMenu",
        "title": "Sample Context Menu",
        "contexts": ["selection"]
    });
});


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