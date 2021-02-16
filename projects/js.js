const baseUrl = window.location.origin
const data = [
    {
        Title: "Roblox Game Visualizer",
        Description: "View & compare data from various roblox games, updated live with fancy slot animations. Uses Roblox's API to retreive data, click on any number to view its source.",
        Icon: baseUrl + "/roblox-game-visualizer/title.png",
        IconScale: 2.25,
        Redirect: baseUrl + "/roblox-game-visualizer"
    },
    {
        Title: "Encrypter",
        Description: "Convert secret text into an encrypted form using a keyword, and convert the encrypted text back! Uses scrambling & key tables based on the keyword to encrypt and decrypt.",
        Icon: baseUrl + "/encrypter/title.png",
        Redirect: baseUrl + "/encrypter"
    },
    {
        Title: "Password Generator",
        Description: "Generate a completely random password of any length with the click of a button!",
        Icon: baseUrl + "/password/title.png",
        IconScale: 1.5,
        Redirect: baseUrl + "/password"
    },
    {
        Title: "Ping",
        Description: "Check your internet's ping periodically. Shows a real-time graph of ping history.",
        Icon: baseUrl + "/ping/title.png",
        IconScale: 1,
        Redirect: baseUrl + "/ping"
    },
]

const baseValue = 10;
let max = 1;
function onPageLoad() {
    let baseContainer = document.getElementById('projectsContainer')
    for (let i = 0; i < data.length; i++) {
        if (data[i].IconScale && data[i].IconScale > max) {
            max = data[i].IconScale
        }
    }

    for (let i = 0; i < data.length; i++) {
        const project = data[i]
        
        let div = document.createElement('div')
        div.className = "projectContainer"

        let iconContainer = document.createElement('div')
        iconContainer.className = "projectIconContainer"

        let icon = document.createElement('img')
        icon.className = "projectIcon"
        icon.src = project.Icon
        let n = baseValue;
        if (project.IconScale) {
            n *= project.IconScale
        }
        icon.style.height = n + "vh"

        iconContainer.style.height = (max * baseValue) + "vh"

        let desc = document.createElement('p')
        desc.className = "projectDescription"
        desc.innerText = project.Description

        let openButton = document.createElement('div')
        openButton.className = "projectOpenButtonContainer"

        let href = document.createElement('a')
        href.className = "projectOpenButton"
        href.href = project.Redirect
        href.innerText = "Open"

        openButton.append(href)

        iconContainer.append(icon)
        div.append(iconContainer, desc, openButton)
        baseContainer.appendChild(div)
    }
}