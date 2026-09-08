/* ==========================================
   KISANPROCURE - FRONTEND JAVASCRIPT
   ========================================== */


/* ---------- ELEMENTS ---------- */

const signupPage = document.getElementById("signupPage");
const dashboardPage = document.getElementById("dashboardPage");

const signupForm = document.getElementById("signupForm");

const fullName = document.getElementById("fullName");
const mobile = document.getElementById("mobile");
const farmerId = document.getElementById("farmerId");
const state = document.getElementById("state");
const district = document.getElementById("district");
const password = document.getElementById("password");

const togglePassword =
    document.getElementById("togglePassword");

const toast =
    document.getElementById("toast");

const profileName =
    document.getElementById("profileName");

const welcomeName =
    document.getElementById("welcomeName");

const profileInitial =
    document.getElementById("profileInitial");



/* ---------- DISTRICTS ---------- */

const districts = {

    Karnataka: [
        "Bengaluru Urban",
        "Mysuru",
        "Mandya",
        "Hassan",
        "Tumakuru",
        "Belagavi",
        "Dharwad"
    ],

    Maharashtra: [
        "Pune",
        "Nashik",
        "Nagpur",
        "Kolhapur",
        "Satara",
        "Solapur"
    ],

    "Uttar Pradesh": [
        "Lucknow",
        "Kanpur",
        "Agra",
        "Varanasi",
        "Meerut",
        "Prayagraj"
    ],

    Punjab: [
        "Amritsar",
        "Ludhiana",
        "Patiala",
        "Jalandhar",
        "Bathinda"
    ],

    Haryana: [
        "Gurugram",
        "Hisar",
        "Karnal",
        "Panipat",
        "Rohtak"
    ],

    Rajasthan: [
        "Jaipur",
        "Jodhpur",
        "Kota",
        "Udaipur",
        "Ajmer"
    ],

    "Madhya Pradesh": [
        "Bhopal",
        "Indore",
        "Gwalior",
        "Jabalpur",
        "Ujjain"
    ],

    Telangana: [
        "Hyderabad",
        "Warangal",
        "Nizamabad",
        "Karimnagar",
        "Khammam"
    ]

};



/* ---------- STATE CHANGE ---------- */

state.addEventListener("change", function () {

    const selectedState = this.value;

    district.innerHTML =
        '<option value="">Select District</option>';

    if (!selectedState) return;

    districts[selectedState]?.forEach(function (item) {

        const option =
            document.createElement("option");

        option.value = item;
        option.textContent = item;

        district.appendChild(option);

    });

});



/* ---------- USER TYPE ---------- */

const typeOptions =
    document.querySelectorAll(".type-option");

typeOptions.forEach(option => {

    option.addEventListener("click", function () {

        typeOptions.forEach(item =>
            item.classList.remove("active")
        );

        this.classList.add("active");

        this.querySelector("input").checked = true;

    });

});



/* ---------- PASSWORD TOGGLE ---------- */

togglePassword.addEventListener("click", function () {

    if (password.type === "password") {

        password.type = "text";

        this.innerHTML =
            '<i class="fa-regular fa-eye-slash"></i>';

    } else {

        password.type = "password";

        this.innerHTML =
            '<i class="fa-regular fa-eye"></i>';

    }

});



/* ---------- PASSWORD STRENGTH ---------- */

const strengthBars =
    document.querySelectorAll(".password-strength span");

password.addEventListener("input", function () {

    const value = this.value;

    let strength = 0;

    if (value.length >= 6)
        strength++;

    if (/[A-Z]/.test(value))
        strength++;

    if (/[0-9]/.test(value))
        strength++;

    if (/[^A-Za-z0-9]/.test(value))
        strength++;


    strengthBars.forEach((bar, index) => {

        if (index < strength)
            bar.classList.add("active");
        else
            bar.classList.remove("active");

    });

});



/* ---------- MOBILE VALIDATION ---------- */

mobile.addEventListener("input", function () {

    this.value =
        this.value.replace(/\D/g, "");

});



/* ---------- FORM SUBMISSION ---------- */

signupForm.addEventListener("submit", function (event) {

    event.preventDefault();


    /* Validate mobile */

    if (!/^[6-9]\d{9}$/.test(mobile.value)) {

        showToast(
            "Invalid Mobile",
            "Please enter a valid 10-digit mobile number."
        );

        mobile.focus();

        return;
    }


    /* Validate password */

    if (password.value.length < 6) {

        showToast(
            "Weak Password",
            "Password must contain at least 6 characters."
        );

        password.focus();

        return;
    }


    /* Get selected user type */

    const selectedType =
        document.querySelector(
            'input[name="userType"]:checked'
        ).value;


    /* Save user */

    const user = {

        name: fullName.value.trim(),

        mobile: mobile.value,

        farmerId: farmerId.value.trim(),

        state: state.value,

        district: district.value,

        userType: selectedType,

        createdAt: new Date().toISOString()

    };


    localStorage.setItem(
        "kisanProcureUser",
        JSON.stringify(user)
    );


    /* Update dashboard */

    const name =
        user.name.split(" ")[0];

    welcomeName.textContent = name;

    profileName.textContent =
        user.name;

    profileInitial.textContent =
        name.charAt(0).toUpperCase();


    /* Show success */

    showToast(
        "Account Created",
        "Welcome to KisanProcure."
    );


    /* Open dashboard */

    setTimeout(() => {

        signupPage.classList.add("hidden");

        dashboardPage.classList.remove("hidden");

        window.scrollTo(0, 0);

    }, 900);

});



/* ---------- LOGIN LINK ---------- */

document
    .getElementById("loginLink")
    .addEventListener("click", function (event) {

        event.preventDefault();

        showToast(
            "Login",
            "Login module can be connected to your backend."
        );

    });



/* ---------- TOAST ---------- */

function showToast(title, message) {

    toast.querySelector("strong").textContent =
        title;

    toast.querySelector("span").textContent =
        message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}



/* ---------- MOBILE SIDEBAR ---------- */

const mobileMenu =
    document.getElementById("mobileMenu");

const sidebar =
    document.querySelector(".sidebar");


mobileMenu.addEventListener("click", function () {

    sidebar.classList.toggle("open");

});



/* ---------- SIDEBAR NAVIGATION ---------- */

const menuItems =
    document.querySelectorAll(".menu-item");

menuItems.forEach(item => {

    item.addEventListener("click", function () {

        if (this.classList.contains("active"))
            return;

        menuItems.forEach(menu =>
            menu.classList.remove("active")
        );

        this.classList.add("active");

    });

});



/* ---------- LIVE QUEUE SIMULATION ---------- */

const queueNumbers =
    document.querySelectorAll(".queue-number strong");

setInterval(() => {

    queueNumbers.forEach(number => {

        let current =
            parseInt(number.textContent);

        /* Occasionally reduce queue */

        if (Math.random() > 0.55 && current > 5) {

            current -= Math.floor(
                Math.random() * 2
            );

            number.textContent =
                current;

        }

    });

}, 7000);



/* ---------- LOAD EXISTING USER ---------- */

window.addEventListener("DOMContentLoaded", function () {

    const savedUser =
        localStorage.getItem("kisanProcureUser");

    if (!savedUser)
        return;


    try {

        const user =
            JSON.parse(savedUser);

        if (user.name) {

            welcomeName.textContent =
                user.name.split(" ")[0];

            profileName.textContent =
                user.name;

            profileInitial.textContent =
                user.name
                    .charAt(0)
                    .toUpperCase();

        }

    } catch (error) {

        console.log(
            "Unable to load saved user."
        );

    }

});