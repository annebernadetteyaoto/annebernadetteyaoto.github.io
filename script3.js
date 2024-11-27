var currentPage = window.location.pathname.split("/").pop();

function generateNavbar() {
    var navbar = document.getElementById("navbar");
    var pages = {
        "index2.html": "Home",
        "about.html": "About Me",
        "skills.html": "Skills",
        "projects.html": "Projects",
        "contact.html": "Contact"
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
        "index2.html": [
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
                    'Age': new Date().getFullYear() - 2003, // Dynamic age calculation
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
                        'name': 'JUANGPT',
                        'description': 'Conversational AI for accessing demographic data.',
                        'link': 'projects/juangpt.html'
                    },
                    {
                        'name': 'Study Game',
                        'description': 'Web-based educational game with multiple-choice questions.',
                        'link': 'projects/study-game.html'
                    },
                    {
                        'name': 'Portfolio Website',
                        'description': 'Personal website showcasing skills and projects.',
                        'link': 'projects/portfolio.html'
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
    container.innerHTML = ""; // Clear previous content

    section.forEach((sec, index) => {
        var content = "";

        // Handle the profile section (index === 0)
        if (index === 0 && sec.profileImage) {
            content += `
                <div class="text-center py-5">
                    <img src="${sec.profileImage}" class="rounded-circle img-fluid mb-3" alt="${sec.heading}" style="max-width: 200px;">
                    <h1 class="display-4">${sec.heading}</h1>
                    <p class="lead">${sec.subheading}</p>
                </div>`;
        } else if (sec.projects) {
            // Handle the projects section
            content += `<div class="row row-cols-1 row-cols-md-3 g-4">`;
            sec.projects.forEach(project => {
                content += `
                  <div class="col">
                    <div class="card h-100 bg-dark text-white border-light">
                      <img src="${project.image}" class="card-img-top" alt="${project.name}">
                      <div class="card-body">
                        <h5 class="card-title">${project.name}</h5>
                        <p class="card-text">${project.description}</p>
                      </div>
                      <div class="card-footer">
                        <a href="${project.link}" class="btn btn-light">View Project</a>
                      </div>
                    </div>
                  </div>`;
            });
            content += `</div>`;
        } else if (sec.text) {
            // Handle the text content for About Me and Skills sections
            for (var key in sec.text) {
                content += `<p><strong>${key}:</strong> ${sec.text[key]}</p>`;
            }
        } else if (sec.contactInfo) {
            // Handle the contact info section
            for (var key in sec.contactInfo) {
                content += `<p><strong>${key}:</strong> <a href="${key === 'email' ? 'mailto:' + sec.contactInfo[key] : sec.contactInfo[key]}" target="_blank">${sec.contactInfo[key]}</a></p>`;
            }
        }

        // Add content to container
        container.innerHTML += `
          <div class="section py-5">
            <div class="container text-white">
              ${index !== 0 ? `<h1 class="mb-4">${sec.heading}</h1>` : ''} 
              ${index !== 0 ? `<h3>${sec.subheading || ''}</h3>` : ''} 
              ${content}
              ${sec.link ? `<a href="${sec.link}" class="btn btn-light mt-3">Learn More</a>` : ''}
            </div>
          </div>
        `;
    });
}



