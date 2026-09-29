/* =====================================================
   LOGIN
===================================================== */

function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Please enter your login details.");
        return;
    }

    alert("✅ Login Successful!\n\nWelcome to Co-Gig 🌱");

    document.getElementById("loginPage").style.display = "none";
    document.getElementById("website").classList.add("show");

    window.scrollTo(0, 0);
}


/* =====================================================
   PASSWORD
===================================================== */

function togglePassword() {
    const password = document.getElementById("password");

    password.type = password.type === "password"
        ? "text"
        : "password";
}


/* =====================================================
   FORGOT PASSWORD
===================================================== */

function forgotPassword(event) {
    event.preventDefault();

    const email = prompt("Enter your email or mobile number:");

    if (email && email.trim() !== "") {
        alert("A password reset link/OTP will be sent to:\n\n" + email);
    }
}


/* =====================================================
   SOCIAL LOGIN
===================================================== */

function socialLogin(type) {
    alert(
        "Continue with " + type +
        "\n\nSocial login will be connected here."
    );
}


/* =====================================================
   SIGN UP
===================================================== */

function signUp(event) {
    event.preventDefault();

    alert(
        "📝 Create Co-Gig Account\n\n" +
        "Registration page will be connected here."
    );
}


/* =====================================================
   LOGOUT
===================================================== */

function logout() {
    document.getElementById("website").classList.remove("show");
    document.getElementById("loginPage").style.display = "grid";

    document.getElementById("email").value = "";
    document.getElementById("password").value = "";

    window.scrollTo(0, 0);
}


/* =====================================================
   NAVIGATION
===================================================== */

function goToServices() {
    document.getElementById("services").scrollIntoView({
        behavior: "smooth"
    });
}

function goToWorkers() {
    document.getElementById("workers").scrollIntoView({
        behavior: "smooth"
    });
}


/* =====================================================
   SERVICE BOOKING
===================================================== */

function bookService(service) {
    const confirmBooking = confirm(
        "Do you want to book:\n\n" + service + "?"
    );

    if (confirmBooking) {
        alert(
            "✅ Booking Request Sent!\n\n" +
            "Service: " + service +
            "\n\nStatus: Waiting for worker confirmation."
        );
    }
}


/* =====================================================
   WORKER BOOKING
===================================================== */

function bookWorker(worker) {
    const confirmBooking = confirm(
        "Book " + worker + " for your service?"
    );

    if (confirmBooking) {
        alert(
            "✅ Booking Request Sent!\n\n" +
            "Worker: " + worker +
            "\n\nThe worker will receive your request."
        );
    }
}


/* =====================================================
   BECOME WORKER
===================================================== */

function becomeWorker() {
    alert(
        "👷 Become a Co-Gig Worker\n\n" +
        "Registration form will open here.\n\n" +
        "You can add your skills, location, experience " +
        "and service charges."
    );
}


/* =====================================================
   SEARCH
===================================================== */

function searchService() {
    const service = prompt("🔍 What service are you looking for?");

    if (service && service.trim() !== "") {
        alert(
            "Searching for:\n\n" +
            service +
            "\n\nMatching workers will appear here."
        );
    }
}


/* =====================================================
   NOTIFICATIONS
===================================================== */

function showNotifications() {
    alert(
        "🔔 Notifications\n\n" +
        "• New booking available\n" +
        "• Worker accepted your request\n" +
        "• Payment received\n" +
        "• New worker nearby"
    );
}


/* =====================================================
   NAV ACTIVE STATE
===================================================== */

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {
    link.addEventListener("click", function() {
        navLinks.forEach(item => item.classList.remove("active"));
        this.classList.add("active");
    });
});


/* =====================================================
   UPDATE ACTIVE NAV WHILE SCROLLING
===================================================== */

const sections = document.querySelectorAll(
    "#home, #services, #workers, #about"
);

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

/* =====================================================
   COOPERATIVE FEATURES
===================================================== */
function openGroupBooking(){
    document.getElementById('groupModal').classList.add('show');
}
function closeGroupBooking(){
    document.getElementById('groupModal').classList.remove('show');
}
function submitGroupBooking(event){
    event.preventDefault();
    const service=document.getElementById('groupService').value;
    const workers=document.getElementById('groupWorkers').value;
    const location=document.getElementById('groupLocation').value.trim();
    alert('🤝 Cooperative request created!\n\nService: '+service+'\nWorkers: '+workers+'\nLocation: '+location+'\n\nCo-Gig will match available local workers.');
    closeGroupBooking();
}
function smartMatch(){
    alert('📍 Smart Matching\n\nMatching workers by location + skill + availability + community rating.');
}
function toggleAvailability(){
    const btn=document.getElementById('availabilityBtn');
    const available=btn.dataset.available!=='false';
    btn.dataset.available=available?'false':'true';
    btn.textContent=available?'🔴 Currently Unavailable':'🟢 Available for Work';
}
function acceptJob(job){
    alert('✅ Job accepted!\n\n'+job+' has been added to your accepted jobs.');
}
function refreshJobs(){
    alert('🔄 Job list refreshed. New nearby requests checked.');
}
window.addEventListener('click',function(e){
    const modal=document.getElementById('groupModal');
    if(e.target===modal) closeGroupBooking();
});


// Co-Gig Booking + Multilingual System is initialized from index.html.
