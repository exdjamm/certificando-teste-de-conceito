const tasgInput = document.querySelector('#tags_input')

let tags = []

const updateButtons = (value) => {
	const newButton = document.createElement("button")
	newButton.innerText = value

	newButton.className = "button"
	newButton.addEventListener('click', () => {
		i = value

		selections[value] = newSelection()

		data = selections[value]

		selections['objetc_1'] = {initPos: {x:0, y:0},endPos: {x:0, y:0}}
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