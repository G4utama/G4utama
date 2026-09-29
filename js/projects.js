const projectHtml = (project) => `
    <div class="project">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-meta">
            <div class="project-tools">${iconsHtml(project.tools)}</div>
            ${project.repo ? `<a class="project-repo" href="${project.repo}" target="_blank" rel="noopener">\-\> repository</a>` : ''}
        </div>
    </div>
`;

const categoryHtml = (category) => `
    <section class="project-category">
        <h2>${category.name}</h2>
        <div class="project-list">
            ${category.projects.map(projectHtml).join('')}
        </div>
    </section>
`;

const createProjectsPage = async () => {
    const { categories } = await loadJsonData('data/projects.json');
    document.getElementById('projects-root').innerHTML = categories.map(categoryHtml).join('');
};

createProjectsPage();
