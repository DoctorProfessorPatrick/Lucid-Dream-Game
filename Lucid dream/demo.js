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
        setState: { height: true },
        nextText: 2
      },
	  
	  {
		text: 'No',
	  setState: { height: false },
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
        nextText: 3
      },
      {
        text: 'No',
        nextText: 4
      }
    ]
  },
  {
    id: 3,
    text: 'I am ready to make a guess. Is your animal a giraffe?',
    options: [
      {
        text: 'Yes',
        nextText: 5
      }
      
    ]
  },
  {
    id: 4,
    text: 'You run in the direction of the tug, as you look behind you as the wolves are beginning to catch up. You look back ahead and the woman stops and turns sharply to the left, as you try your best to follow along. The sharp turn seemingly worked, as the wolves keep darting forwards in the direction you were originally headed. The sound of gunshots, or what you think are gunshots are heard, as the howling of the wolves stops. You stop and turn to face the sound of the gunshots, as the woman pushes you. "Well ain\'t it our lucky day then" as a wry smile is seen on her face. "It\s not every day you see a couple of dire wolves in this neck of the woods, let alone the militia" as she looks towards you. "Name\'s Elaina, what\'s yours?" You begin to speak, but you draw a blank, as your head begins to pulse hard leaving you breathless as you begin to lose consciousness.  ',
    options: [
      {
        text: 'This is the end of the demonstration. But you can go back to see a different choice and ending.',
        nextText: -1
      }
    ]
  }
  {
	  id: 5, 
	  text: 'Would you like to try again?'
	  options: [
	  {
		  text: 'Yes',
		  nextText: -1
	  },
	  {
		  text: 'No',
		  break
	  }
  }
		
  ]
  

startGame()