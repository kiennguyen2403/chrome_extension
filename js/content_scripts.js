



function ScanQR(image) {
    console.log("ScanQR");
    QrScanner.scanImage(image)
        .then(result => {
            console.log(result)
        }).catch(err => {
            console.log(err);
        });
}


function TakeWholeScreen() {
    try {
       
        const screenshotTarget = document.documentElement;
        html2canvas(screenshotTarget)
            .then((canvas) => {
                document.getElementsByTagName('body')[0].appendChild(canvas);
        });
        Cropimage();

    }

    catch(e) {
        console.log(e);
    }   
}


function Cropimage() {


    
    window.addEventListener("click", e => {
        var image = document.getElementsByTagName("canvas")[0];
        const cropper = new Cropper(image, {
            aspectRatio: 1/1,
          
        });
            var returnimage = cropper.getCroppedCanvas({ maxWidth: 4096, maxHeight: 4096 });
            console.log(returnimage);
            ScanQR(returnimage);
      
    })
}

chrome.runtime.onMessage.addListener(
function(request, sender,sendResponse)
{   


    if (request.command === "scan")
    {   
       
        TakeWholeScreen();
        sendResponse({result:"success"})
      
    }
    else{
      
        sendResponse({result:"success",url:window.location.href})
    }
  
});




window.addEventListener("load",()=>{
    chrome.storage.sync.get('action', function(data) {
    if (data.action =="scan")
    {
        TakeWholeScreen()
     
    }
    else
    {
        sendResponse({result:"success",url:window.location.href})
    }
});
})