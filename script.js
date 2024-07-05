let button = document.querySelector('.button');
let inputValue = document.querySelector('.inputValue');

async function fetchData() {
  try {
    const response = await fetch(`https://api.edamam.com/search?q=${inputValue.value}&app_id=fac26c66&app_key=4a9974440d1ea9d6e3007555f812353a`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

async function renderData() {
  const displayRecipes = document.querySelector('.displayRecipes');
  displayRecipes.innerHTML = '';

  const data = await fetchData();

  if (!data || !data.hits || data.hits.length === 0) {
    displayRecipes.innerHTML = 'No recipes found.';
    return;
  }

  data.hits.forEach(item => {
    const recipe = document.createElement('div');
    recipe.classList.add('recipe');

    const title = document.createElement('h2');
    title.textContent = item.recipe.label;

    const image = document.createElement('img');
    image.src = item.recipe.image;
    image.alt = item.recipe.label;

    const calories = document.createElement('p');
    calories.textContent = `Calories: ${Math.round(item.recipe.calories)}`;

    const ingredients = document.createElement('p');
    ingredients.textContent = 'Ingredients: ' + item.recipe.ingredientLines.join(', ');

    const link = document.createElement('a');
    link.href = item.recipe.url;
    link.target = '_blank';
    link.textContent = 'View Recipe';

    recipe.appendChild(title);
    recipe.appendChild(image);
    recipe.appendChild(calories);
    recipe.appendChild(ingredients);
    recipe.appendChild(link);

    displayRecipes.appendChild(recipe);
  });
}

button.addEventListener('click', renderData);
