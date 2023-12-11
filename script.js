//abut button functionality
let aboutBtn = document.getElementById("about")
aboutBtn.onclick = () =>{
    location.href = "./aboutPage.html";
}


//functionality for random Image generated
function getRandomImg() {
    let api = `https://www.themealdb.com/api/json/v1/1/random.php`
  
    fetch(api).then((res) => res.json()).then((result) => {
        let imageUrl = result.meals[0].strMealThumb;
        let randomImg = document.getElementById('random-img');
        randomImg.style.backgroundImage = `url(${imageUrl})`;

        let meal = result.meals[0];

        let dishNameParagraph = document.getElementById('dish-name');
        dishNameParagraph.textContent = meal.strMeal;

        // Call createPopup with the entire meal object
        randomImgDiv.addEventListener('click', () => {
            createPopup(meal);
        });

        console.log(result);
    })
    .catch((err) => {
        console.log(err)
    });
}

getRandomImg();



//popup
function createPopup(meal) {
  let popupDiv = document.getElementById('popup');
  let contentParagraph = document.getElementById('popup-content');
  
  // Check if the 'meals' property exists in the API response
  if (meal && meal.strMeal) {
    // Extract ingredients from the meal object
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      let ingredient = meal[`strIngredient${i}`];
      if (ingredient) {
        ingredients.push(ingredient);
      } else {
        // If no more ingredients, break the loop
        break;
      }
    }

    // Create a list of ingredients
    let ingredientsList = '<h3>Ingredients:</h3><ul>';
    ingredients.forEach(ingredient => {
      ingredientsList += `<li>${ingredient}</li>`;
    });
    ingredientsList += '</ul>';

    // Set the title and ingredients in the popup
    contentParagraph.innerHTML = `<h3>${meal.strMeal}</h3>${ingredientsList}`;
    popupDiv.style.display = 'block';
    popupDiv.addEventListener('click', () => {
        popupDiv.style.display = 'none';
    });
  } else {
    console.error('Invalid meal data:', meal);
  }
}

// Add click event listener to random-img
let randomImgDiv = document.getElementById('random-img');
randomImgDiv.addEventListener('click', () => {
  createPopup();
});


// Catagory images
function getCategory(category) {
  let api = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;

  fetch(api)
    .then((res) => res.json())
    .then((result) => {
      // Loop through the category-item divs
      for (let i = 1; i <= 4; i++) {
        let categoryImg = document.getElementById(`category-img${i}`);
        let imageUrl = result.meals[i - 1].strMealThumb;
        categoryImg.src = imageUrl;

        // Get the corresponding dish-name paragraph
        let dishNameParagraph = document.getElementById(`dish-name${i}`);
        // Set the text content to the meal name
        dishNameParagraph.textContent = result.meals[i - 1].strMeal;
      }

      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
}

// Add click event listener to search-image
let searchImage = document.getElementById('search-image');
searchImage.addEventListener('click', () => {
  // Get the value entered by the user in the search-meal input
  let searchMealInput = document.getElementById('search-meal');
  let userEnteredValue = searchMealInput.value;

  // Call getCategory with the user-entered value
  getCategory(userEnteredValue);
  searchMealInput.value = "";

  let categoryHeading = document.getElementById('category-heading');
  categoryHeading.textContent = `${userEnteredValue}`;
});