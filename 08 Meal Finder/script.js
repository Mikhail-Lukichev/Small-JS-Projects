const search = document.getElementById("search"),
	submit = document.getElementById("submit"),
	random = document.getElementById("random"),
	mealsEl = document.getElementById("meals"),
	resultHeading = document.getElementById("result-heading"),
	singleMealEl = document.getElementById("single-meal");

//functions

function searchMeal(e) {
	e.preventDefault();

	const query = search.value;

	search.value = "";

	if (query.trim()) {
		fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
		.then(res => res.json())
		.then(data => {

			if (data.meals === null) {
				mealsEl.innerHTML = '';
				resultHeading.innerHTML = `<h3>No results found for "${query}"`;
			} else {
				resultHeading.innerHTML = `<h3>Search results for "${query}":`;
				mealsEl.innerHTML = data.meals.map(meal => {
					return `
					<div class="meal">
						<img src="${meal.strMealThumb}" alt="${meal.strMeal}">
						<div class="meal-info" data-mealID="${meal.idMeal}">
							<h3>${meal.strMeal}</h3>
						</div>
					</div>`;
				}).join('');
			}
		});
	}
}

function getRandomMeal() {
	mealsEl.innerHTML = '';
	resultHeading.innerHTML = '';

	fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
	.then(res => res.json())
	.then(data => {
		const meal = data.meals[0];
		addMealToDOM(meal);
	});

}

function getMealByID(mealID) {

	fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
		.then(res => res.json())
		.then(data => {
			const meal = data.meals[0];
			addMealToDOM(meal);
		});
}

function addMealToDOM(meal) {
	const ingridients = [];

	for (let i=1; i<=20; i++) {
		if ( meal[`strIngredient${i}`]) {
			ingridients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
		} else {
			break;
		}
	} 
	console.log(ingridients);

	singleMealEl.innerHTML = `
	<h3>${meal.strMeal}</h3>
	<img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
	<p>${meal.strInstructions}</p>
	<ul>
	<p>${ingridients.map(item => `<li>${item}</li>`).join('')}</p>
	</ul>
	
	
	`;
}

// event listeners

submit.addEventListener("submit",searchMeal);
random.addEventListener("click", getRandomMeal);

mealsEl.addEventListener("click", e => {
	const mealInfo = e.path.find(item => {
		if (item.classList) {
			return item.classList.contains("meal-info");
		} else {
			return false;
		}
	});

	if (mealInfo) {
		const mealID = mealInfo.getAttribute("data-mealID");
		getMealByID(mealID);
	}

});