let topDiv, contentDiv, hint, hint2, activateButton, headerPart2, keyword, outputHint, output, input, clipboardCopy, mode
let pairing = "" //all symbols, letters, and numbers
function onLoad() {
    topDiv = document.getElementById('top')
    contentDiv = document.getElementById('content')
    hint = document.getElementById('hint')
    hint2 = document.getElementById('hint2')
    activateButton = document.getElementById('activateButton')
    headerPart2 = document.getElementById('headerPart2')
    keyword = document.getElementById('keyword')
    output = document.getElementById('output')
    outputHint = document.getElementById('outputHint')
    input = document.getElementById('input')
    clipboardCopy = document.getElementById('clipboardCopy')
    for (let i = 33; i <= 126; i++) {
        pairing += String.fromCharCode(i)
    }

    changeMenu(0)
}


function changeMenu(num) {
    output.innerText = ""
    outputHint.innerText = ""
    input.value = ""
    clipboardCopy.style.display = "none"
    mode = num;
    if (num > 0) {
        //Not main menu
        topDiv.style.display = "none"
        contentDiv.style.display = "block"
        if (num === 1) {
            //Encode
            hint.innerText = "Secret Text → Y/?LGAZ*D]}"
            headerPart2.innerText = "The Secret Message"
            input.placeholder = "Enter text to encode..."
            hint2.innerText = "This should be the message you want to encode, like 'The secret base is at (-573, 338)'"
            activateButton.innerText = "Encode Message"

            activateButton.onclick = encodeInput
        } else {
            //Decode
            hint.innerText = "Y/?LGAZ*D]} → Secret Text"
            headerPart2.innerText = "The Encrypted Message"
            input.placeholder = "Enter text to decode..."
            hint2.innerText = "This should be the garbled message, like 'Y/?LGAZ*D]}'"
            activateButton.innerText = "Decode Message"

            activateButton.onclick = decodeInput
        }
    } else {
        //Main menu
        topDiv.style.display = "block"
        contentDiv.style.display = "none"
    }
}

function createKeyTable(randomNum) {
    let available = []
    for (let i = 0; i < pairing.length; i++) {
        available.push(pairing.charAt(i))
    }
    let toEncode = []
    let toDecode = []
    let randomGen = new Math.seedrandom(randomNum)
    for (let i = 0; i < pairing.length; i++) {
        let toPairWith = pairing[i]
        let chosenIndex = Math.floor(randomGen() * available.length)
        let chosen = available[chosenIndex]
        available.splice(chosenIndex, 1)

        toEncode[toPairWith] = chosen
        toDecode[chosen] = toPairWith
    }

    return {
        toEncode: toEncode,
        toDecode: toDecode,
    }
}

function getXRandoms(key, num) {
    let newRandomGen = new Math.seedrandom(key.toLowerCase())
    let values = []
    let available = []
    for (let i = 0; i < num; i++) {
        values[i] = {
            pos: newRandomGen(),
            keyTable: Math.floor(newRandomGen() * 1000) / 1000,
            case: newRandomGen(),
        }
        available[i] = i
    }

    return {
        values: values,
        available: available,
    }
}

function clearFields() {
    clipboardCopy.style.display = "inline"
}

function encodeInput() {
    if (keyword.value.length === 0) {
        alert("Enter a keyword!")
        return
    }
    if (input.value.length === 0) {
        alert("Enter text to encode!")
        return
    }

    let toEncode = input.value.replaceAll(" ","_")

    let randomNums = getXRandoms(keyword.value, toEncode.length)
    let values = randomNums.values
    let available = randomNums.available

    let resultant = ""
    while (available.length > 0) {
        let value = values[resultant.length]
        let chosenIndex = Math.floor(value.pos * available.length)
        let chosen = available.splice(chosenIndex, 1)[0]

        let newAdd = toEncode.substring(chosen, chosen + 1)

        let encodeTable = createKeyTable(value.keyTable).toEncode
        if (encodeTable[newAdd]) {
            newAdd = encodeTable[newAdd]
        }

        if (value.case > 0.3333) {
            if (newAdd.toUpperCase() !== newAdd) {
                newAdd = newAdd.toUpperCase()
            } else if (newAdd.toLowerCase() !== newAdd) {
                newAdd = newAdd.toLowerCase()
            }
        }

        resultant += newAdd
    }

    outputHint.innerText = "Encoded Message:"
    output.innerText = resultant
    clearFields()
}

function decodeInput() {
    if (keyword.value.length === 0) {
        alert("Enter a keyword!")
        return
    }
    if (input.value.length === 0) {
        alert("Enter text to decode!")
        return
    }

    let toDecode =  input.value
    let randomNums = getXRandoms(keyword.value, toDecode.length)
    let values = randomNums.values
    let available = randomNums.available

    let resultant = []
    for (let i = 0; i < toDecode.length; i++) {
        let value = values[i]
        let chosenIndex = Math.floor(value.pos * available.length)
        let chosen = available.splice(chosenIndex, 1)[0]

        let newAdd = toDecode.substring(i, i + 1)
        if (value.case > 0.3333) {
            if (newAdd.toLowerCase() !== newAdd) {
                newAdd = newAdd.toLowerCase()
            } else if (newAdd.toUpperCase() !== newAdd) {
                newAdd = newAdd.toUpperCase()
            }
        }

        let decodeTable = createKeyTable(value.keyTable).toDecode
        if (decodeTable[newAdd]) {
            newAdd = decodeTable[newAdd]
        }

        if (newAdd === "_") {
            newAdd = " "
        }

        resultant[chosen] = newAdd
    }

    resultant = resultant.join("")
    outputHint.innerText = "Decoded Message:"
    output.innerText = resultant
    clearFields()
}

let clipboardCounter = 0;
function copyToClipboard() {
    window.getSelection().removeAllRanges();
    let textArea = document.createElement("textarea")
    textArea.innerText = output.innerText
    document.body.appendChild(textArea)

    textArea.select()
    textArea.setSelectionRange(0, 99999); /* For mobile devices */
    document.execCommand("copy");

    document.body.removeChild(textArea)

    clipboardCopy.innerText = "Copied!"
    clipboardCounter++;
    let saved = clipboardCounter;
    setTimeout(function() {
        if (clipboardCounter === saved) {
            clipboardCopy.innerText = "Copy to Clipboard"
        }
    }, 3000)
}