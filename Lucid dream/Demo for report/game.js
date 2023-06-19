const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}
var yes = 0;
var no = 0;
function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'Is your animal tall?',
    options: [
      {
        text: 'Yes',
        nextText: 2
      },
	  
	  {
		text: 'No',
		nextText: 2
	  }
    ]
  },
	{
		id: 2,
		text: 'Does your animal have legs?',
		options: [
		{
			text: 'Yes',
			nextText: 4
		},
		{
			text: 'No',
			nextText: 3
		}
		]
  },
  {
    id: 5,
    text: 'Is your animal a whale?',
    options: [
      {
        text: 'Yes',
        nextText: 10
      },
	  
	  {
		text: 'No',
		nextText: 2
	  }
    ]
  },
  {
    id: 3,
    text: 'Does your animal live in the ocean?',
    options: [
      {
        text: 'Yes',
        nextText: 5
      },
	  {
		  text: 'No',
		  nextText: 4
	  }
      
    ]
  },
{
    id: 10,
    text: 'Would you like to play again?',
    options: [
      {
        text: 'Yes',
        nextText: -1
      },
	  
	  {
		text: 'No',
		//how to end a function
	  }
    ]
  },  ]
  

startGame()