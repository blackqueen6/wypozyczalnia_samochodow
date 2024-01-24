document.addEventListener("DOMContentLoaded", () => {
  // Event Listener dla przycisku wyszukiwania
  document.getElementById("searchButton").addEventListener("click", searchCars);
  document.getElementById("sort-button").addEventListener("click", sortCars);

  document.querySelectorAll(".flip-card").forEach((card) => {
    card.querySelector(".card-banner img").addEventListener("click", () => {
      // Zamyka wszystkie inne karty przed otwarciem nowej
      closeAllCardsExcept(card);

      const flipCardInner = card.querySelector(".flip-card-inner");
      flipCardInner.classList.toggle("flipped");
      handleVideoPlayback(flipCardInner);
    });

    card.querySelector(".card-back").addEventListener("click", () => {
      const flipCardInner = card.querySelector(".flip-card-inner");
      flipCardInner.classList.toggle("flipped");
      handleVideoPlayback(flipCardInner);
    });

    // Inicjalizacja przycisku pełnoekranowego dla każdego wideo
    const fullScreenBtn = card.querySelector(".full-screen-btn");
    const video = card.querySelector("video");

    if (fullScreenBtn && video) {
      fullScreenBtn.addEventListener("click", () => toggleFullScreen(video));
    }
  });
});

function handleVideoPlayback(card) {
  const video = card.querySelector("video");
  if (!video) return;

  if (card.classList.contains("flipped")) {
    video.volume = 0.25;
    if (video.hasAttribute("controls")) {
      video.removeAttribute("controls");
    }
    video.play();
  } else {
    video.pause();
    video.currentTime = 0;

  }
}

document.addEventListener("keydown", function (e) {
  if (e.key === "f" || e.key === "F") {

    const activeVideo = document.querySelector(
      ".flip-card-inner.flipped video"
    );
    if (activeVideo) {
      toggleFullScreen(activeVideo);
    }
  }
});

function closeAllCardsExcept(openCard) {
  document.querySelectorAll(".flip-card").forEach((card) => {
    if (card !== openCard) {
      const flipCardInner = card.querySelector(".flip-card-inner");
      if (flipCardInner.classList.contains("flipped")) {
        flipCardInner.classList.remove("flipped");
        const video = flipCardInner.querySelector("video");
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
      }
    }
  });
}

function toggleFullScreen(video) {
  if (!video) return;

  if (!document.fullscreenElement) {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}

function searchCars() {
  const input = document.getElementById("searchInput");
  const filter = input.value.toUpperCase();
  const ul = document.getElementById("featured-car-list");
  const li = ul.getElementsByTagName("li");

  for (let i = 0; i < li.length; i++) {
    const h3 = li[i].querySelector(".card-title");
    if (h3) {
      const txtValue = h3.textContent || h3.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
        li[i].classList.add("highlighted");
      } else {
        li[i].style.display = "none";
        li[i].classList.remove("highlighted");
      }
    } else {
      console.error("Could not find h3 element within li", li[i]);
    }
  }
}

function sortCars() {
  const sortOrder = document.getElementById("sort-options").value;
  const carsList = document.getElementById("featured-car-list");
  const cars = Array.from(carsList.getElementsByClassName("flip-card"));

  cars.sort((a, b) => {
    const priceA = parseInt(
      a.querySelector(".card-price strong").textContent.replace(" zł", "")
    );
    const priceB = parseInt(
      b.querySelector(".card-price strong").textContent.replace(" zł", "")
    );
    const yearA = parseInt(a.querySelector(".year").getAttribute("value"));
    const yearB = parseInt(b.querySelector(".year").getAttribute("value"));
    const nameA = a.querySelector(".card-title p").textContent.toUpperCase();
    const nameB = b.querySelector(".card-title p").textContent.toUpperCase();

    switch (sortOrder) {
      case "price-asc":
        return priceA - priceB;
      case "price-desc":
        return priceB - priceA;
      case "year-asc":
        return yearA - yearB;
      case "year-desc":
        return yearB - yearA;
      case "alpha-asc":
        return nameA.localeCompare(nameB);
      case "alpha-desc":
        return nameB.localeCompare(nameA);
      default:
        return 0;
    }
  });

  // Dodanie posortowanych samochodów
  cars.forEach((car) => carsList.appendChild(car.closest("li")));
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('year').textContent = new Date().getFullYear();
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