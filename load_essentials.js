let loaded = 0;
const toLoad = 3;
const baseDomain = "https://thattimothy.com"

let headerData;
let footerData;


function allLoaded() {
    document.body.parentElement.style.width = "100%";
    document.body.parentElement.style.height = "100%";

    document.body.style.position = "relative";
    document.body.style.minWidth = "100%";
    document.body.style.minHeight = "100%";

    let header = document.getElementById("header");
    header.innerHTML = headerData;
    let footer = document.getElementById("footer");
    footer.innerHTML = footerData;

    footer.style = "padding: 0px; margin: 0px;"

    let bodyDiv = document.getElementById("body")
    bodyDiv.style.paddingBottom = "60px";
}

fetch(baseDomain + '/header.html').then(function(response) {
    response.text().then(function(text) {
        headerData = text;

        loaded++;
        if (loaded == toLoad) {
            allLoaded();
        }
    });
});

fetch(baseDomain + '/footer.html').then(function(response) {
    response.text().then(function(text) {
        footerData = text;

        loaded++;
        if (loaded == toLoad) {
            allLoaded();
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    loaded++;
    if (loaded == toLoad) {
        allLoaded();
    }
});