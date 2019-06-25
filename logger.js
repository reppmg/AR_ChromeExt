var timer;

function start() {
    timer = setTimeout()
}

function stop() {
    clearTimeout(timer)
}

function loigShit() {
    console.log("shome shot")

}

function sendShit() {
    fetch("https://tsdb.informatik.uni-rostock.de:8086/write?db=loggerTestDB", {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "activity_tracking,user=max file=\"test ext\",process=\"some process\",app=\"Google Chrome Ext\""
    }).then(function (response) {
        console.log(response);
        return response.json();
    })
        .then(function (myJson) {
            console.log(JSON.stringify(myJson));
        });
}