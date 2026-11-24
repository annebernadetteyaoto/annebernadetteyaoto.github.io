
const colors = {
    "Controller": "#CBC3E3",
    "Duelist": "#FDDFDF",
    "Initiator": "#DEF3FD",
    "Sentinel": "#FCF7DE"
};

const container = document.getElementById("agentContainer");
const searchInput = document.getElementById("searchInput");
const searchCategory = document.getElementById("searchCategory");

let agentsList = [];

// Fetch agents
const fetchAgents = async () => {
    try {
        const response = await fetch(
            'https://valorant-api.com/v1/agents?isPlayableCharacter=true'
        );

        const data = await response.json();

        agentsList = data.data.sort((a, b) =>
            a.displayName.localeCompare(b.displayName)
        );

        displayAgents(agentsList);

    } catch (error) {
        console.error("Error fetching agents:", error);
        container.innerHTML = "<p>Error loading agents.</p>";
    }
};


// Display agents
const displayAgents = (agents) => {

    container.innerHTML = "";

    if (agents.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center my-5">
                <h4>No agents found.</h4>
            </div>
        `;
        return;
    }

    agents.forEach(agent => {

        const roleColor = colors[agent.role.displayName] || "lightgray";

        const content = `
            <div class="col-12 col-md-6 col-lg-4">
                <a href="view.html?displayName=${encodeURIComponent(agent.displayName)}"
                    class="agent-link">

                    <div class="card rounded-5 shadow p-4 my-3
                        d-flex flex-row justify-content-start align-items-center">

                        <div class="imgContainer"
                            style="background-color:${roleColor};">

                            <img src="${agent.displayIcon}"
                                alt="${agent.displayName}">
                        </div>

                        <div class="ps-4">
                            <h2 class="h4 mb-2">${agent.displayName}</h2>

                            <span class="badge rounded-pill"
                                style="background-color:${roleColor}; color:black;">
                                ${agent.role.displayName}
                            </span>
                        </div>

                    </div>
                </a>
            </div>
        `;

        container.innerHTML += content;
    });
};


// Search functionality
const handleSearch = () => {

    const searchTerm = searchInput.value.toLowerCase().trim();
    const category = searchCategory.value;

    const filteredAgents = agentsList.filter(agent => {

        switch (category) {

            case "agents":
                return agent.displayName.toLowerCase().includes(searchTerm);

            case "role":
                return agent.role.displayName.toLowerCase().includes(searchTerm);

            default:
                return (
                    agent.displayName.toLowerCase().includes(searchTerm) ||
                    agent.role.displayName.toLowerCase().includes(searchTerm)
                );
        }
    });

    displayAgents(filteredAgents);
};


// Event listeners
searchInput.addEventListener("input", handleSearch);
searchCategory.addEventListener("change", handleSearch);


// Initialize
fetchAgents();
