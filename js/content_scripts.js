
function ScanQR(image){
    QrScanner.scanImage(image)
    .then(result => {
        alert(result)
    }).catch(err => {
        console.log(err);
    });
}

function TakeWholeScreen() {
    try {
        const screenshotTarget = document.documentElement;
        html2canvas(screenshotTarget)
            .then((canvas) => {
           const createCanvas = document.getElementsByTagName('body')[0].appendChild(canvas);
           return createCanvas;
        }).then((result)=>{
          GenerateURL(result);
        })
            
    } catch(e) {
        console.log(e);
    }   
};

const GenerateURL=(image)=>{       
        image.addEventListener("ready",()=>{
        if (document.getElementsByClassName("getimagebutton").length==0)
        {
            const getimagebutton = document.createElement("BUTTON");
            getimagebutton.className="getimagebutton";  
            getimagebutton.innerHTML="Get QR code";
            cropper.cropBox.appendChild(getimagebutton);
            const button = document.getElementsByClassName("getimagebutton")[0]
            button.addEventListener("click",function() 
            {
                
                const returnimage = cropper.getCroppedCanvas({ maxWidth: 4096, maxHeight: 4096 });
                returnimage.className="returnimage";
                document.getElementsByTagName("body")[0].appendChild(returnimage);
                console.log(returnimage)
                const script = document.createElement("script");
                script.src = "chrome-extension://lihomiegnlkdmgenefaogcgkhdopccde/js/node_modules/qr-scanner/qr-scanner-worker.min.js";
                (document.body || document.head || document.documentElement).appendChild(script);
                ScanQR(returnimage);
                chrome.runtime.sendMessage({action:"sendimages",image:returnimage.className});
                returnimage.addEventListener("ready",()=>{
                    console.log(returnimage)
                })
            })
        }
    
        });
        const cropper = new Cropper(image, {
            aspectRatio: 1/1,
            zoomable:false
        })
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.command === "scan") {   
        TakeWholeScreen();
        sendResponse({result: "success"});
    }
    else{
        sendResponse({result: "success", url: window.location.href});
    }
});

/*BUG: sendResponse is not defined (outside of scope of onMessage)*/
window.addEventListener("load", () => {
    chrome.storage.sync.get('action', function(data) {
        if (data.action == "scan") {
            TakeWholeScreen();
        } else {
            sendResponse({result: "success", url: window.location.href})
        }
    })
});
