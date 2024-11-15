var title = document.getElementById("title");
        var agentImage = document.getElementById("agentImage");
        var imgContainer = document.getElementById("imgContainer");
        var agentRole = document.getElementById("agentRole");
        var agentDesc = document.getElementById("description");
        var abilities = document.getElementById("abilities");

        const getAgent = async (agentName) => {
            try {
                const response = await fetch('https://valorant-api.com/v1/agents?isPlayableCharacter=true');
                const data = await response.json();
                const agent = data.data.find(a => a.displayName.toLowerCase() === agentName.toLowerCase());

                if (!agent) {
                    title.innerHTML = "Agent not found!";
                    return;
                }

                const abilitiesOrder = ['grenade', 'ability1', 'ability2', 'ultimate'];
                const sortedAbilities = agent.abilities.sort((a, b) => {
                    return abilitiesOrder.indexOf(a.slot.toLowerCase()) - abilitiesOrder.indexOf(b.slot.toLowerCase());
                });

                const abilitiesWithoutPassive = agent.abilities.filter(ability => ability.slot !== "Passive");

                const abilitiesHTML = abilitiesWithoutPassive.map(ability => `
                    <div class="ability">
                        <div class="iconContainer">
                            <img src="${ability.displayIcon}" alt="${ability.displayName} icon" class="img-fluid" />
                        </div>
                        <div class="name">${ability.displayName}</div>
                        <div class="description">${ability.description || "No description available"}</div>
                    </div>
                `).join('');


                title.innerHTML = agent.displayName;
                agentImage.src = agent.fullPortrait;
                agentImage.alt = agent.displayName;
                imgContainer.style.backgroundColor = colors[agent.role.displayName] || "lightgray";
                agentRole.style.backgroundColor = colors[agent.role.displayName] || "lightgray";
                agentRole.innerHTML = agent.role.displayName;
                agentDesc.innerHTML = agent.description;
                abilities.innerHTML = abilitiesHTML;
            } catch (error) {
                console.error("Error fetching agent data:", error);
                title.innerHTML = "Error loading data!";
            }
        };

        function loadData() {
            const urlParameters = new URLSearchParams(window.location.search);
            if (urlParameters.has("displayName")) {
                getAgent(urlParameters.get("displayName"));
            } else {
                title.innerHTML = "No agent selected!";
            }
        }

        loadData();