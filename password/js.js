let topDiv, outputHint, output, input, clipboardCopy
let pairing = "" //all symbols, letters, and numbers
function onLoad() {
    topDiv = document.getElementById('top')
    outputHint = document.getElementById('outputHint')
    input = document.getElementById('input')
    output = document.getElementById('output')
    clipboardCopy = document.getElementById('clipboardCopy')
    for (let i = 33; i <= 126; i++) {
        pairing += String.fromCharCode(i)
    }
}

function generatePassword() {
    let num = parseInt(input.value)
    if (input.value.length === 0 && num) {
        alert("Enter a number!")
        return
    }

    let result = ""
    for (let i = 0; i < num; i++) {
        result += pairing.charAt(Math.floor(Math.random() * pairing.length))
    }

    outputHint.innerText = "Generated Password:"
    output.innerText = result
    clipboardCopy.style.display = "inline"
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