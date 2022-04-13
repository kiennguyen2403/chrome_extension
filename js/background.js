chrome.runtime.onInstalled.addListener(function(){
  chrome.storage.sync.set({action:"generate"},function(){
    console.log("Start the extension");
  });
});

chrome.runtime.onConnect.addListener(function(){
  console.log("Connect")
  chrome.storage.sync.get('qrcode',function(data)
  {
    console.log(data.qrcode);
  }
)

})



/*

chrome.declarativeContent.onPageChanged.removeRules(undefined,function(){
  chrome.declarativeContent.onPageChanged.addRules([{
    condition: [new chrome.declarativeContent.PageStateMatcher({
      pageUrl:{urlPrefix:"https://"}
    })]
  }])
})


*/