const ButtonMinus = document.getElementById("button-minus")
const ButtonPlus = document.getElementById("button-plus")
const InputData = document.getElementsByClassName("input-data")[0]
const InputItem = document.getElementById("input-item")
const InputOptions = document.getElementById("input-options")
const INPUT_1 = document.getElementById("input-1")
const INPUT_2 = document.getElementById("input-2")
const InputOriginals = Array.from(document.getElementsByClassName("input-original"))
const InputReplacers = Array.from(document.getElementsByClassName("input-replacer"))
const CopyButton = document.getElementById("button-copy")
const backwardButton = document.getElementById("backward-arrow")
const fowardArrow = document.getElementById("foward-arrow")
const deleteButton = document.getElementById("delete-button")
const replaceButton = document.getElementById("replace-button")
const textArea = document.getElementById("area-texto")

//this variable contains the entered texts in the text area
let textHistorial = []
let historialIndex = 0

CopyButton.onclick = async ()=>
{
    textArea.select()
    await navigator.clipboard.writeText(textArea.value)
    await navigator.clipboard.readText()
}


deleteButton.onclick = ()=>
{
    textHistorial.push(textArea.value)
    historialIndex = textHistorial.length - 1
    textArea.value = ""
}


replaceButton.onclick = ()=>
{
    let textOriginals = InputOriginals.map((element) => element.value)
    let textReplacers = InputReplacers.map((element) => element.value)
    let textoOriginal = textArea.value
    let newText = textArea.value

    for(let i=0;i<textOriginals.length;i++)
    {
        newText = newText.replaceAll(textOriginals[i],textReplacers[i])
    }

    textArea.value = newText

    //esto evita que se repitan mismos elementos en el historial
    if( textHistorial.indexOf(textoOriginal)===-1 || textHistorial.indexOf(textoOriginal)!==textHistorial.length -1)
    {
        textHistorial.push(textoOriginal)
    }
    if(textoOriginal!==newText)
    {
        textHistorial.push(newText)
    }

    historialIndex = textHistorial.length - 1
}


backwardButton.onclick = ()=>
{
    console.log(historialIndex)
    if(historialIndex!==0)
    {
        historialIndex-=1
        textArea.value = textHistorial[historialIndex]
    }
}


function addAtributes(element,originalElement)
{
    const ATTRIBUTES = originalElement.attributes

    for(let i=0;i<ATTRIBUTES.length;i++)
    {
        element.setAttribute(ATTRIBUTES[i].name,ATTRIBUTES[i].value)
    }
}

function deleteElement(event)
{
    let referenceOfInputItem = event.target.parentElement.parentElement
    //remove the input item from input data
    referenceOfInputItem.remove()
}

function createElement(elementName,originalElement)
{
    let newElement = document.createElement(elementName)
    let elementId = originalElement.id
    addAtributes(newElement,originalElement)

    if(elementId=="button-minus" || elementId=="button-plus")
    {
        if(elementId=="button-minus")
        {
            newElement.addEventListener("click",deleteElement)
            newElement.classList.remove("hidden")
        }else
        {
            newElement.addEventListener("click",addInputItem)
        }
    }

    return newElement
}

function addInputItem(event)
{
    let referenceOfElement = event.target.parentElement //this is the div that the "+" was cliked to create the new element
    let newInputItem = createElement("div",InputItem)
    let newInputOption = createElement("div",InputOptions)
    let newButtonMinus = createElement("img",ButtonMinus)
    let newInput_1 = createElement("input",INPUT_1)
    let newInput_2 = createElement("input",INPUT_2)
    let newButtonPlus = createElement("img",ButtonPlus)
    let newHr = document.createElement("hr")

    //append to the div input-options
    newInputOption.appendChild(newButtonMinus)
    newInputOption.appendChild(newInput_1)
    newInputOption.appendChild(newInput_2)

    //append to the div input-item
    newInputItem.appendChild(newInputOption)
    newInputItem.appendChild(newButtonPlus)
    newInputItem.appendChild(newHr)

    //append the new created div input a item to the article input-data
    InputData.insertBefore(newInputItem,referenceOfElement.nextSibling)

    //add the inputs to their respective arrays
    InputOriginals.push(newInput_1)
    InputReplacers.push(newInput_2)
}

ButtonPlus.addEventListener("click",addInputItem)