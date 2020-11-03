let loaded = 0;
let toLoad = 3;

let headerData;
let footerData;


function allLoaded() {
    let header = document.getElementById("load_essentials_header");
    header.innerHTML = headerData;
    let footer = document.getElementById("load_essentials_footer");
    footer.innerHTML = footerData;

    footer.style = "padding: 0px; margin: 0px;"

    let embedFooter = footer.children[0];

    function updateFooter() {
        let contentS = document.body.getClientRects()[0].height;
        if (contentS <= window.innerHeight) {
            embedFooter.style.bottom = "0px";
        } else {
            embedFooter.style.top = "";
            embedFooter.style.bottom = "";
        }
    }

    updateFooter();
    setInterval(updateFooter, 1000)
}

fetch('../header.html').then(function(response) {
    response.text().then(function(text) {
        headerData = text;

        loaded++;
        if (loaded == toLoad) {
            allLoaded();
        }
    });
});

fetch('../footer.html').then(function(response) {
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