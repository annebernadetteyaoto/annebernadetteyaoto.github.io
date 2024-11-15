const colors = {
    "Controller": "#CBC3E3",
    "Duelist": "#FDDFDF",
    "Initiator": "#DEF3FD",
    "Sentinel": "#FCF7DE"
};

let container = document.getElementById("agentContainer");
let agentsList = [];
let page = 1;
const perPageCount = 10;

 
const fetchAgents = async () => {
    const response = await fetch('https://valorant-api.com/v1/agents?isPlayableCharacter=true');
    const data = await response.json();
    agentsList = data.data.sort((a, b) => a.displayName.localeCompare(b.displayName));  
        displayAgents();  
};

 
const displayAgents = () => {
    container.innerHTML = "";  
    const start = (page - 1) * perPageCount;
    const end = start + perPageCount;

    agentsList.slice(start, end).forEach(agent => {
        const content = `
        <div class="col-12">
            <a href="view.html?displayName=${agent.displayName}" style="text-decoration:none;">
                <div class="card rounded-5 shadow p-4 my-3 d-flex flex-row justify-content-start align-items-center">
                    <div class="imgContainer" style="background-color:${colors[agent.role.displayName] || 'lightgray'};">
                        <img src="${agent.displayIcon}" alt="${agent.displayName}">
                    </div>
                    <div class="ps-5 h2">${agent.displayName}</div>
                    <div class="ms-5">
                        <span class="badge rounded-pill" style="background-color:${colors[agent.role.displayName] || 'lightgray'}; color:black;">
                            ${agent.role.displayName}
                        </span>
                    </div>
                </div>
            </a>
        </div>`;
        container.innerHTML += content;
    });
};

 
const nextPage = () => {
    if (page * perPageCount < agentsList.length) {
        page++;
        displayAgents();
    }
};

const prevPage = () => {
    if (page > 1) {
        page--;
        displayAgents();
    }
};

document.getElementById("nextButton").addEventListener("click", nextPage);
document.getElementById("prevButton").addEventListener("click", prevPage);


fetchAgents();
