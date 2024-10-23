var headers = [
    "Bootstrap Website",
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
    "A bootstrap website created as an activity for Systems Administration and Maintenance.",
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
    "19 October 2024",
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

var stage = [
    "Unfinished",
    "Finished",
    "Finished",
    "To be revised",
    "To be revised",
    "To be revised",
    "To be revised",
    "To be revised",
    "Unfinished",
    "To be revised",
    "Finished"
    ]

var links = [
    "https://annebernadetteyaoto.github.io/sam_act_02/",
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
    var badgeClass = "";
    if (stage[i] === "Finished") {
        badgeClass = "success";
    } else if (stage[i] === "Unfinished") {
        badgeClass = "danger";
    } else if (stage[i] === "To be revised") {
        badgeClass = "warning";
    }

    container.insertAdjacentHTML('beforeend', `
        <div class="col-12 col-md-6 col-lg-4 col-xl-3">
            <div class="card my-3 h-100" id="card${i}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${headers[i]}</h5>
                    <p class="card-text">${descriptions[i]}</p>
                    <p class="card-text">Date updated: ${dates[i]}</p>
                    <span class="badge rounded-pill text-bg-${badgeClass} justify-self-start">${stage[i]}</span>
                    <a href="${links[i]}" class="btn btn-primary mt-auto" target="_blank">View Project</a>
                </div>
            </div>
        </div>
    `);
}
