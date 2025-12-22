const versionElement = document.getElementById("versionNumber");
if (versionElement) {
    versionElement.innerText = chrome.runtime.getManifest().version;
}
