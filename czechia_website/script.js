var currentPage = window.location.pathname.split("/").pop();

function generateNavbar() {
  var navbar = document.getElementById("navbar");
  var pages = {
    "index.html": "Home",
    "history.html": "History",
    "culture.html": "Culture",
    "food.html": "Food and Drink",
    "tourist-spots.html": "Tourist Spots",
    "language.html": "Language",
    "trivia.html": "Trivia"
  };

  var navItems = "";
  for (var page in pages) {
    var activeClass = (page === currentPage) ? "active" : "";
    navItems += `<li class="nav-item"><a class="nav-link ${activeClass}" href="${page}">${pages[page]}</a></li>`;
  }

  navbar.innerHTML = `
      <nav class="navbar bg-dark navbar-expand-lg opacity-75" data-bs-theme="dark">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="nav nav-underline m-auto mb-2 mb-lg-0">
              ${navItems}
            </ul>
          </div>
        </div>
      </nav>
    `;
}

function generateSection(page) {
  var jsonFile = page === 'index.html' ? 'index.json' : 'history.json';

  fetch(jsonFile)
    .then(response => response.json())
    .then(data => {
      var sections = data.sections || [];
      var container = document.getElementById('fullpage');
      
      sections.forEach(section => {
        container.innerHTML += `
          <div class='section' style='background-image: url("${section.backgroundImage}");'>
              <div class='col-7 ps-5 text-white'>
                  <h1>${section.heading}</h1>
                  <p><small>${section.text}</small></p>
              </div>
          </div>`;
      });
    })
    .catch(error => console.error('Error loading JSON:', error));
}

function generateCard(page) {
  var cards = {
    "food.html": [
      {
        "popularDishes": [
          {
            header: 'Svíčková',
            description: 'A creamy sauce made from root vegetables, served with marinated beef and bread dumplings.',
            ingredients: '',
            instructions: '',
          },
          {
            header: 'dish2',
            description: '',
            ingredients: '',
            instructions: '',
          },
          {
            header: 'dish3',
            description: '',
            ingredients: '',
            instructions: '',
          }
        ],
        "popularDrinks": [
          {
            header: 'drink1',
            description: '',
            ingredients: false,
            instructions: false,
          },
          {
            header: 'drink2',
            description: '',
            ingredients: false,
            instructions: false,
          },
          {
            header: 'drink3',
            description: '',
            ingredients: false,
            instructions: false,
          }
        ],
        "traditionalDishes": [
          {
            header: 'dish1',
            description: '',
            ingredients: '',
            instructions: '',
          },
          {
            header: 'dish2',
            description: '',
            ingredients: '',
            instructions: '',
          }
        ],
        "traditionalDrinks": [
          {
            header: 'drink1',
            description: '',
            ingredients: false,
            instructions: false,
          },
          {
            header: 'drink2',
            description: '',
            ingredients: false,
            instructions: false,
          }
        ],
        "nationalFoodAndDish": [
          {
            header: 'dish',
            description: '',
            ingredients: false,
            instructions: false,
          },
          {
            header: 'drink',
            description: '',
            ingredients: false,
            instructions: false,
          },
        ]
      }
    ]
  }
  const data = cardsData[page][0];

  data.popularDishes.forEach((dish, index) => {
    generateCard(dish, 'popular-dishes', index);
  });

  data.traditionalDishes.forEach((dish, index) => {
    generateCard(dish, 'traditional-dishes', index);
  });

  data.popularDrinks.forEach((drink, index) => {
    generateCard(drink, 'popular-drinks', index);
  });

  data.traditionalDrinks.forEach((drink, index) => {
    generateCard(drink, 'traditional-drinks', index);
  });

  data.nationalFoodAndDish.forEach((dish, index) => {
    if (index === 0) generateCard(dish, 'national-dish', index);
  });

  data.nationalFoodAndDish.forEach((dish, index) => {
    if (index === 1) generateCard(dish, 'national-drink', index);
  });
}

function generateCard(item, containerId, index) {
  const container = document.getElementById(containerId);
  const cardId = `card-${containerId}-${index}`;

  let modalButtons = '';
  if (item.ingredients) {
    modalButtons += `<button class="btn btn-primary" data-toggle="modal" data-target="#modal-${cardId}">Ingredients</button>`;
  }
  if (item.instructions) {
    modalButtons += `<button class="btn btn-primary" data-toggle="modal" data-target="#modal-${cardId}">Instructions</button>`;
  }

  container.innerHTML += `
    <div class="col-4 mb-3">
      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${item.header}</h5>
          <p class="card-text">${item.description}</p>
          ${modalButtons}
        </div>
      </div>
    </div>
  `;

  if (item.ingredients || item.instructions) {
    document.getElementById('modal-container').innerHTML += `
      <div class="modal fade" id="modal-${cardId}" tabindex="-1" aria-labelledby="modalLabel-${cardId}" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalLabel-${cardId}">${item.header}</h5>
              <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              ${item.ingredients ? `<h6>Ingredients:</h6><p>${item.ingredients}</p>` : ''}
              ${item.instructions ? `<h6>Instructions:</h6><p>${item.instructions}</p>` : ''}
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

