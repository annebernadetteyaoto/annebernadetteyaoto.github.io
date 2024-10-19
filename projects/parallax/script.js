const colors = {
	initiator: '#DEF3FD',
	sentinel: '#FCF7DE',
	duelist: '#FDDFDF',
	controller: '#CBC3E3',
};

const agent_container = document.getElementById('agent_container');
const agent_number = 23;
let agentsData;

const fetchAgents = async () => {
	const url = `https://valorant-api.com/v1/agents?isPlayableCharacter=true`;
	const res = await fetch(url);
	agentsData = await res.json();

	const sortedAgents = agentsData.data.sort((a, b) => {
		const roleComparison = a.role.displayName.localeCompare(b.role.displayName);
		if (roleComparison !== 0) {
			return roleComparison;
		}

		return a.displayName.localeCompare(b.displayName);
	});

	sortedAgents.forEach(agent => {
		createAgentCard(agent);
	});
};

function createAgentCard(agent) {
	const agentElement = document.createElement('div');
	agentElement.classList.add('agent');

	const name = agent.displayName;
	const desc = agent.description;
	const role = agent.role.displayName;

	agentElement.style.backgroundColor = colors[agent.role.displayName.toLowerCase()];

	const abilitiesOrder = ['grenade', 'ability1', 'ability2', 'ultimate'];
	const sortedAbilities = agent.abilities.sort((a, b) => {
		return abilitiesOrder.indexOf(a.slot.toLowerCase()) - abilitiesOrder.indexOf(b.slot.toLowerCase());
	});

	const abilitiesWithoutPassive = agent.abilities.filter(ability => ability.slot !== "Passive");

	const abilitiesHTML = abilitiesWithoutPassive.map(ability => `
	  <div class="ability" data-tooltip="${ability.displayName.toUpperCase()}">
		<img src="${ability.displayIcon}" alt="${ability.displayName.toUpperCase()} icon">
	  </div>
	`).join('');

	const agentInnerHTML = `
	  <div class="img-container">
		<img src="${agent.fullPortrait}">
	  </div>
	
	  <div class="info">
		<h3 class="name">${name}<br>${role}</h3>
		<p class="desc">${desc}</p>
		<h4>Abilities:</h4>
	  </div>

	  <div class="abilities">
		${abilitiesHTML}
	  </div>
	`;

	agentElement.innerHTML = agentInnerHTML;
	agent_container.appendChild(agentElement);
}

const searchInput = document.getElementById('searchInput');
const searchCategoryDropdown = document.getElementById('searchCategory'); // Added this line

searchInput.addEventListener('input', handleSearch);
searchCategoryDropdown.addEventListener('change', handleSearch);

function handleSearch() {
	const searchTerm = searchInput.value.toLowerCase();
	const searchCategory = searchCategoryDropdown.value.toLowerCase();

	const filteredAgents = agentsData.data.filter(agent => {
		switch (searchCategory) {
			case 'agents':
				return agent.displayName.toLowerCase().includes(searchTerm);
			case 'abilities':
				// Update the check for abilities
				return agent.abilities.some(ability => ability.displayName.toLowerCase().includes(searchTerm));
			case 'role':
				return agent.role.displayName.toLowerCase().includes(searchTerm);
			default:
				return (
					agent.displayName.toLowerCase().includes(searchTerm) ||
					agent.abilities.some(ability => ability.displayName.toLowerCase().includes(searchTerm)) ||
					agent.role.displayName.toLowerCase().includes(searchTerm)
				);
		}
	});

	agent_container.innerHTML = '';

	filteredAgents.forEach(agent => {
		createAgentCard(agent);
	});
}

const apiUrl = 'https://valorant-api.com/v1/agents?isPlayableCharacter=true';
const parallaxContainer = document.getElementById('parallax');
const speeds = [2, 5, 11, 16, 26, 36, 49, 69, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 400];

fetch(apiUrl)
	.then(response => response.json())
	.then(data => {
		const agents = data.data;
		agents.forEach((agent, index) => {
			if (index < 24) {
				const layer = document.createElement('div');
				layer.className = 'keyart_layer parallax';
				layer.id = `keyart-${index}`;
				layer.setAttribute('data-speed', speeds[index]);
				layer.style.backgroundImage = `url(${agent.fullPortrait})`;
				parallaxContainer.appendChild(layer);
			}
		});
	})
