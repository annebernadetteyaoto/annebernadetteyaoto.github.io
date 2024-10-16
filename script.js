function generateNavbar() {
    var navbar = document.getElementById("navbar");
    var currentPage = window.location.pathname.split("/").pop(); 
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

function generateSection() {
    var section = [
        {
          heading: 'Welcome to Česká Republika',
          text: '<b>Czechia</b>, officially the <b>Czech Republic</b>, is a Central European country known for its rich history, stunning architecture, and vibrant culture. Its capital, Prague, is famous for landmarks like Prague Castle and Charles Bridge. Czechia boasts a strong tradition in arts and literature, with notable figures such as Franz Kafka and Antonín Dvořák.',
          backgroundImage: 'prague castle.jpeg'
        },{
          heading: 'Name and Etymology',
          text: 'The name <b>“Czech”</b> comes from the Czech people, a Slavic ethnic group. <b>"Czechia"</b> was adopted in 2016 as a shorter, official name for the country.',
          backgroundImage: 'budejovice.jpg'
        },{
          heading: 'Geography',
          text: 'Czechia is a landlocked country bordered by Germany, Poland, Slovakia, and Austria. It features diverse landscapes, including mountains and plains, and is divided into three historical regions: Bohemia, Moravia, and Silesia.',
          backgroundImage: 'geography.jpg'
        },{
          heading: 'Capital City',
          text: '<b>Prague (Praha)</b> is the capital city, known as <b>"the City of a Hundred Spires"</b> for its many historic churches and towers. Key attractions include Prague Castle, Charles Bridge, and the Old Town Square.',
          backgroundImage: 'bridge.jpg'
        },{
          heading: 'Language',
          text: 'The official language is <b>Czech</b>, a West Slavic language that uses the Latin alphabet. It is a vital part of national identity and is taught in schools. ',
          backgroundImage: 'language.jpg'
        },{
          heading: 'Population',
          text: 'Czechia has a population of about <b>10.5 million</b>, primarily ethnic Czechs, with small minority groups. It boasts a high standard of living and a strong education system.',
          backgroundImage: 'crowd.jpg'
        },{
          heading: 'Religion ',
          text: 'Czechia is predominantly <b>non-religious</b>, including atheists and agnostics, but they are historically predominantly Catholics. Today only 10-11% of Czechs are Catholics. Other religions include Protestantism, Orthodox Christianity, and Judaism.',
          backgroundImage: 'religion.jpg'
        }
      ];
  
      for(var i=0; i<section.length; i++) {
        var container = document.getElementById('fullpage');
        container.innerHTML += "<div class='section " + section[i].className + "' style='background-image: url(\"" + section[i].backgroundImage + "\");'><div class='col-7 ps-5 text-white'><h1>" + section[i].heading + "</h1><p><small>" + section[i].text + "</small></p></div></div>";
      };
}