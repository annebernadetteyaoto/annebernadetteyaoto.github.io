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

fetch(jsonFile)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data); // Log the fetched data to check its structure
    var sections = data.sections || [];
    var container = document.getElementById('fullpage');
    container.innerHTML = ''; // Clear existing content

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
    ],
    "tourist-spots.html": [
      {
        "landmarks": [
          {
            header: 'name',
            description: '',
          },
          {
            header: 'name',
            description: '',
          },
          {
            header: 'name',
            description: '',
          }
        ],
        "naturalSites": [
          {
            header: 'name',
            description: '',
          },
          {
            header: 'name',
            description: '',
          },
          {
            header: 'name',
            description: '',
          }
        ],
        "UNESCO": [
          {
            header: 'name',
            description: '',
          },
          {
            header: 'name',
            description: '',
          },
          {
            header: 'name',
            description: '',
          },
          {
            header: 'name',
            description: '',
          }
        ]
      }
    ]
  }
}
