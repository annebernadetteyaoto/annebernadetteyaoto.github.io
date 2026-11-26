const weaponContainer = document.getElementById("weaponContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

let weaponsList = [];


// Weapon category order
const categoryOrder = [
    "Melee",
    "Sidearm",
    "SMG",
    "Shotgun",
    "Rifle",
    "Sniper",
    "Heavy"
];


// Convert API category into a readable name
const getCategoryName = (category) => {

    if (!category) {
        return "Other";
    }

    return category.split("::").pop();
};


// Get category sorting position
const getCategoryPosition = (weapon) => {

    const category = getCategoryName(weapon.category);

    const position = categoryOrder.indexOf(category);

    return position === -1
        ? categoryOrder.length
        : position;
};


// Get weapon price
const getWeaponPrice = (weapon) => {

    // Melee weapons do not have a shop price
    if (getCategoryName(weapon.category) === "Melee") {
        return null;
    }

    const cost = weapon.shopData?.cost;

    if (cost === undefined || cost === null) {
        return null;
    }

    return cost;
};


// Format weapon price
const formatPrice = (weapon) => {

    const price = getWeaponPrice(weapon);

    if (price === null) {
        return "";
    }

    return `${price.toLocaleString("en-US")} Credits`;
};


// Create category options
const populateCategories = () => {

    const categories = [
        ...new Set(
            weaponsList.map(weapon =>
                getCategoryName(weapon.category)
            )
        )
    ].sort((a, b) => {

        const positionA = categoryOrder.indexOf(a);
        const positionB = categoryOrder.indexOf(b);

        return (positionA === -1 ? categoryOrder.length : positionA) -
            (positionB === -1 ? categoryOrder.length : positionB);
    });

    categories.forEach(category => {

        const option = document.createElement("option");

        option.value = category;
        option.textContent = category;

        categoryFilter.appendChild(option);
    });
};


// Sort weapons by category, then price
const sortWeapons = (weapons) => {

    return [...weapons].sort((a, b) => {

        // First: category order
        const categoryDifference =
            getCategoryPosition(a) - getCategoryPosition(b);

        if (categoryDifference !== 0) {
            return categoryDifference;
        }

        // Second: price, lowest to highest
        const priceA = getWeaponPrice(a);
        const priceB = getWeaponPrice(b);

        // Weapons without a price go last within their category
        if (priceA === null && priceB !== null) return 1;
        if (priceA !== null && priceB === null) return -1;

        if (priceA !== null && priceB !== null) {
            if (priceA !== priceB) {
                return priceA - priceB;
            }
        }

        // Third: alphabetical order for equal prices
        return a.displayName.localeCompare(b.displayName);
    });
};


// Display weapons
const displayWeapons = () => {

    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;

    const filteredWeapons = weaponsList.filter(weapon => {

        const name = weapon.displayName.toLowerCase();
        const category = getCategoryName(weapon.category);

        const matchesSearch = name.includes(searchTerm);

        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    const sortedWeapons = sortWeapons(filteredWeapons);

    weaponContainer.innerHTML = "";

    if (sortedWeapons.length === 0) {

        weaponContainer.innerHTML = `
            <div class="col-12 text-center my-5">
                <h4>No weapons found.</h4>
            </div>
        `;

        return;
    }

    sortedWeapons.forEach(weapon => {

        const category = getCategoryName(weapon.category);
        const price = formatPrice(weapon);
        const image = weapon.displayIcon || "";

        const content = `
            <div class="col-12 col-md-6 col-lg-4 mb-3">

                <a href="weapon.html?uuid=${encodeURIComponent(weapon.uuid)}"
                    class="weapon-link">

                    <div class="weapon-card">

                        <div class="weapon-image-container">

                            ${image ? `
                                <img src="${image}"
                                    alt="${weapon.displayName}"
                                    class="weapon-image">
                            ` : ""}

                        </div>

                        <div class="weapon-information">

                            <h3 class="weapon-name">
                                ${weapon.displayName}
                            </h3>

                            <span class="weapon-category">
                                ${category}
                            </span>

                            ${price ? `
                                <span class="weapon-price">
                                    ${price}
                                </span>
                            ` : ""}

                        </div>

                    </div>

                </a>

            </div>
        `;

        weaponContainer.insertAdjacentHTML("beforeend", content);
    });
};


// Fetch weapons
const fetchWeapons = async () => {

    try {

        const response = await fetch(
            "https://valorant-api.com/v1/weapons"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch weapons");
        }

        const data = await response.json();

        weaponsList = data.data;

        populateCategories();
        displayWeapons();

    } catch (error) {

        console.error("Error fetching weapons:", error);

        weaponContainer.innerHTML = `
            <div class="col-12 text-center my-5">
                <h4>Error loading weapons.</h4>
                <p>Please try again later.</p>
            </div>
        `;

    }
};


// Search and filter events
searchInput.addEventListener("input", displayWeapons);
categoryFilter.addEventListener("change", displayWeapons);


// Current year
document.getElementById("currentYear").textContent =
    new Date().getFullYear();


// Initialize
fetchWeapons();