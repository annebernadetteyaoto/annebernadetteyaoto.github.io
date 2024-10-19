<<<<<<< HEAD
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
  var sections = {
    "index.html": [
      {
        heading: 'Welcome to Česká Republika',
        text: '<b>Czechia</b>, officially the <b>Czech Republic</b>, is a Central European country known for its rich history, stunning architecture, and vibrant culture. Its capital, Prague, is famous for landmarks like Prague Castle and Charles Bridge. Czechia boasts a strong tradition in arts and literature, with notable figures such as Franz Kafka and Antonín Dvořák.',
        backgroundImage: 'images/prague castle.jpeg'
      },
      {
        heading: 'Name and Etymology',
        text: 'The name <b>“Czech”</b> comes from the Czech people, a Slavic ethnic group. <b>"Czechia"</b> was adopted in 2016 as a shorter, official name for the country.',
        backgroundImage: 'images/budejovice.jpg'
      },
      {
        heading: 'Geography',
        text: 'Czechia is a landlocked country bordered by Germany, Poland, Slovakia, and Austria. It features diverse landscapes, including mountains and plains, and is divided into three historical regions: Bohemia, Moravia, and Silesia.',
        backgroundImage: 'images/geography.jpg'
      },
      {
        heading: 'Capital City',
        text: '<b>Prague (Praha)</b> is the capital city, known as <b>"the City of a Hundred Spires"</b> for its many historic churches and towers. Key attractions include Prague Castle, Charles Bridge, and the Old Town Square.',
        backgroundImage: 'images/bridge.jpg'
      },
      {
        heading: 'Language',
        text: 'The official language is <b>Czech</b>, a West Slavic language that uses the Latin alphabet. It is a vital part of national identity and is taught in schools.',
        backgroundImage: 'images/language.jpg'
      },
      {
        heading: 'Population',
        text: 'Czechia has a population of about <b>10.5 million</b>, primarily ethnic Czechs, with small minority groups. It boasts a high standard of living and a strong education system.',
        backgroundImage: 'images/crowd.jpg'
      },
      {
        heading: 'Religion ',
        text: 'Czechia is predominantly <b>non-religious</b>, including atheists and agnostics, but they are historically predominantly Catholics. Today only 10-11% of Czechs are Catholics. Other religions include Protestantism, Orthodox Christianity, and Judaism.',
        backgroundImage: 'images/religion.jpg'
      }
    ],
    "history.html": [
      {
        heading: 'Introduction',
        text: 'Czech Republic boasts a rich and diverse history that spans over a millennium. From its early days as part of the Great Moravian Empire in the 9th century to its prominence as the Kingdom of Bohemia in medieval Europe, the region has played a crucial role in shaping Central European history. After centuries under Habsburg rule and a turbulent 20th century marked by both Nazi occupation and communist control, Czechia emerged as an independent nation in 1993 following the peaceful dissolution of Czechoslovakia. Today, it stands as a modern democratic state, renowned for its vibrant culture and historical heritage.',
        backgroundImage: 'images/karel.jpg'
      },
      {
        heading: 'Early Foundations',
        text: 'The history of the Czech Republic dates back to the 9th century with the establishment of the Great Moravian Empire, the first significant Slavic state in Central Europe. Following its decline, the region became part of the Kingdom of Bohemia in the 10th century, which played a crucial role in European politics and culture.',
        backgroundImage: 'images/great-moravia.png'
      },
      {
        heading: 'Habsburg Rule and Turmoil',
        text: 'In 1526, the Habsburgs gained control over Bohemia, leading to centuries of foreign rule. The 30 Years\' War (1618-1648) devastated the region, resulting in the decline of the Czech language and culture.',
        backgroundImage: 'images/habsburg.png'
      },
      {
        heading: 'National Revival',
        text: 'The Czech National Revival in the 19th century sparked a movement to revive Czech language and culture, leading to increased nationalism. After World War I, the Czechoslovak Republic was established in 1918, uniting Czechs and Slovaks.',
        backgroundImage: 'images/national-revival.jpg'
      },
      {
        heading: 'World War II',
        text: 'However, the interwar period was marked by economic challenges and political instability. Following the Munich Agreement in 1938, Czechoslovakia lost territory to Germany, and the country was occupied during World War II.',
        backgroundImage: 'images/ww2.jpg'
      },
      {
        heading: 'Communist Era',
        text: 'After the war, Czechoslovakia fell under communist rule in 1948, becoming a part of the Eastern Bloc. The Velvet Revolution in 1989 peacefully ended communist rule, leading to a democratic government.',
        backgroundImage: 'images/communist.jpg'
      },
      {
        heading: 'Split and Modern Era',
        text: 'On January 1, 1993, Czechoslovakia split into two independent states: the Czech Republic and Slovakia. Since then, the Czech Republic has become a stable democracy and a member of the European Union, NATO, and other international organizations.',
        backgroundImage: 'images/split.jpg'
      }
    ]
  };

  var section = sections[page] || [];

  for (var i = 0; i < section.length; i++) {
    var container = document.getElementById('fullpage');
    container.innerHTML += `
          <div class='section' style='background-image: url("${section[i].backgroundImage}");'>
              <div class='col-7 ps-5 text-white'>
                  <h1>${section[i].heading}</h1>
                  <p><small>${section[i].text}</small></p>
              </div>
          </div>`;
  }
}
=======
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
  var sections = {
    "index.html": [
      {
        heading: 'Welcome to Česká Republika',
        text: '<b>Czechia</b>, officially the <b>Czech Republic</b>, is a Central European country known for its rich history, stunning architecture, and vibrant culture. Its capital, Prague, is famous for landmarks like Prague Castle and Charles Bridge. Czechia boasts a strong tradition in arts and literature, with notable figures such as Franz Kafka and Antonín Dvořák.',
        backgroundImage: 'images/prague castle.jpeg'
      },
      {
        heading: 'Name and Etymology',
        text: 'The name <b>“Czech”</b> comes from the Czech people, a Slavic ethnic group. <b>"Czechia"</b> was adopted in 2016 as a shorter, official name for the country.',
        backgroundImage: 'images/budejovice.jpg'
      },
      {
        heading: 'Geography',
        text: 'Czechia is a landlocked country bordered by Germany, Poland, Slovakia, and Austria. It features diverse landscapes, including mountains and plains, and is divided into three historical regions: Bohemia, Moravia, and Silesia.',
        backgroundImage: 'images/geography.jpg'
      },
      {
        heading: 'Capital City',
        text: '<b>Prague (Praha)</b> is the capital city, known as <b>"the City of a Hundred Spires"</b> for its many historic churches and towers. Key attractions include Prague Castle, Charles Bridge, and the Old Town Square.',
        backgroundImage: 'images/bridge.jpg'
      },
      {
        heading: 'Language',
        text: 'The official language is <b>Czech</b>, a West Slavic language that uses the Latin alphabet. It is a vital part of national identity and is taught in schools.',
        backgroundImage: 'images/language.jpg'
      },
      {
        heading: 'Population',
        text: 'Czechia has a population of about <b>10.5 million</b>, primarily ethnic Czechs, with small minority groups. It boasts a high standard of living and a strong education system.',
        backgroundImage: 'images/crowd.jpg'
      },
      {
        heading: 'Religion ',
        text: 'Czechia is predominantly <b>non-religious</b>, including atheists and agnostics, but they are historically predominantly Catholics. Today only 10-11% of Czechs are Catholics. Other religions include Protestantism, Orthodox Christianity, and Judaism.',
        backgroundImage: 'images/religion.jpg'
      }
    ],
    "history.html": [
      {
        heading: 'Introduction',
        text: 'Czech Republic boasts a rich and diverse history that spans over a millennium. From its early days as part of the Great Moravian Empire in the 9th century to its prominence as the Kingdom of Bohemia in medieval Europe, the region has played a crucial role in shaping Central European history. After centuries under Habsburg rule and a turbulent 20th century marked by both Nazi occupation and communist control, Czechia emerged as an independent nation in 1993 following the peaceful dissolution of Czechoslovakia. Today, it stands as a modern democratic state, renowned for its vibrant culture and historical heritage.',
        backgroundImage: 'images/karel.jpg'
      },
      {
        heading: 'Early Foundations',
        text: 'The history of the Czech Republic dates back to the 9th century with the establishment of the Great Moravian Empire, the first significant Slavic state in Central Europe. Following its decline, the region became part of the Kingdom of Bohemia in the 10th century, which played a crucial role in European politics and culture.',
        backgroundImage: 'images/great-moravia.png'
      },
      {
        heading: 'Habsburg Rule and Turmoil',
        text: 'In 1526, the Habsburgs gained control over Bohemia, leading to centuries of foreign rule. The 30 Years\' War (1618-1648) devastated the region, resulting in the decline of the Czech language and culture.',
        backgroundImage: 'images/habsburg.png'
      },
      {
        heading: 'National Revival',
        text: 'The Czech National Revival in the 19th century sparked a movement to revive Czech language and culture, leading to increased nationalism. After World War I, the Czechoslovak Republic was established in 1918, uniting Czechs and Slovaks.',
        backgroundImage: 'images/national-revival.jpg'
      },
      {
        heading: 'World War II',
        text: 'However, the interwar period was marked by economic challenges and political instability. Following the Munich Agreement in 1938, Czechoslovakia lost territory to Germany, and the country was occupied during World War II.',
        backgroundImage: 'images/ww2.jpg'
      },
      {
        heading: 'Communist Era',
        text: 'After the war, Czechoslovakia fell under communist rule in 1948, becoming a part of the Eastern Bloc. The Velvet Revolution in 1989 peacefully ended communist rule, leading to a democratic government.',
        backgroundImage: 'images/communist.jpg'
      },
      {
        heading: 'Split and Modern Era',
        text: 'On January 1, 1993, Czechoslovakia split into two independent states: the Czech Republic and Slovakia. Since then, the Czech Republic has become a stable democracy and a member of the European Union, NATO, and other international organizations.',
        backgroundImage: 'images/split.jpg'
      }
    ]
  };

  var section = sections[page] || [];

  for (var i = 0; i < section.length; i++) {
    var container = document.getElementById('fullpage');
    container.innerHTML += `
          <div class='section' style='background-image: url("${section[i].backgroundImage}");'>
              <div class='col-7 ps-5 text-white'>
                  <h1>${section[i].heading}</h1>
                  <p><small>${section[i].text}</small></p>
              </div>
          </div>`;
  }
}
>>>>>>> 63e5b89a09a67cadd20b21e7c5667604c1b3cd16
