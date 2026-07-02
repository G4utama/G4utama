fetch('pages/about.html').then(r => r.text()).then(html => {
    document.getElementById('about').innerHTML = html;
});

fetch('pages/university.html').then(r => r.text()).then(html => {
    document.getElementById('university').innerHTML = html;
});

fetch('pages/projects.html').then(r => r.text()).then(html => {
    document.getElementById('projects').innerHTML = html;
});

fetch('pages/sites.html').then(r => r.text()).then(html => {
    document.getElementById('sites').innerHTML = html;
});