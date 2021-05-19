const tasgInput = document.querySelector('#tags_input')
const corzinhaInput = document.querySelector("#corzinha")


corzinhaInput.addEventListener("input",  ({target}) =>{
	selections[i].color = target.value



	const index = tags.indexOf(i)
	const button = document.querySelectorAll('.button')[index]
	button.style.color = selections[i].color

	reDraw()
	
})

let tags = []

const updateButtons = (value) => {
	const newButton = document.createElement("button")
	newButton.innerText = value
	newButton.className = "button"

	selections[value] = newSelection()

	newButton.style.color = selections[value].color

	newButton.addEventListener('click', ({target}) => {
		const value = target.innerText
		i = value
		data = selections[value]
	})

	

	document.querySelector("#buttons").appendChild(newButton)

	tasgInput.value = ''
}

tasgInput.addEventListener('keydown', (e) => { 
	const value = e.target.value

	if((e.key == "Enter") && (value != "")){
		tags.pushAsync(e.target.value)
		.then(updateButtons)
	}
})