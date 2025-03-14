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
