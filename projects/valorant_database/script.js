
const container = document.getElementById("agentContainer");
const searchInput = document.getElementById("searchInput");
const searchCategory = document.getElementById("searchCategory");
const sortCategory = document.getElementById("sortCategory");

let agentsList = [];

const colors = {
    Controller: "#CBC3E3",
    Duelist: "#FDDFDF",
    Initiator: "#DEF3FD",
    Sentinel: "#FCF7DE"
};


// Fetch agents
const fetchAgents = async () => {
    try {
        const response = await fetch(
            "https://valorant-api.com/v1/agents?isPlayableCharacter=true"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch agents");
        }

        const data = await response.json();

        agentsList = data.data;

        displayAgents();

    } catch (error) {
        console.error(error);
        container.innerHTML = `
            <p class="text-center">Error loading agents.</p>
        `;
    }
};


// Sort agents
const sortAgents = (agents) => {

    const sorted = [...agents];

    switch (sortCategory.value) {

        case "nameAsc":
            sorted.sort((a, b) =>
                a.displayName.localeCompare(b.displayName)
            );
            break;

        case "nameDesc":
            sorted.sort((a, b) =>
                b.displayName.localeCompare(a.displayName)
            );
            break;

        case "roleAsc":
            sorted.sort((a, b) =>
                a.role.displayName.localeCompare(b.role.displayName) ||
                a.displayName.localeCompare(b.displayName)
            );
            break;

        case "roleDesc":
            sorted.sort((a, b) =>
                b.role.displayName.localeCompare(a.role.displayName) ||
                a.displayName.localeCompare(b.displayName)
            );
            break;
    }

    return sorted;
};


// Display agents

// Display agents
const displayAgents = () => {

    const searchTerm = searchInput.value.toLowerCase().trim();
    const category = searchCategory.value;

    const filteredAgents = agentsList.filter(agent => {

        const name = agent.displayName.toLowerCase();
        const role = agent.role.displayName.toLowerCase();

        switch (category) {

            case "agents":
                return name.includes(searchTerm);

            case "role":
                return role.includes(searchTerm);

            default:
                return (
                    name.includes(searchTerm) ||
                    role.includes(searchTerm)
                );
        }
    });

    const sortedAgents = sortAgents(filteredAgents);

    container.innerHTML = "";

    if (sortedAgents.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center my-5">
                <h4>No agents found.</h4>
            </div>
        `;
        return;
    }

    sortedAgents.forEach(agent => {

        // Get the agent's first gradient color
        const iconColor = agent.backgroundGradientColors?.[0]
            ? `#${agent.backgroundGradientColors[0]}`
            : "#383838";

        const content = `
            <div class="col-12 col-md-6 col-lg-4 mb-3">

                <a href="view.html?uuid=${encodeURIComponent(agent.uuid)}"
                    class="agent-link">

                    <div class="card agent-card rounded-4 shadow p-3
                        d-flex flex-row align-items-center">

                        <div class="imgContainer"
                            style="background-color: ${iconColor};">
                            <img src="${agent.displayIcon}"
                                alt="${agent.displayName}">
                        </div>

                        <div class="ps-3">

                            <h3 class="h4 mb-2">
                                ${agent.displayName}
                            </h3>

                            <span class="badge rounded-pill agent-role ${agent.role.displayName.toLowerCase()}">
                                ${agent.role.displayName}
                            </span>

                        </div>

                    </div>

                </a>

            </div>
        `;

        container.insertAdjacentHTML("beforeend", content);
    });
};



// Search event listeners
searchInput.addEventListener("input", displayAgents);
searchCategory.addEventListener("change", displayAgents);
sortCategory.addEventListener("change", displayAgents);


// Navigation
const navigation = document.getElementById("mainNavigation");

navigation.addEventListener("click", (event) => {

    const button = event.target.closest("[data-section]");

    if (!button) return;

    // Remove active class
    navigation.querySelectorAll(".nav-link").forEach(link => {
        link.classList.remove("active");
    });

    button.classList.add("active");

    // Hide all sections
    document.querySelectorAll(
        "#agentsSection, .placeholder-section"
    ).forEach(section => {
        section.hidden = true;
    });

    // Show selected section
    const sectionName = button.dataset.section;
    const selectedSection = document.getElementById(
        sectionName + "Section"
    );

    selectedSection.hidden = false;
});

document.getElementById("currentYear").textContent =
    new Date().getFullYear();

// Initialize
fetchAgents();