async function getActiveTabURL() {
    const tabs = await chrome.tabs.query({
        currentWindow: true,
        active: true
    });

    return tabs[0];
}
const OnResult = (result) => {};


async function OnChangeLogo() {
    const activeTab = await getActiveTabURL();
    var message = {
        type: "changeLogo"
    }

    chrome.tabs.sendMessage(activeTab.id, message, OnResult);
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === "complete" && tab.url.indexOf("twitter.com") != -1) {
        console.log("Send");
        OnChangeLogo();
    }
})