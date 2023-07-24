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

document.addEventListener("DOMContentLoaded", async() => {
    const activeTab = await getActiveTabURL();
    var container = document.getElementsByName("container")[0];
    if (activeTab.url.includes("twitter.com")) {
        OnChangeLogo();
        container.innerHTML = '';

        var button = document.createElement('button');
        button.onclick = OnChangeLogo;
        button.classList.add("button-17")
        button.innerHTML = "수동 되돌리기";
        container.appendChild(button);
    } else {
        containter.innerHTML = '트위터에서만 사용 가능합니다.'
    }
});