var scanqr = document.getElementById("scanqr");
var generatecode = document.getElementById("generate_code");
var mode = "";

function GenerateQR(url) {
    var canvas = document.getElementsByTagName('canvas')[0];
    QRCode.toCanvas(canvas, url, function(error) {
        if (error) {
           console.error(error);
        };
    });
};

chrome.storage.sync.get('action', function(data) {
    mode = data.action;
});

/*BUG: when extension is loaded for the first time, first tab on tab bar (oftentimes chrome://extensions) is binded as target of screenshot*/
scanqr.addEventListener("click", function() {
    chrome.tabs.query({"active": true, "currentWindow": true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {command: "scan"}, function(response) {
            console.log(response.result); 
        });
    });
});

/*BUG: when extension is loaded for the first time, first tab on tab bar (oftentimes chrome://extensions) is binded as target of screenshot*/
generatecode.addEventListener("click", function() {
    chrome.tabs.query({"active": true, "currentWindow": true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {command: "generate"}, function(response) {   
            console.log(response.result);
            var url = response.url;
            GenerateQR(url);
            chrome.storage.sync.set({'qrcode': url}, function() {
                console.log("Successfully stored the link.");
            });
        });
    });
});