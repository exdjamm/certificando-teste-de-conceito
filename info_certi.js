const tasgInput = document.querySelector('#tags_input')

let tags = []

const updateButtons = (value) => {
	const newButton = document.createElement("button")
	newButton.innerText = value

	newButton.className = "button"

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