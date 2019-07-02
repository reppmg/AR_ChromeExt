var timer;
var username = "";


document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('start');
    // onClick's logic below:
    link.addEventListener('click', function () {
        chrome.runtime.sendMessage("debug", function(response) {
            console.log(response.farewell);
        });
    });
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
