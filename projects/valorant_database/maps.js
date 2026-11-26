const mapContainer = document.getElementById("mapContainer");


// Get the number of sites from the tactical description
const getSiteCount = (description) => {

    if (!description) {
        return null;
    }

    const match = description.match(
        /([A-Z](?:\s*\/\s*[A-Z])*)\s*Sites?/i
    );

    if (!match) {
        return null;
    }

    return match[1].split("/").length;
};


// Display maps
const displayMaps = (maps) => {

    mapContainer.innerHTML = "";

    if (maps.length === 0) {
        mapContainer.innerHTML = `
            <div class="col-12 text-center my-5">
                <h4>No maps found.</h4>
            </div>
        `;
        return;
    }

    maps.forEach(map => {

        const siteCount = getSiteCount(map.tacticalDescription);

        const backgroundImage =
            map.premierBackgroundImage ||
            map.splash ||
            map.backgroundImage;

        const mapIcon =
            map.displayIcon ||
            map.listViewIcon;

        const coordinates = map.coordinates || "Unknown";

        const siteText = siteCount !== null
            ? `${siteCount} ${siteCount === 1 ? "Site" : "Sites"}`
            : "Not specified";

        const content = `
            <div class="col-12 col-lg-6 mb-4">

                <div class="map-card"
                    style="background-image: url('${backgroundImage || ""}');">

                    <div class="map-information">

                        <h3 class="map-name">
                            ${map.displayName}
                        </h3>

                        <div class="map-details">

                            <div class="map-detail">
                                <span class="map-label">
                                    Coordinates
                                </span>

                                <span class="map-value">
                                    ${coordinates}
                                </span>
                            </div>

                            <div class="map-detail">
                                <span class="map-label">
                                    Number of Sites
                                </span>

                                <span class="map-value">
                                    ${siteText}
                                </span>
                            </div>

                        </div>

                    </div>

                    <div class="map-icon-container">
                        ${mapIcon ? `
                            <img src="${mapIcon}"
                                alt="${map.displayName} map icon"
                                class="map-icon">
                        ` : ""}
                    </div>

                </div>

            </div>
        `;

        mapContainer.insertAdjacentHTML("beforeend", content);
    });
};


// Fetch maps
const fetchMaps = async () => {

    try {

        const response = await fetch(
            "https://valorant-api.com/v1/maps"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch maps");
        }

        const data = await response.json();

        // Keep only main maps
        const mainMaps = data.data.filter(map =>
            map.tacticalDescription
        );

        // Sort alphabetically
        const sortedMaps = mainMaps.sort((a, b) =>
            a.displayName.localeCompare(b.displayName)
        );

        displayMaps(sortedMaps);

    } catch (error) {

        console.error("Error fetching maps:", error);

        mapContainer.innerHTML = `
            <div class="col-12 text-center my-5">
                <h4>Error loading maps.</h4>
                <p>Please try again later.</p>
            </div>
        `;

    }
};


// Current year
document.getElementById("currentYear").textContent =
    new Date().getFullYear();


// Initialize
fetchMaps();
