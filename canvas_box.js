const canvas = document.querySelector("#canvas")
let  offSet = canvas.getBoundingClientRect()

let ctx = canvas.getContext('2d');
ctx.strokeStyle = '#000';
ctx.lineWidth = 4;

// Values
let edit = false;
let i = 0;
let selections = [{
	initPos: {x:0, y:0},
	endPos: {x:0, y:0}
}]

let data = selections[i]

// Functions
const newSelection = () => {
	return {
		initPos: {x:0, y:0},
		endPos: {x:0, y:0}
	}
}

const setNew = (value) => {
	edit = true
}

const setNewEnd = (value) => {
	edit = false

	selections.push(newSelection())
	i = selections.length - 1


	data = selections[i]
}

function updateDraw() {
	if(edit){
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		// desenharFoto()
		selections.forEach((data)=> {
			ctx.strokeRect(data.initPos.x, data.initPos.y, data.endPos.x, data.endPos.y)
		})
		
	}
}


const updateInit = (e) => {
	setNew()

	const {clientX, clientY} = e 

	data.initPos = {x:(clientX - offSet.left), y: (clientY - offSet.top)}

	updateDraw()
}

const updateMove = (e) => {

	const {clientX, clientY} = e 

	if (edit) {
		data.endPos = {x:(clientX - data.initPos.x - offSet.left) , y: (clientY - data.initPos.y - offSet.top)}	
	}
	

	updateDraw()
}


const input = document.querySelector("input")

function desenharFoto() {
	const file = input.files[0];

	base_image = new Image();
	base_image.src = URL.createObjectURL(file);
	base_image.onload = function(){
		canvas.width = base_image.width
		canvas.height = base_image.height

		offSet = canvas.getBoundingClientRect()

		ctx.strokeStyle = '#000';
		ctx.lineWidth = 4;

		document.querySelector("#content").appendChild(base_image)
		// ctx.drawImage(base_image, 0, 0);
		// ctx.strokeRect(data.initPos.x, data.initPos.y, data.endPos.x, data.endPos.y);
	}
}

canvas.addEventListener("mousedown", updateInit)
canvas.addEventListener("mousemove", updateMove)
canvas.addEventListener("mouseup", setNewEnd)