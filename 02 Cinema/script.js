const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;

//functions

//update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].map( (seat) =>      [...seats].indexOf(seat) );

  console.log(seatsIndex);

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

//save selected movie index and price
function setMovieData (movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

//get data from local storage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length >0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1 ) 
        seat.classList.add('selected');
      
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

///// event listeners /////

//seat click event
container.addEventListener('click', (e) => {
  //console.log(e.target);
  if (
    e.target.classList.contains('seat') && 
    !e.target.classList.contains('occupied')
    ) {
      e.target.classList.toggle('selected');

      updateSelectedCount();
  }
});

//movie select event
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +movieSelect.value;

  setMovieData(e.target.selectedIndex, e.target.value);  

  updateSelectedCount();
});



//initial count and total set
updateSelectedCount();