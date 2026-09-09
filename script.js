document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       CURRENT YEAR
    ========================= */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =========================
       SMOOTH SCROLL
    ========================= */

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach((link) => {
        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    /* =========================
       ACTIVE NAV LINK
    ========================= */

    const sections = document.querySelectorAll("section[id], footer[id]");
    const navLinks = document.querySelectorAll(".nav-bar a");

    window.addEventListener("scroll", () => {

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");

            if (
                link.getAttribute("href") === `#${currentSection}`
            ) {
                link.classList.add("active");
            }
        });
    });


    /* =========================
       BOOKING FORM
    ========================= */

    const bookingForm = document.getElementById("booking-form");
    const checkin = document.getElementById("checkin");
    const checkout = document.getElementById("checkout");
    const guests = document.getElementById("guests");
    const room = document.getElementById("room");
    const bookingMessage = document.getElementById("booking-message");

    if (
        bookingForm &&
        checkin &&
        checkout &&
        bookingMessage
    ) {

        const today = new Date();

        today.setHours(0, 0, 0, 0);

        const todayString =
            today.toISOString().split("T")[0];

        checkin.min = todayString;
        checkout.min = todayString;


        /* CHECK-OUT DATE */

        checkin.addEventListener("change", () => {

            checkout.min = checkin.value;

            if (
                checkout.value &&
                new Date(checkout.value) <=
                new Date(checkin.value)
            ) {
                checkout.value = "";
            }
        });


        /* FORM SUBMIT */

        bookingForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const checkinDate =
                new Date(checkin.value);

            const checkoutDate =
                new Date(checkout.value);


            /* EMPTY DATES */

            if (!checkin.value || !checkout.value) {

                bookingMessage.textContent =
                    "Please select your check-in and check-out dates.";

                return;
            }


            /* CHECK-OUT DATE */

            if (checkoutDate <= checkinDate) {

                bookingMessage.textContent =
                    "Check-out date must be after your check-in date.";

                return;
            }


            /* NUMBER OF NIGHTS */

            const oneDay =
                1000 * 60 * 60 * 24;

            const nights =
                Math.round(
                    (checkoutDate - checkinDate) / oneDay
                );


            /* ROOM */

            const roomName =
                room ? room.value : "selected room";

            const guestNumber =
                guests ? guests.value : "1";


            /* SUCCESS MESSAGE */

            bookingMessage.textContent =
                `Your ${nights}-night stay in the ${roomName} for ${guestNumber} guest${guestNumber === "1" ? "" : "s"} is available to request.`;
        });
    }


    /* =========================
       HEADER SCROLL
    ========================= */

    const header = document.querySelector(".header");

    if (header) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }

        });
    }

});


const menuToggle = document.getElementById("menuToggle");
const navBar = document.querySelector(".nav-bar");

if (menuToggle && navBar) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navBar.classList.toggle("active");

    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen);
  });
}
