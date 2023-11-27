const random = document.getElementById('random');
const mealsEl = document.getElementById('meals-container');
const single_mealEl = document.getElementById('single-meal');

const getRandomMeal = async () => {
    mealsEl.innerHTML = '';
    single_mealEl.innerHTML = '';

    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');

    if (response.status === 200) {
        const data = await response.json();
        const meal = await data.meals[0];
        addMealToDOM(meal);
    } else {
        throw new Error('음식을 가져오지 못했습니다.');
    }
};

const addMealToDOM = (meal) => {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else {
            break;
        }
    }

    single_mealEl.innerHTML = `
      <h1>${meal.strMeal}</h1>
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>분류: ${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p>국가: ${meal.strArea}</p>` : ''}
      </div>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />

      <div class="main">
        <h2>조리 방법</h2>
        <ul>
          ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
        <p>${meal.strInstructions}</p>
      </div>
  `;
};

random.addEventListener('click', getRandomMeal); //랜덤 클릭되면 getRandomMeal 호출