const baseUrl = "https://thattimothy.com"
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
]

function onPageLoad() {
    let baseContainer = document.getElementById('projectsContainer')
    for (let i = 0; i < data.length; i++) {
        let line = document.createElement('p')
        line.className = "projectSeparator"
        baseContainer.append(line)

        const project = data[i]
        
        let div = document.createElement('div')
        div.className = "projectContainer"

        let icon = document.createElement('img')
        icon.className = "projectIcon"
        icon.src = project.Icon
        let n = 5;
        if (project.IconScale) {
            n *= project.IconScale
        }
        icon.style.height = n + "vw"

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

        div.append(icon, desc, openButton)
        baseContainer.appendChild(div)
    }
}