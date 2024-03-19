document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link action
            const href = this.getAttribute('href');

            fetch(href)
                .then(response => response.text())
                .then(html => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    const newMain = doc.querySelector('main');

                    // Replace the main content
                    document.querySelector('main').innerHTML = newMain.innerHTML;

                    // Update the browser's address bar
                    window.history.pushState(null, '', href);
                })
                .catch(error => {
                    console.error('Error fetching the page: ', error);
                });
        });
    });

    window.addEventListener('popstate', () => {
        window.location.reload();
    });
});
