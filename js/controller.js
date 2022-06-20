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


function ScanQR(image){
    var url;
    QrScanner.scanImage(image)
    .then(result => {
        console.log(result);
        url = result
    }).catch(err => {
        console.log(err);
    });
    
    return url;
}

chrome.storage.sync.get('action', function(data) {
    mode = data.action;
});

/*BUG: when extension is loaded for the first time, first tab on tab bar (oftentimes chrome://extensions) is binded as target of screenshot*/
scanqr.addEventListener("click", function() {
    chrome.tabs.query({"active": true, "currentWindow": true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {command: "scan"}, function(response) 
        {
            console.log(response.result); 
            ScanQR(response.result);
        });
    });
});

/*BUG: when extension is loaded for the first time, first tab on tab bar (oftentimes chrome://extensions) is binded as target of screenshot*/
generatecode.addEventListener("click", function() {
    chrome.tabs.query({"active": true, "currentWindow": true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {command: "generate"}, function(response) {   
            var url = response.url;
            GenerateQR(url);
            chrome.storage.sync.set({'qrcode': url}, function() {
                console.log("Successfully stored the link.");
            });
        });
    });
});



chrome.runtime.onMessage.addListener(function (response,sender,sendResponse) 
{
    console.log(response.action);
    console.log(response.image);
    if(response.action=="sendimages")
    {
        const image = document.getElementsByTagName(response.image)[0]
        console.log(image)
        const url = ScanQR(image);
        console.log(url)
        sendResponse({url:url});
    }
}) 