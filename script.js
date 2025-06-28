"use strict";

//Form validation
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // messages cleared
  document.querySelectorAll(".error").forEach(el => el.textContent = "");
  document.getElementById("formMessage").textContent = "";

  let name = document.getElementById("name").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let email = document.getElementById("email").value.trim();
  let comments = document.getElementById("comments").value.trim();
  let contactMethod = document.querySelector("input[name='contactMethod']:checked");

  let isValid = true;

  // Name validation
  if (name === "") {
    showError("name", "Name is required.");
    isValid = false;
  }

  // Comments validation
  if (comments === "") {
    showError("comments", "Comments are required.");
    isValid = false;
  }

  // Contact  validation
  if (!contactMethod) {
    showError("email", "Please select a contact method.");
    showError("phone", "Please select a contact method.");
    isValid = false;
  } else {
    if (contactMethod.value === "email") {
      if (!/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(email)) {
        showError("email", "Please enter a valid email address.");
        isValid = false;
      }
    } else if (contactMethod.value === "phone") {
      if (!/^\d{10}$/.test(phone)) {
        showError("phone", "Please enter a valid 10-digit phone number.");
        isValid = false;
      }
    }
  }

  if (isValid) {
    const customer = {
      name,
      phone,
      email,
      comments,
      preferredContact: contactMethod.value
    };

    this.reset();
    document.getElementById("formMessage").textContent =
      `Thanks, ${customer.name}! We'll contact you via ${customer.preferredContact}.`;
  }
});

function showError(fieldId, message) {
  let field = document.getElementById(fieldId);
  let error = field.nextElementSibling;
  if (!error || !error.classList.contains("error")) {
    error = document.createElement("span");
    error.className = "error";
    field.parentNode.insertBefore(error, field.nextSibling);
  }
  error.textContent = message;
}
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }
});



//Object use for products
let products = [
  {
    name: "UberX",
    image: "images/uber hand held phone black backface and ligth lettering.jpeg",
    description: "Affordable everyday rides for individuals or small groups."
  },
  {
    name: "Uber Comfort",
    image: "images/black man in ubering.jpeg",
    description: "Newer cars with extra legroom and top-rated drivers."
  },
  {
    name: "Uber Green",
    image: "images/electric car.jpeg",
    description: "Low-emission rides in hybrid and electric vehicles."
  }
];
// Connects to Html page for product switching
function displayProduct(index) {
  let product = products[index];
  if(!product) return;
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-image").src = product.image;
  document.getElementById("product-image").alt = product.name;
  document.getElementById("product-description").textContent = product.description;
}
// Changes product images
document.getElementById("product-buttons").addEventListener("click", (e) => {
  if (e.target.tagName ==="BUTTON") {
    let index = parseInt(e.target.getAttribute("data-id"));
      displayProduct(index);
  }
});



document.getElementById("guessBtn").addEventListener("click", function () {
  let userGuess = parseInt(document.getElementById("fareGuess").value, 10);
  let randomFare = Math.floor(Math.random() * 10) + 1;
  let result = document.getElementById("guessResult");

  if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
    result.textContent = "Please enter a number between 1 and 10.";
    result.style.color = "yellow";
    return;
  }

  if (userGuess === randomFare) {
    result.textContent = `O You guessed it! The fare was ${randomFare}.`;
    result.style.color = "blue";
  } else {
    result.textContent = `X Try again! You guessed ${userGuess}, but the fare was ${randomFare}. Try again!`;
    result.style.color = "red";
  }
});
