document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

var headers = [
    "Error 404 Website", 
    "Mentalk", 
    "Object-Oriented Programming Midterm Website", 
    "Parallax", 
    "PUP Website", 
    "The Coffee Bud", 
    "The Coffee Bud (Starbucks)", 
    "The Searcher Website", 
    "UnlockIT", 
    "Valorant API"
];

var descriptions = [
    "An error 404 website created as an activity for Applications Development and Emerging Technologies.", 
    "A full-fledged website created as the final requirement for Web Development and Database Administration.",
    "A basic HTML website created as a midterm requirement for Object-Oriented Programming", 
    "A parallax website created as an activity for Applications Development and Emerging Technologies.", 
    "A basic HTML website created as a school activity.", 
    "A front-end website created as an activity for Web Development.", 
    "A responsive front-end website created as the midterm requirement for Web Development.", 
    "A full-fledged website created as a final requirement for Systems Analysis and Design.",
    "A full-fledged website created as a final requirement for Object-Oriented Programming and Information Management.",
    "An API website created as an activity for Web Development."
];

var dates = [
    "13 July 2024",
    "07 February 2024",
    "Unknown",
    "13 July 2024",
    "Unknown",
    "26 November 2023",
    "13 December 2023",
    "26 June 2024",
    "Unknown",
    "22 January 2024"
];

var links = [
    "https://annebernadetteyaoto.github.io/projects/error_404/",
    "https://github.com/itsdamnrj/MENTALK-REPO",
    "https://annebernadetteyaoto.github.io/projects/oop_midterm_website/",
    "https://annebernadetteyaoto.github.io/projects/parallax/",
    "https://annebernadetteyaoto.github.io/projects/pup_website/",
    "https://annebernadetteyaoto.github.io/projects/the_coffee_bud/",
    "https://annebernadetteyaoto.github.io/projects/the_coffee_bud_starbucks/",
    "#",
    "#",
    "https://annebernadetteyaoto.github.io/projects/valorant_api/"
];

for (var i = 0; i < headers.length; i++) {
    var container = document.getElementById("container");
    container.innerHTML += `
        <div class="col-12 col-md-6 col-lg-4 col-xl-3">
            <div class="card my-3 h-100" id="card${i}" onmouseenter="addShadow('card${i}')" onmouseleave="removeShadow('card${i}')">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${headers[i]}</h5>
                    <p class="card-text">${descriptions[i]}</p>
                    <p class="card-text"><small class="text-muted">Date finished: ${dates[i]}</small></p>
                    <a href="${links[i]}" class="btn btn-primary mt-auto" target="_blank">View Project</a>
                </div>
            </div>
        </div>
    `;
}
