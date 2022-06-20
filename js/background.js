function ScanQR(image){
    QrScanner.scanImage(image)
    .then(result => {
        alert(result)
    }).catch(err => {
        console.log(err);
    });
}

chrome.runtime.onInstalled.addListener(function() {
	chrome.storage.sync.set({action: "generate"}, function() {
		console.log("Started the extension.");
	});
});

chrome.runtime.onConnect.addListener(function() {
	console.log("Connected.");
	chrome.storage.sync.get('generate', function(data) {
		console.log(data.qrcode);
	});
});


chrome.runtime.onMessage.addListener(function (response,sender,sendResponse) 
{

    if(response.action=="sendimages")
    {
        const image = document.getElementsByTagName(response.image)[0]
        console.log(image)
        const url = ScanQR(image);
        sendResponse({url:url});
    }
}) 
