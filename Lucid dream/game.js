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
    text: '"Damn, what happened" you think to yourself. The last thing you remember was seeing bright flashing lights and then darkness. You get a feeling of pain from your arm, and you reach out to rub the spot with your other hand. "Huh, was I pricked by a needle?" you say out loud to yourself. Your head pounds as you dig through your memories trying to remember what happened. As you do so, the sounds of your surrounding reach your ears, as the call of birds and rustling of leaves is heard. You look up and see you are in a forest like setting, with the light permeating through the canopy, seemingly lighting the way down to what appears to be a dirt road. As you look down the road, you see a small figure, reaching your destination at a rapid pace. "Shit, are they after me?" you think to yourself, in the midst of confusion as to where you are, and how you got there, a small glint catches your eye. A small dagger is seen by the side, and the figure, now visible in purple attire, is almost at your feet. What do you do? ',
    options: [
      {
        text: 'Pick up and draw the blade, ready to attack',
        setState: { aggressive: true },
        nextText: 2
      },
	  
	  {
		text: 'Pick up the blade, but keep it hidden',
	  setState: { aggressive: false },
		nextText: 2
	  },
      {
        text: 'Hide',
		nextText: 3 
      }
    ]
  },
  {
    id: 2,
    text: 'You quickly scoop up the knife as the figure reaches your area. As you begin to speak to the figure, a woman now visible, races past you, screaming "You might want to run!". Confused, you look towards the direction she was running from and hear the sounds of howling as three huge shapes begin to show. You recognize these as wolves, but they appear to be bigger than any you\'ve seen before. "Shit, shit, shit" you begin to panic, as you feel a tug behind you. What is it you do next?',
    options: [
      {
        text: 'Push away from the tug and hide',
        nextText: 3
      },
      {
        text: 'Follow the tug and run towards it',
        nextText: 9
      }
    ]
  },
  {
    id: 3,
    text: 'You find a good hiding spot. And wait and wait until what appears to be several minutes pass and nothing seemingly major happens. You look out from your spot and come face to face with some wolves, who are quick to pounce on you.',
    options: [
      {
        text: 'You have died, but you still feel alive. It appears that you did not reach lucidity. Try again?',
        nextText: -1
      }
      
    ]
  },
  {
    id: 9,
    text: 'You run in the direction of the tug, as you look behind you as the wolves are beginning to catch up. You look back ahead and the woman stops and turns sharply to the left, as you try your best to follow along. The sharp turn seemingly worked, as the wolves keep darting forwards in the direction you were originally headed. The sound of gunshots, or what you think are gunshots are heard, as the howling of the wolves stops. You stop and turn to face the sound of the gunshots, as the woman pushes you. "Well ain\'t it our lucky day then" as a wry smile is seen on her face. "It\s not every day you see a couple of dire wolves in this neck of the woods, let alone the militia" as she looks towards you. "Name\'s Elaina, what\'s yours?" You begin to speak, but you draw a blank, as your head begins to pulse hard leaving you breathless as you begin to lose consciousness.  ',
    options: [
      {
        text: 'This is the end of the demonstration. But you can go back to see a different choice and ending.',
        nextText: -1
      }
    ]
  },
  ]
  

startGame()