let currentSlideIndex = 0;
let slides = document.getElementsByClassName("slide");
let dots = document.getElementsByClassName("dot");

function showSlides(n) {
    if (n >= slides.length) n = 0;
    if (n < 0) n = slides.length - 1;
    currentSlideIndex = n;

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[currentSlideIndex].style.display = "block";
    dots[currentSlideIndex].className += " active";
}


function currentSlide(n) {
    showSlides(n - 1);
}


function moveSlide(n) {
    showSlides(currentSlideIndex += n);
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('year').textContent = new Date().getFullYear();
});

document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const firstName = contactForm.querySelector('[name="first_name"]').value;
        const lastName = contactForm.querySelector('[name="last_name"]').value;
        const email = contactForm.querySelector('[name="email"]').value;
        const phone = contactForm.querySelector('[name="phone"]').value;
        const message = contactForm.querySelector('[name="message"]').value;

        if (!firstName || !lastName || !email || !phone || !message) {
            alert('Wypełnij wszystkie wymagane pola.');
        } else {
            // Ukrycie komunikatu o błędzie
            const emailErrorMessage = contactForm.querySelector('.validation-message');
            emailErrorMessage.style.display = 'none';

            // Wyświetlenie komunikatu po udanym wysłaniu
            successMessage.style.display = 'block';
            contactForm.reset();
        }
    });
});

//karuzela2
document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector('.carousel2');
    const items = carousel.querySelectorAll('.carousel-item');
    const itemCount = items.length;

    let currentItem = 0;

    // Funkcja do przewijania karuzeli
    function scrollCarousel() {
        // Przesuwanie karuzeli o szerokość jednego elementu
        carousel.scrollBy({ left: items[0].offsetWidth, top: 0, behavior: 'smooth' });

        currentItem = (currentItem + 1) % itemCount;

        if (currentItem === 0) {
            setTimeout(() => {
                carousel.scrollTo({ left: 0, top: 0, behavior: 'auto' });
            }, 500);
        }
    }

    function startCarousel() {
        interval = setInterval(scrollCarousel, 1800);
    }

    // Zatrzymanie przewijania karuzeli
    function stopCarousel() {
        clearInterval(interval);
    }


    items.forEach(item => {
        item.addEventListener('mouseenter', stopCarousel);
        item.addEventListener('mouseleave', startCarousel);
    });

    startCarousel();


});
document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById("privacyPolicyModal");
    var btn = document.querySelector("a[href='#privacyPolicyModal']");
    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function (event) {
        event.preventDefault();
        modal.style.display = "block";
    }

    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});

