


function GenerateQR()
{

    var canvas = document.getElementsByTagName('canvas')[0];
   QRCode.toCanvas(canvas,window.location.href,function(error){
       if (error){
           console.error(error);
       }
       console.log("success!");
   })
};





function ScanQR(image) {
    QrScanner.scanImage(image)
        .then(result => {
            alert(result);
        }).catch(err => {
            console.log(err);
        });
}


function TakeWholeScreen() {
    console.log("takeWholeScreen");
    try {
        const screenshotTarget = document.documentElement;
        html2canvas(screenshotTarget)
            .then((canvas) => {
                document.getElementById('result').appendChild(canvas);
        });
        Cropimage();
    }

    catch(e) {
        console.log(e);
    }   
}


function Cropimage() {
    window.addEventListener("click", e => {
        image = document.getElementsByTagName("canvas")[0];
        const cropper = new Cropper(image, {
            aspectRatio: 16 / 9,
            crop(event) {
              console.log(event.detail.x);
              console.log(event.detail.y);
              console.log(event.detail.width);
              console.log(event.detail.height);
              console.log(event.detail.rotate);
              console.log(event.detail.scaleX);
              console.log(event.detail.scaleY);
            },
        });
        button2 = document.getElementById("getdata");
        button2.addEventListener("click", () => {
            const returnimage = cropper.getCroppedCanvas({ maxWidth: 4096, maxHeight: 4096 });
    
            ScanQR("./pictures/Capture.PNG");
        });
    })
}


function init() {
    button = document.getElementById("trigger");
    button.onclick = TakeWholeScreen;

    generate_code = document.getElementById("generate_code");
    generate_code.addEventListener("click", GenerateQR);
}


window.onload=init;