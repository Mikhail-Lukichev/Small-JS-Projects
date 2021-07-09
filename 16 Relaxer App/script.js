const text = document.getElementById("text");
const container = document.getElementById("container")

function breatheAnimation() {
	container.className = "container breathe-in";
	text.innerText = "Breathe in!";
	
	setTimeout(() => {
		text.innerText = "Hold!";
		setTimeout(() => {
			text.innerText = "Breathe out!";
			container.className = "container breathe-out";
		},1500);
	},3000);
}

breatheAnimation();
setInterval(breatheAnimation,7500);
