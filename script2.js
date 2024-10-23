var headers = [
    "Bootstrap Website",
    "Error 404 Website", 
    "Mentalk", 
    "Personal Website", 
    "Parallax", 
    "PUP Website", 
    "The Coffee Bud", 
    "The Coffee Bud (Starbucks)", 
    "The Searcher Website", 
    "UnlockIT", 
    "Valorant API"
];

var features = [
    "HTML, CSS, JavaScript, Bootstrap, Responsive",
    "HTML, CSS, JavaScript", 
    "HTML, CSS, JavaScript, PHP, Responsive",
    "HTML", 
    "HTML, CSS, JavaScript", 
    "HTML", 
    "HTML, CSS, JavaScript", 
    "HTML, CSS, JavaScript, Responsive", 
    "HTML, CSS, JavaScript, PHP, Bootstrap, Reponsive",
    "HTML, CSS, JavaScript, PHP",
    "HTML, CSS, JavaScript, API"
]

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

var type = [
    "SAM Activity",
    "ADET Activity",
    "WD and DA Finals",
    "OOP Midterms",
    "ADET Activity",
    "HCI Activity",
    "WD Activity",
    "WD Activity",
    "SAD Finals",
    "OOP and IM Finals",
    "WD Activity"
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

function getBadgeClass(feature) {
    switch (feature.toLowerCase()) {
        case 'html':
            return 'bg-danger';  
        case 'css':
            return 'bg-primary';  
        case 'javascript':
            return 'bg-warning';  
        case 'bootstrap':
            return 'bg-success';  
        case 'php':
            return 'bg-info';     
        case 'responsive':
            return 'bg-secondary'; 
        case 'api':
            return 'bg-dark';     
        default:
            return 'bg-light';   
    }
}

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

    var featureList = features[i].split(', ');
    var badges = featureList.map(feature => {
        var className = getBadgeClass(feature.trim());
        return `<span class="badge rounded-pill ${className} me-1">${feature.trim()}</span>`;
    }).join('');

    container.innerHTML += `
        <div class="col-12 col-md-6 col-lg-4 col-xl-3">
            <div class="card my-3 h-100">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${headers[i]}</h5>
                    <div class="mt-2">${badges}</div>
                    <div class="mt-auto">
                        <div class="row m-auto">
                            <span class="badge rounded-pill text-bg-${badgeClass}" style="width: fit-content;">${stage[i]}</span>
                        </div>
                        <div class="row">
                            <small class="card-text mb-1">Type: ${type[i]}</small>
                        </div>
                        <div class="row">
                            <small class="card-text mb-1">Date updated: ${dates[i]}</small>
                        </div>
                    </div>
                    <a href="${links[i]}" class="btn btn-primary mt-2" target="_blank">View Project</a>
                </div>
            </div>
        </div>
    `;
}
