





function ScanQRcode() {
    try {
       
        const screenshotTarget = document.documentElement;
        html2canvas(screenshotTarget)
            .then((canvas) => {
                document.getElementsByTagName('body')[0].appendChild(canvas);
        }).then(function(){
            Cropimage()
        });
    }
    catch(e) {
        console.log(e);
    }   
}


function  Cropimage() 
{             
        var image = document.getElementsByTagName("canvas")[0];
        const cropper = new Cropper(image, {
            aspectRatio: 1/1,
           
          
        });

            window.addEventListener("keypress",function()
            {
            var returnimage = cropper.getCroppedCanvas({ maxWidth: 4096, maxHeight: 4096 })
            if (returnimage != null)      
            {
            QrScanner.scanImage(returnimage)
            .then(result => {
                alert(result);
            }).catch(err => {
                alert(err);
            });
              console.log("finish scan ")
            }
            
            });

            
      
        
}

chrome.runtime.onMessage.addListener(
function(request, sender,sendResponse)
{   
   

    if (request.command === "scan")
    {   
       
        ScanQRcode();
        sendResponse({result:"success"});


      
      
      
    }
    else{
      
        sendResponse({result:"success",url:window.location.href})
    }
  
});




window.addEventListener("load",()=>{
    chrome.storage.sync.get('action', function(data) {
    if (data.action =="scan")
    {
        ScanQRcode();
     
    }
   
});
})