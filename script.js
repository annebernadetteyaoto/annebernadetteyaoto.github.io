const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach(link =>
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}

const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}


async function loadProjects() {
  console.log("Loading projects...");

  const container = document.querySelector("#project-container");
  console.log("Container found:", container);

  if (!container) {
    console.error("Project container not found!");
    return;
  }

  try {
    console.log("Fetching JSON...");

    const response = await fetch("assets/projects.json");
    console.log("Response:", response);

    if (!response.ok) {
      throw new Error("Could not load project data.");
    }

    const data = await response.json();
    console.log("JSON data:", data);

    let projects = data.projects;
    const view = container.dataset.view;

    if (view === "featured") {
      projects = projects
        .filter(project => project.featured)
        .slice(0, 3);
    }

    container.innerHTML = projects.map((project, index) => {
      const features = project.features
        .map(feature => `<span>${feature}</span>`)
        .join("");

      const demoLink = project.demo
        ? `<a href="${project.demo}" target="_blank" rel="noopener noreferrer">Live demo ↗</a>`
        : "";

      const githubLink = project.github
        ? `<a href="${project.github}" target="_blank" rel="noopener noreferrer">Source code ↗</a>`
        : "";

      const links = [demoLink, githubLink].filter(Boolean).join("");

      const stageClass = project.stage.toLowerCase() === "finished"
        ? "status-finished"
        : project.stage.toLowerCase() === "unfinished"
          ? "status-unfinished"
          : "status-revision";

      return `
                <article class="project-card">
                    <div class="project-visual">
                        <span class="visual-label">
                            ${String(index + 1).padStart(2, "0")} / ${project.type}
                        </span>
                        <img src="${project.image}" alt="${project.header}" loading="lazy">
                    </div>

                    <div class="project-info">
                        <div>
                            <p class="project-type">${project.type}</p>
                            <h3>${project.header}</h3>
                            <p>${project.description}</p>
                        </div>

                        <div class="tags">${features}</div>

                        <div class="project-status">
                            <span class="${stageClass}">${project.stage}</span>
                            <span>${project.date}</span>
                        </div>

                        ${links ? `<div class="project-links">${links}</div>` : ""}
                    </div>
                </article>
            `;
    }).join("");

    if (projects.length === 0) {
      container.innerHTML = "<p>No projects to display yet.</p>";
    }

  } catch (error) {
    console.error("Error loading projects:", error);
    container.innerHTML = "<p>Projects could not be loaded.</p>";
  }
}

loadProjects();