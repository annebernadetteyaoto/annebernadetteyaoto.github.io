
const title = document.getElementById("title");
const agentImage = document.getElementById("agentImage");
const agentRole = document.getElementById("agentRole");
const agentDesc = document.getElementById("description");

const regularAbilities = document.getElementById("regularAbilities");
const ultimateAbility = document.getElementById("ultimateAbility");
const passiveAbility = document.getElementById("passiveAbility");
const passiveGroup = document.getElementById("passiveGroup");


// Display agent background

const setAgentBackground = (agent) => {
    const gradientColors = agent.backgroundGradientColors || [];

    if (gradientColors.length > 0) {
        const colors = gradientColors.map(color => `#${color}`);

        document.documentElement.style.setProperty(
            "--agent-gradient",
            `linear-gradient(135deg, ${colors.join(", ")})`
        );

        document.documentElement.style.setProperty(
            "--agent-color-1",
            colors[0]
        );

        document.documentElement.style.setProperty(
            "--agent-color-2",
            colors[1] || colors[0]
        );
    }

    if (agent.background) {
        document.documentElement.style.setProperty(
            "--agent-background",
            `url("${agent.background}")`
        );
    }
};


/* =========================
   PORTRAIT PARALLAX
========================= */

const portrait = document.getElementById("agentImage");

let ticking = false;

window.addEventListener("scroll", () => {
    if (ticking) return;

    window.requestAnimationFrame(() => {
        const scrollPosition = window.scrollY;

        // Move the portrait more slowly than the page
        const offset = Math.min(scrollPosition * 0.08, 35);

        portrait.style.setProperty(
            "--parallax-y",
            `${offset}px`
        );

        ticking = false;
    });

    ticking = true;
});

// Display individual ability
const createAbility = (ability) => {
    const isPassive = ability.slot === "Passive";

    const icon = !isPassive && ability.displayIcon
        ? `<div class="iconContainer">
                <img src="${ability.displayIcon}"
                    alt="${ability.displayName} icon">
           </div>`
        : "";

    return `
        <div class="ability">

            <div class="ability-header">
                ${icon}
                <div class="name">${ability.displayName}</div>
            </div>

            <div class="description">
                ${ability.description || "No description available."}
            </div>

        </div>
    `;
};

// Fetch agent
const getAgent = async (uuid) => {

    try {

        const response = await fetch(
            "https://valorant-api.com/v1/agents?isPlayableCharacter=true"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch agent data");
        }

        const data = await response.json();

        const agent = data.data.find(a => a.uuid === uuid);

        if (!agent) {
            title.textContent = "Agent not found!";
            return;
        }

        // Agent information
        title.textContent = agent.displayName;

        agentImage.src = agent.fullPortrait;
        agentImage.alt = agent.displayName;

        agentRole.textContent = agent.role.displayName;
        agentRole.classList.add(agent.role.displayName.toLowerCase());

        agentDesc.textContent = agent.description;

        // Individual background
        setAgentBackground(agent);


        // Ability ordering
        const abilityOrder = [
            "Grenade",
            "Ability1",
            "Ability2",
            "Ultimate",
            "Passive"
        ];

        const sortedAbilities = [...agent.abilities].sort(
            (a, b) =>
                abilityOrder.indexOf(a.slot) -
                abilityOrder.indexOf(b.slot)
        );


        // Group abilities
        const regular = sortedAbilities.filter(ability =>
            ["Grenade", "Ability1", "Ability2"].includes(ability.slot)
        );

        const ultimate = sortedAbilities.filter(
            ability => ability.slot === "Ultimate"
        );

        const passive = sortedAbilities.filter(
            ability => ability.slot === "Passive"
        );


        // Display regular abilities
        regularAbilities.innerHTML = regular
            .map(createAbility)
            .join("");


        // Display ultimate
        ultimateAbility.innerHTML = ultimate
            .map(createAbility)
            .join("");


        // Display passive if available
        if (passive.length > 0) {

            passiveAbility.innerHTML = passive
                .map(createAbility)
                .join("");

            passiveGroup.hidden = false;

        } else {

            passiveGroup.hidden = true;

        }

    } catch (error) {

        console.error("Error fetching agent:", error);
        title.textContent = "Error loading agent data!";

    }
};


// Load selected agent
const loadData = () => {

    const urlParameters = new URLSearchParams(
        window.location.search
    );

    const uuid = urlParameters.get("uuid");

    if (uuid) {
        getAgent(uuid);
    } else {
        title.textContent = "No agent selected!";
    }

};

document.getElementById("currentYear").textContent =
    new Date().getFullYear();

loadData();
