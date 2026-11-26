const weaponName = document.getElementById("weaponName");
const weaponImage = document.getElementById("weaponImage");
const weaponCategory = document.getElementById("weaponCategory");
const weaponPrice = document.getElementById("weaponPrice");

const weaponStats = document.getElementById("weaponStats");
const damageSection = document.getElementById("damageSection");
const damageRanges = document.getElementById("damageRanges");

const skinsToggle = document.getElementById("skinsToggle");
const skinsContainer = document.getElementById("skinsContainer");
const skinsList = document.getElementById("skinsList");
const skinsArrow = document.getElementById("skinsArrow");


// Convert API category into a readable name
const getCategoryName = (category) => {

    if (!category) {
        return "Other";
    }

    return category.split("::").pop();
};


// Format weapon price
const getWeaponPrice = (weapon) => {

    const cost = weapon.shopData?.cost;

    if (cost === undefined || cost === null) {
        return "";
    }

    return `${cost.toLocaleString("en-US")} Credits`;
};


// Format numerical values
const formatValue = (value, suffix = "") => {

    if (value === undefined || value === null) {
        return "N/A";
    }

    return `${value}${suffix}`;
};


// Create a stat card
const createStat = (label, value) => {

    return `
        <div class="stat-card">

            <span class="stat-label">
                ${label}
            </span>

            <span class="stat-value">
                ${value}
            </span>

        </div>
    `;
};


// Display weapon stats
const displayStats = (weapon) => {

    const stats = weapon.weaponStats;

    if (!stats) {

        weaponStats.innerHTML = `
            <p>Detailed stats are unavailable for this weapon.</p>
        `;

        damageSection.hidden = true;
        return;
    }

    const statsContent = [

        createStat(
            "Fire Rate",
            formatValue(stats.fireRate, " rounds/sec")
        ),

        createStat(
            "Magazine Size",
            formatValue(stats.magazineSize, " rounds")
        ),

        createStat(
            "Reload Time",
            formatValue(stats.reloadTimeSeconds, " sec")
        ),

        createStat(
            "Equip Time",
            formatValue(stats.equipTimeSeconds, " sec")
        ),

        createStat(
            "First Bullet Accuracy",
            formatValue(stats.firstBulletAccuracy, "°")
        ),

        createStat(
            "Wall Penetration",
            stats.wallPenetration
                ? stats.wallPenetration.split("::").pop()
                : "N/A"
        )

    ];

    weaponStats.innerHTML = statsContent.join("");

    displayDamageRanges(stats.damageRanges);
};


// Display damage ranges
const displayDamageRanges = (ranges) => {

    damageRanges.innerHTML = "";

    if (!ranges || ranges.length === 0) {

        damageSection.hidden = true;
        return;
    }

    damageSection.hidden = false;

    ranges.forEach(range => {

        const content = `
            <tr>

                <td>
                    ${range.rangeStartMeters} -
                    ${range.rangeEndMeters} m
                </td>

                <td>${range.headDamage}</td>

                <td>${range.bodyDamage}</td>

                <td>${range.legDamage}</td>

            </tr>
        `;

        damageRanges.insertAdjacentHTML("beforeend", content);
    });
};


// Display weapon skins
const displaySkins = (skins) => {

    skinsList.innerHTML = "";

    if (!skins || skins.length === 0) {

        skinsList.innerHTML = `
            <div class="col-12">
                <p>No skins available.</p>
            </div>
        `;

        return;
    }

    skins
        .filter(skin => skin.displayName !== "Random Favorite Skin")
        .sort((a, b) => a.displayName.localeCompare(b.displayName))
        .forEach(skin => {
            const image =
                skin.displayIcon ||
                skin.levels?.[0]?.displayIcon ||
                "";

            const content = `
            <div class="col-12 col-sm-6 col-lg-4 mb-3">

                <div class="skin-card">

                    <div class="skin-image-container">

                        ${image ? `
                            <img src="${image}"
                                alt="${skin.displayName}"
                                class="skin-image">
                        ` : `
                            <span class="text-secondary">
                                No image available
                            </span>
                        `}

                    </div>

                    <h3 class="skin-name">
                        ${skin.displayName}
                    </h3>

                </div>

            </div>
        `;

            skinsList.insertAdjacentHTML("beforeend", content);
        });
};


// Fetch selected weapon
const getWeapon = async (uuid) => {

    try {

        const response = await fetch(
            "https://valorant-api.com/v1/weapons"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch weapon data");
        }

        const data = await response.json();

        const weapon = data.data.find(item =>
            item.uuid === uuid
        );

        if (!weapon) {

            weaponName.textContent = "Weapon not found!";

            weaponStats.innerHTML = "";
            damageSection.hidden = true;

            return;
        }


        // Weapon information
        weaponName.textContent = weapon.displayName;

        weaponImage.src = weapon.displayIcon || "";
        weaponImage.alt = weapon.displayName;

        weaponImage.hidden = !weapon.displayIcon;

        weaponCategory.textContent =
            getCategoryName(weapon.category);

        weaponPrice.textContent = getWeaponPrice(weapon);


        // Weapon stats
        displayStats(weapon);


        // Weapon skins
        displaySkins(weapon.skins);

    } catch (error) {

        console.error("Error fetching weapon:", error);

        weaponName.textContent = "Error loading weapon data!";

        weaponStats.innerHTML = `
            <p>Please try again later.</p>
        `;

    }
};


// Toggle skins gallery
skinsToggle.addEventListener("click", () => {

    const isExpanded =
        skinsToggle.getAttribute("aria-expanded") === "true";

    skinsToggle.setAttribute(
        "aria-expanded",
        String(!isExpanded)
    );

    skinsContainer.hidden = isExpanded;

    skinsToggle.firstChild.textContent =
        isExpanded ? "Show Skins " : "Hide Skins ";

    skinsArrow.textContent = isExpanded ? "+" : "−";
});


// Load selected weapon
const loadWeapon = () => {

    const urlParameters = new URLSearchParams(
        window.location.search
    );

    const uuid = urlParameters.get("uuid");

    if (uuid) {

        getWeapon(uuid);

    } else {

        weaponName.textContent = "No weapon selected!";

        weaponStats.innerHTML = "";
        damageSection.hidden = true;

    }
};


// Current year
document.getElementById("currentYear").textContent =
    new Date().getFullYear();


// Initialize
loadWeapon();
