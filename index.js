const ButtonMinus = document.getElementById("button-minus")
const ButtonPlus = document.getElementById("button-plus")
const InputData = document.getElementsByClassName("input-data")[0]
const InputItem = document.getElementById("input-item")
const InputOptions = document.getElementById("input-options")
const INPUT_1 = document.getElementById("input-1")
const INPUT_2 = document.getElementById("input-2")

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

function addInputItem()
{
    let newInputItem = createElement("div",InputItem)
    let newInputOption = createElement("div",InputOptions)
    let newButtonMinus = createElement("img",ButtonMinus)
    let newInput_1 = createElement("input",INPUT_1)
    let newInput_2 = createElement("input",INPUT_2)
    let newButtonPlus = createElement("img",ButtonPlus)
    
    //append to the div input-options
    newInputOption.appendChild(newButtonMinus)
    newInputOption.appendChild(newInput_1)
    newInputOption.appendChild(newInput_2)

    //append to the div input-item
    newInputItem.appendChild(newInputOption)
    newInputItem.appendChild(newButtonPlus)

    //append the new created div input a item to the article input-data
    InputData.appendChild(newInputItem)
}

ButtonPlus.addEventListener("click",addInputItem)