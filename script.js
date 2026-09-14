/* =========================================================
   CO-GIG | COOPERATIVE GIG SERVICES
   ========================================================= */


/* ================= DOM ELEMENTS ================= */

const navLinks = document.querySelectorAll(".nav-menu a");
const serviceLinks = document.querySelectorAll(".service-box a");
const workerButtons = document.querySelectorAll(".worker-btn");

const loginButton = document.querySelector(".login-btn");
const signupButton = document.querySelector(".signup-btn");

const becomeWorkerButtons = document.querySelectorAll(
    ".secondary-btn, .white-btn"
);


/* ================= ACTIVE NAVIGATION ================= */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.forEach(item => {
            item.classList.remove("active");
        });

        link.classList.add("active");

    });

});


/* ================= SCROLL ACTIVE NAV ================= */

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

});


/* ================= TOAST MESSAGE ================= */

function showMessage(message) {

    const existingToast = document.querySelector(".toast");

    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement("div");

    toast.className = "toast";
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 100);

    setTimeout(() => {
        toast.classList.remove("show");

        setTimeout(() => {
            toast.remove();
        }, 300);

    }, 2500);
}


/* ================= SERVICE BUTTONS ================= */

serviceLinks.forEach(link => {

    link.addEventListener("click", event => {

        event.preventDefault();

        const serviceName =
            link.closest(".service-box").querySelector("h3").textContent;

        showMessage(`Showing ${serviceName} services...`);

    });

});


/* ================= FIND A SERVICE ================= */

const findServiceButton = document.querySelector(".primary-btn");

if (findServiceButton) {

    findServiceButton.addEventListener("click", event => {

        event.preventDefault();

        document.querySelector("#services").scrollIntoView({
            behavior: "smooth"
        });

        showMessage("Choose a service from Co-Gig.");

    });

}


/* ================= WORKER PROFILES ================= */

workerButtons.forEach(button => {

    button.addEventListener("click", event => {

        event.preventDefault();

        const workerCard = button.closest(".worker-card");

        const name =
            workerCard.querySelector("h3").textContent;

        const profession =
            workerCard.querySelector("p").textContent;

        const rating =
            workerCard.querySelector(".rating").textContent.trim();

        const info =
            workerCard.querySelector(".worker-info").textContent.trim();

        openWorkerModal(
            name,
            profession,
            rating,
            info
        );

    });

});


/* ================= WORKER MODAL ================= */

function openWorkerModal(name, profession, rating, info) {

    const modal = document.createElement("div");

    modal.className = "modal-overlay";

    modal.innerHTML = `
        <div class="modal">

            <button class="close-modal">&times;</button>

            <div class="modal-avatar">
                👨‍🌾
            </div>

            <h2>${name}</h2>

            <p class="modal-profession">
                ${profession}
            </p>

            <div class="modal-rating">
                ${rating}
            </div>

            <div class="modal-info">
                ${info}
            </div>

            <button class="book-worker">
                Book Worker
            </button>

        </div>
    `;

    document.body.appendChild(modal);

    setTimeout(() => {
        modal.classList.add("show");
    }, 50);


    /* Close */

    modal.querySelector(".close-modal")
        .addEventListener("click", () => {
            closeModal(modal);
        });


    /* Book */

    modal.querySelector(".book-worker")
        .addEventListener("click", () => {

            closeModal(modal);

            showBookingModal(name, profession);

        });


    /* Click outside */

    modal.addEventListener("click", event => {

        if (event.target === modal) {
            closeModal(modal);
        }

    });

}


/* ================= CLOSE MODAL ================= */

function closeModal(modal) {

    modal.classList.remove("show");

    setTimeout(() => {
        modal.remove();
    }, 300);

}


/* ================= BOOKING MODAL ================= */

function showBookingModal(workerName, serviceName) {

    const modal = document.createElement("div");

    modal.className = "modal-overlay";

    modal.innerHTML = `
        <div class="modal booking-modal">

            <button class="close-modal">&times;</button>

            <h2>Book a Service</h2>

            <p>
                Booking with <strong>${workerName}</strong>
            </p>

            <form id="bookingForm">

                <label>
                    Your Name
                </label>

                <input
                    type="text"
                    id="customerName"
                    placeholder="Enter your name"
                    required
                >

                <label>
                    Service
                </label>

                <input
                    type="text"
                    value="${serviceName}"
                    readonly
                >

                <label>
                    Date
                </label>

                <input
                    type="date"
                    id="bookingDate"
                    required
                >

                <label>
                    Time
                </label>

                <input
                    type="time"
                    id="bookingTime"
                    required
                >

                <button type="submit" class="book-worker">
                    Confirm Booking
                </button>

            </form>

        </div>
    `;

    document.body.appendChild(modal);

    setTimeout(() => {
        modal.classList.add("show");
    }, 50);


    modal.querySelector(".close-modal")
        .addEventListener("click", () => {
            closeModal(modal);
        });


    /* Booking Submit */

    modal.querySelector("#bookingForm")
        .addEventListener("submit", event => {

            event.preventDefault();

            const name =
                document.querySelector("#customerName").value;

            closeModal(modal);

            showMessage(
                `Booking confirmed! Thank you, ${name}.`
            );

        });

}


/* ================= LOGIN ================= */

if (loginButton) {

    loginButton.addEventListener("click", event => {

        event.preventDefault();

        showLoginModal();

    });

}


function showLoginModal() {

    const modal = document.createElement("div");

    modal.className = "modal-overlay";

    modal.innerHTML = `
        <div class="modal">

            <button class="close-modal">&times;</button>

            <h2>Welcome Back</h2>

            <p>Login to your Co-Gig account.</p>

            <form id="loginForm">

                <label>Email</label>

                <input
                    type="email"
                    placeholder="Enter your email"
                    required
                >

                <label>Password</label>

                <input
                    type="password"
                    placeholder="Enter your password"
                    required
                >

                <button type="submit" class="book-worker">
                    Login
                </button>

            </form>

        </div>
    `;

    document.body.appendChild(modal);

    setTimeout(() => {
        modal.classList.add("show");
    }, 50);


    modal.querySelector(".close-modal")
        .addEventListener("click", () => {
            closeModal(modal);
        });


    modal.querySelector("#loginForm")
        .addEventListener("submit", event => {

            event.preventDefault();

            closeModal(modal);

            showMessage("Login successful!");

        });

}


/* ================= JOIN NOW ================= */

if (signupButton) {

    signupButton.addEventListener("click", event => {

        event.preventDefault();

        showSignupModal();

    });

}


/* ================= BECOME A WORKER ================= */

becomeWorkerButtons.forEach(button => {

    button.addEventListener("click", event => {

        event.preventDefault();

        showSignupModal();

    });

});


/* ================= SIGNUP MODAL ================= */

function showSignupModal() {

    const modal = document.createElement("div");

    modal.className = "modal-overlay";

    modal.innerHTML = `
        <div class="modal">

            <button class="close-modal">&times;</button>

            <h2>Join Co-Gig</h2>

            <p>Create your community account.</p>

            <form id="signupForm">

                <label>Full Name</label>

                <input
                    type="text"
                    placeholder="Enter your name"
                    required
                >

                <label>Email</label>

                <input
                    type="email"
                    placeholder="Enter your email"
                    required
                >

                <label>Phone Number</label>

                <input
                    type="tel"
                    placeholder="Enter phone number"
                    required
                >

                <label>Join As</label>

                <select required>

                    <option value="">
                        Select an option
                    </option>

                    <option value="customer">
                        Customer
                    </option>

                    <option value="worker">
                        Worker
                    </option>

                </select>

                <button type="submit" class="book-worker">
                    Create Account
                </button>

            </form>

        </div>
    `;

    document.body.appendChild(modal);

    setTimeout(() => {
        modal.classList.add("show");
    }, 50);


    modal.querySelector(".close-modal")
        .addEventListener("click", () => {
            closeModal(modal);
        });


    modal.querySelector("#signupForm")
        .addEventListener("submit", event => {

            event.preventDefault();

            closeModal(modal);

            showMessage(
                "Account created successfully!"
            );

        });

}


/* ================= ESC KEY ================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        const modal =
            document.querySelector(".modal-overlay");

        if (modal) {
            closeModal(modal);
        }

    }

});