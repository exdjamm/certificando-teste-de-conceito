const px = 3;

const canvas = document.querySelector("#canvas")
let  offSet = canvas.getBoundingClientRect()

let ctx = canvas.getContext('2d');
ctx.strokeStyle = '#000';
ctx.lineWidth = px;

// Values
let edit = false;
let i = "";
let selections = {}

let data = selections[i]

// Functions
const newSelection = () => {
	return {
		initPos: {x:0, y:0},
		endPos: {x:0, y:0},
		color: `rgb(${getRandomByte()}, ${getRandomByte()}, ${getRandomByte()})`
	}
}

const setNew = (value) => {
	edit = true
	// data = newSelection()
}

const setNewEnd = (value) => {
	edit = false
}

function updateDraw() {
	if(edit){
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		// desenharFoto()
		Object.values(selections).forEach((data)=> {
			ctx.strokeStyle = data.color;
			ctx.strokeRect(data.initPos.x, data.initPos.y, data.endPos.x, data.endPos.y)
		})
		
	}
}


const updateInit = (e) => {
	
	if(Object.values(selections).length == 0){
		throw Error("Nenhum campo criado");
	}

	setNew()

	

	data.endPos = {x:0, y: 0}

	const {clientX, clientY} = e 

	data.initPos = {x:(clientX - offSet.left), y: (clientY - offSet.top)}

	updateDraw()
}

const updateMove = (e) => {

	if(Object.values(selections).length == 0){
		throw Error("Nenhum campo criado");
	}

	const {clientX, clientY} = e 

	if (edit) {
		data.endPos = {x:(clientX - data.initPos.x - offSet.left) , y: (clientY - data.initPos.y - offSet.top)}	
	}
	

	updateDraw()
}


const input = document.querySelector("#certi input")

function desenharFoto() {
	const file = input.files[0];

	base_image = new Image();
	base_image.src = URL.createObjectURL(file);

	base_image.onloadend = function(){

		setTimeout(() => {
			canvas.width = base_image.width
			canvas.height = base_image.height

			offSet = canvas.getBoundingClientRect()

			ctx.strokeStyle = '#000';
			ctx.lineWidth = px;

		}, 0)


		document.querySelector("#content").appendChild(base_image)
		// ctx.drawImage(base_image, 0, 0);
		// ctx.strokeRect(data.initPos.x, data.initPos.y, data.endPos.x, data.endPos.y);
	}
}

canvas.addEventListener("mousedown", updateInit)
canvas.addEventListener("mousemove", updateMove)
canvas.addEventListener("mouseup", setNewEnd)