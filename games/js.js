const baseUrl = "https://thattimothy.com"
const data = [
    {
        Title: "Roblox Uno",
        Description: "Play your favorite tabletop game, Roblox Uno, the #1 Uno game on Roblox! Go against NPCs, Friends, or Foes. Featuring card animations, tons of customization, and professionally made cards, this game is made to be easy to learn & fun to play. Battle & climb the leaderboards to the become best Roblox Uno player of all time. Welcome to Roblox Uno, the best Uno game on Roblox.",
        Icon: "https://t2.rbxcdn.com/2c525678baab740ac7abe01e3d1b3c16",
        Redirect: "https://www.roblox.com/games/1689414409"
    },
    {
        Title: "The Tower Tycoon",
        Description: "Welcome to The Tower Tycoon, a tycoon were you build your own tower. Featuring Rebirths, Build animations, and tons of things to buy, The Tower Tycoon is a fun, up-to-date, modern tycoon. Can you climb the leaderboards to the top? PC and mobile compatible.",
        Icon: "https://t3.rbxcdn.com/ba8858fca46f5d6af9f4a3aa10d2f95f",
        Redirect: "https://www.roblox.com/games/2150928470"
    },
    {
        Title: "ThatTimothy's Admin House",
        Description: "Go through an easy mini-obby to get to the other side and receive access to use ThatTimothy's Admin, a custom admin that has hundreds of fun commands to use. This isn't your basic kohls admin house. It's ThatTimothy's Admin House!",
        Icon: "https://t0.rbxcdn.com/a850d285808636c97914c771148072aa",
        Redirect: "https://www.roblox.com/games/2511084650"
    },
    {
        Title: "Stair Climbing Simulator",
        Description: "The most intense simulator on Roblox. The original stair climbing simulator. The more stairs you climb, the faster you go and the higher you can jump. Once you reach the top, you receive a huge boost and start from the bottom again. With hours of never ending fun, you can become the fastest stair climber in history and make it to the best of the best.",
        Icon: "https://t4.rbxcdn.com/6901989160ddf3c50506e2b2b2c97118",
        Redirect: "https://www.roblox.com/games/1650248100"
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
        icon.style.height = "7vw"

        let textDiv = document.createElement('div')
        textDiv.className = "projectTextContainer"

        let title = document.createElement('p')
        title.className = "projectTitle"
        title.innerText = project.Title

        let desc = document.createElement('p')
        desc.className = "projectDescription"
        desc.innerText = project.Description

        let openButton = document.createElement('div')
        openButton.className = "projectOpenButtonContainer"

        let href = document.createElement('a')
        href.className = "projectOpenButton"
        href.href = project.Redirect
        href.innerText = "Play"

        openButton.append(href)

        textDiv.append(title, desc)
        div.append(icon, textDiv, openButton)
        baseContainer.appendChild(div)
    }
}