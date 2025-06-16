document.addEventListener('DOMContentLoaded', function () {
    // Landing Page
    const getStartedBtn = document.getElementById('getStartedBtn');
    if (getStartedBtn) {
        getStartedBtn.onclick = function() {
            document.getElementById('landing').classList.add('hidden');
            document.getElementById('main-content').classList.remove('hidden');
        };
    }

    // Navigation & Home page 
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('.section');
    const viewAllProjectsLink = document.querySelector('.view-all-link');

    function showSection(id) {
        navLinks.forEach(l => l.classList.remove('active'));
        sections.forEach(sec => sec.classList.remove('active'));
        const target = document.getElementById(id);
        if (target) {
            target.classList.add('active');
            navLinks.forEach(l => {
                if (l.getAttribute('data-section') === id) l.classList.add('active');
            });
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showSection(this.getAttribute('data-section'));
        });
    });
    if (viewAllProjectsLink) {
        viewAllProjectsLink.addEventListener('click', function(e) {
            e.preventDefault();
            showSection('projects');
        });
    }

    // Dark Mode Toggle
    const darkToggle = document.getElementById('darkModeToggle');
    if (darkToggle) {
        darkToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            if(document.body.classList.contains('dark-mode')) {
                darkToggle.textContent = '☀️';
            } else {
                darkToggle.textContent = '🌙';
            }
            if(window.localStorage) {
                localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode'));
            }
        });
        if(window.localStorage) {
            if(localStorage.getItem('dark-mode') === 'true') {
                document.body.classList.add('dark-mode');
                darkToggle.textContent = '☀️';
            }
        }
    }

    //Project Cards
    const expandingCards = document.querySelectorAll('.expanding-card');
    expandingCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!card.classList.contains('expanded')) {
                
                expandingCards.forEach(c => c.classList.remove('expanded'));
                card.classList.add('expanded');
            } else {
                card.classList.remove('expanded');
            }
        });
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
 
    document.addEventListener('click', function(e) {
        if (![...expandingCards].some(card => card.contains(e.target))) {
            expandingCards.forEach(card => card.classList.remove('expanded'));
        }
    });

    const contactForm = document.getElementById('contactForm');
    const contactAlert = document.getElementById('contactAlert');
    if (contactForm && contactAlert) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const message = document.getElementById('contactMessage').value.trim();

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!name || !email || !message) {
                contactAlert.textContent = "Please fill in all fields.";
                contactAlert.className = "contact-alert error";
                return;
            }
            if (!emailRegex.test(email)) {
                contactAlert.textContent = "Please enter a valid email address.";
                contactAlert.className = "contact-alert error";
                return;
            }
            
            contactAlert.textContent = "Your message has been sent! Thank you.";
            contactAlert.className = "contact-alert success";
            contactForm.reset();

            setTimeout(() => {
                contactAlert.textContent = "";
                contactAlert.className = "contact-alert";
            }, 3500);

            
        });
    }
});