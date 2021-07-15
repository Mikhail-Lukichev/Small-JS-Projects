const countdown = document.getElementById('countdown');
const spinner = document.getElementById('spinner');
const days = document.getElementById('days');
const daysLabel = document.getElementById('days-label');
const hours = document.getElementById('hours');
const hoursLabel = document.getElementById('hours-label');
const minutes = document.getElementById('minutes');
const minutesLabel = document.getElementById('minutes-label');
const seconds = document.getElementById('seconds');
const secondsLabel = document.getElementById('seconds-label');
const year = document.getElementById('year');

function update() {
	const currentYear = new Date().getFullYear();
	year.innerText = currentYear + 1;

	const newYearTime = new Date(`January 01 2022 00:00:00`);
	const currentTime = new Date();
	
	const difference = newYearTime - currentTime;
	days.innerText = Math.floor(difference/1000/60/60/24);
	daysLabel.innerText = Math.floor(difference/1000/60/60/24) == 1 ? "day" : "days";
	hours.innerText = Math.floor(difference/1000/60/60) % 24 < 10 ? "0" + Math.floor(difference/1000/60/60) % 24 : Math.floor(difference/1000/60/60) % 24;
	hoursLabel.innerText = Math.floor(difference/1000/60/60) % 24 == 1 ? "hour" : "hours";
	minutes.innerText = Math.floor(difference/1000/60) % 60 < 10 ? "0" + Math.floor(difference/1000/60) % 60 : Math.floor(difference/1000/60) % 60;
	minutesLabel.innerText = Math.floor(difference/1000/60) % 60 == 1 ? "minute" : "minutes";
	seconds.innerText = Math.floor(difference/1000) % 60 < 10 ? "0" + Math.floor(difference/1000) % 60 : Math.floor(difference/1000) % 60;
	secondsLabel.innerText = Math.floor(difference/1000) % 60 == 1 ? "second" : "seconds";
}

function spinnerHide() {
	spinner.style.display = "none";
	countdown.style.display = "flex";
	
}

setTimeout(spinnerHide,1000);
setInterval(update,1000);