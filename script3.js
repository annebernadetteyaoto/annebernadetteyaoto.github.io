var currentPage = window.location.pathname.split("/").pop();

function generateNavbar() {
    var navbar = document.getElementById("navbar");
    var pages = {
        "index.html": "Home",
        "about.html": "About Me",
        "videos.html": "Videos",
        "skills.html": "Skills",
        "projects.html": "Projects",
        "contact.html": "Contact"
    };

    var navItems = "";
    for (var page in pages) {
        var activeClass = (page === currentPage) ? "active" : "";
        navItems += `<li class="nav-item"><a class="nav-link ${activeClass}" href="${page}">${pages[page]}</a></li>`;
    }

    var navClass = (currentPage === "index.html") ? "navbar-fixed" : "navbar-sticky";

    navbar.innerHTML = `
      <nav class="navbar bg-dark navbar-expand-lg ${navClass} opacity-75" data-bs-theme="dark">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="nav nav-underline p-2 m-auto mb-2 mb-lg-0">
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
                'heading': 'Anne Bernadette D. Yaoto',
                'subheading': 'Student | Web Developer | Programmer | Aspiring Game Developer',
                'profileImage': 'images/profilepic.png'
            },
            {
                'heading': 'About Me',
                'subheading': 'Personal Details',
                'text': {
                    'Birthdate': '8 August 2003',
                    'Age': new Date().getFullYear() - 2003, 
                    'Gender': 'Female',
                    'Country': 'Philippines 🇵🇭',
                    'Dducation': '4th year Bachelor of Science in Information Technology student from PUP - Sto. Tomas'
                },
                'link': 'about.html'
            },
            {
                'heading': 'Skills',
                'subheading': 'Technical Skills',
                'text': {
                    'Web Development': 'HTML, CSS, JavaScript, Bootstrap',
                    'Backend Development': 'PHP, API',
                    'Database Management': 'MySQL',
                    'Other Programming Languages': 'C, C++, C#, Java, Python'
                },
                'link': 'skills.html'
            },
            {
                'heading': 'Projects',
                'subheading': 'Finished and Ongoing Projects',
                'projects': [
                    {
                        'name': 'Valorant API v2',
                        'type': 'SAM Activity',
                        'link': 'projects/valorant_api_v2/index.html'
                    },
                    {
                        'name': 'Place Website',
                        'type': 'SAM Activity',
                        'link': 'projects/sam_act_02/index.html'
                    },
                    {
                        'name': 'Parallax',
                        'type': 'ADET Activity',
                        'link': 'projects/parallax/index.html'
                    }
                ],
                'link': 'projects.html'
            },
            {
                'heading': 'Contact',
                'subheading': 'Get in Touch',
                'contactInfo': {
                    'Email': 'annebernadetteyaoto@gmail.com',
                    'LinkedIn': 'https://www.linkedin.com/in/anne-bernadette-yaoto',
                    'Phone Number': '+63 965 231 5866'
                },
                'link': 'contact.html'
            }
        ]
    };

    var section = sections[page] || [];
    var container = document.getElementById('fullpage');
    container.innerHTML = "";

    section.forEach((sec, index) => {
        var content = "";

        if (index === 0 && sec.profileImage) {
            content += `
                <div class="text-center py-5">
                    <img src="${sec.profileImage}" class="rounded-circle img-fluid mb-3" alt="${sec.heading}" style="max-width: 200px;">
                    <h1 class="display-4">${sec.heading}</h1>
                    <p class="lead">${sec.subheading}</p>
                </div>`;
        } else if (sec.projects) {
            content += `<div class="row row-cols-1 row-cols-md-3 g-4">`;
            sec.projects.forEach(project => {
                content += `
                  <div class="col">
                    <div class="card h-100 bg-dark text-white border-light">
                      <div class="card-body">
                        <h5 class="card-title">${project.name}</h5>
                        <p class="card-text">${project.type}</p>
                      </div>
                      <div class="card-footer">
                        <a href="${project.link}" class="btn btn-primary">View Project</a>
                      </div>
                    </div>
                  </div>`;
            });
            content += `</div>`;
        } else if (sec.text) {
            for (var key in sec.text) {
                content += `<p><strong>${key}:</strong> ${sec.text[key]}</p>`;
            }
        } else if (sec.contactInfo) {
            for (var key in sec.contactInfo) {
                content += `<p><strong>${key}:</strong> <a href="${key === 'email' ? 'mailto:' + sec.contactInfo[key] : sec.contactInfo[key]}" target="_blank">${sec.contactInfo[key]}</a></p>`;
            }
        }

        container.innerHTML += `
          <div class="section py-5">
            <div class="container text-white">
              ${index !== 0 ? `<h1 class="mb-4">${sec.heading}</h1>` : ''} 
              ${index !== 0 ? `<h3>${sec.subheading || ''}</h3>` : ''} 
              ${content}
              ${sec.link ? `<a href="${sec.link}" class="btn btn-primary mt-3">Learn More</a>` : ''}
            </div>
          </div>
        `;
    });
}



