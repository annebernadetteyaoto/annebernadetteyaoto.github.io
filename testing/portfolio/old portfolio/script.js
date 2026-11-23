fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const projects = data.projects;

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

        projects.forEach((project, i) => {
            const container = document.getElementById("container");
            const badgeClass = project.stage.toLowerCase() === "finished" ? "success" : 
                project.stage.toLowerCase() === "unfinished" ? "danger" : "warning";

            const badges = project.features.map(feature => {
                const className = getBadgeClass(feature.trim());
                return `<span class="badge rounded-pill ${className} me-1">${feature.trim()}</span>`;
            }).join('');

            container.innerHTML += `
                <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                    <div class="card my-3 h-100">
                        <div class="imgcontainer">
                            <img src="${project.image}" class="cardimg card-img-top" alt="${project.header} image">
                        </div>
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${project.header}</h5>
                            <div class="mt-2">${badges}</div>
                            <div class="mt-auto">
                                <div class="row m-auto">
                                    <span class="badge rounded-pill text-bg-${badgeClass}" style="width: fit-content;">${project.stage}</span>
                                </div>
                                <div class="row">
                                    <small class="card-text mb-1">Type: ${project.type}</small>
                                </div>
                                <div class="row">
                                    <small class="card-text mb-1">Date updated: ${project.date}</small>
                                </div>
                            </div>
                            <a href="${project.link}" class="btn btn-primary mt-2" target="_blank">View Project</a>
                        </div>
                    </div>
                </div>
            `;
        });
    })
    .catch(error => console.error('Error fetching data:', error));