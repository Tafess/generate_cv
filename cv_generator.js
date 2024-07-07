function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//===================================Snack bar================================//

function showSnackbar(message) {
  const snackbar = document.getElementById("snackbar");
  snackbar.innerText = message;
  snackbar.className = "show";
  setTimeout(() => {
    snackbar.className = snackbar.className.replace("show", "");
  }, 3000);
}

//==========================Photo======================================//
document.getElementById("photo").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("photoPreview").innerHTML = `
        <img src="${e.target.result}" alt="Selected Photo" width="150" height="150" />
      `;
    };
    reader.readAsDataURL(file);
  }
});

//============================Date Limit====================================//
document.addEventListener("DOMContentLoaded", function () {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("entryYear").setAttribute("max", today);
  document.getElementById("graduationDate").setAttribute("max", today);
});

//================================Maximum abuot me input ============================================//
document.getElementById("aboutMe").addEventListener("input", function () {
  const maxLength = 500;
  const currentLength = this.value.length;
  const remainingLength = maxLength - currentLength;
  document.getElementById(
    "aboutMeCounter"
  ).textContent = `${remainingLength} characters remaining`;
});

// ================================ADD EXPERIANCE INPUTS================================
let experienceCount = 0;
let currentExperienceIndex = 0;

function validateExperienceInputs() {
  const experiences = document.querySelectorAll(".experience");
  if (experiences.length === 0) return false;

  const currentExperience = experiences[experiences.length - 1];
  const role = currentExperience.querySelector(".experience-role").value.trim();
  const organization = currentExperience
    .querySelector(".experience-organization")
    .value.trim();
  const start = currentExperience
    .querySelector(".experience-start")
    .value.trim();
  const end = currentExperience.querySelector(".experience-end").value.trim();
  const description = currentExperience
    .querySelector(".experience-description")
    .value.trim();

  return (
    role !== "" &&
    organization !== "" &&
    start !== "" &&
    end !== "" &&
    description !== ""
  );
}

function addExperience(button) {
  const experiencesContainer = document.getElementById("experiencesContainer");

  if (experienceCount > 0 && !validateExperienceInputs()) {
    showSnackbar(
      "Please fill out all required fields for the current experiance."
    );
    return;
  }

  if (currentExperienceIndex > 0) {
    const currentExperience = document.getElementById(
      `experience${currentExperienceIndex}`
    );
    currentExperience.style.display = "none";
  }

  if (experienceCount >= 2) {
    showSnackbar("You reached the limit. Only 2 experiences are allowed");
    return;
  }

  const experienceDiv = document.createElement("div");
  experienceDiv.className = "experience";
  experienceDiv.id = `experience${experienceCount + 1}`;

  experienceDiv.innerHTML = `
    <label style=" font-size:16px;font-weight:600;color:blue;">Added Experience ${experienceCount}</label>
    <input  type="text" placeholder="Organization name where you (was) work" class="experience-organization" >
    <input  type="text" placeholder="What was your specific role" class="experience-role" >
    <textarea placeholder="Enter role description with less than 150 characters" class="experience-description" maxLength=150 ></textarea>
    <label for="start">Work start date:</label>
    <input type="date" name="start" placeholder="Work start date" class="experience-start" max="${
      new Date().toISOString().split("T")[0]
    }" >
    <label for="end">Work end date:</label>
    <input  type="date" name="end" placeholder="Work end date" class="experience-end" max="${
      new Date().toISOString().split("T")[0]
    }" ><br>
  `;

  experiencesContainer.insertBefore(experienceDiv, button);

  experienceCount++;
  currentExperienceIndex = experienceCount;
  document.getElementById("experience-btn").innerHTML = "Add More Experience";
}

//========================ADD CERTEFICATE INPUTS========================//
let certeficateCount = 0;
let currentCerteficateIndex = 0;

function validateCerteficateInputs() {
  const certificates = document.querySelectorAll(".certeficate");
  if (certificates.length === 0) return false;

  const currentCertificate = certificates[certificates.length - 1];
  const name = currentCertificate
    .querySelector(".certeficate-name")
    .value.trim();
  const donor = currentCertificate
    .querySelector(".certeficate-doner")
    .value.trim();
  const reason = currentCertificate
    .querySelector(".certeficate-case")
    .value.trim();
  const time = currentCertificate
    .querySelector(".certeficate-time")
    .value.trim();

  return name !== "" && donor !== "" && reason !== "" && time !== "";
}

function addCerteficate(button) {
  const certeficateContainer = document.getElementById("certeficateContainer");

  if (certeficateCount > 0 && !validateCerteficateInputs()) {
    showSnackbar(
      "Please fill out all required fields for the current certificate."
    );
    return;
  }

  if (currentCerteficateIndex > 0) {
    const currentCerteficate = document.getElementById(
      `certeficate${currentCerteficateIndex}`
    );
    currentCerteficate.style.display = "none";
  }

  if (certeficateCount >= 3) {
    showSnackbar(
      "You have reached the limit. Only 3 certificates are allowed."
    );
    return;
  }

  const certeficateDiv = document.createElement("div");
  certeficateDiv.className = "certeficate";
  certeficateDiv.id = `certeficate${certeficateCount + 1}`;

  certeficateDiv.innerHTML = `
    <label style="font-size: 16px; font-weight: 600; color: blue;">Added Certificate ${certeficateCount}</label>
    <input  type="text" placeholder="Enter Certificate name" class="certeficate-name">
    <input  type="text" placeholder="From which Organization" class="certeficate-doner">
    <input  type="text" placeholder="What was the case" class="certeficate-case">
    <input  type="date" placeholder="When did you receive it" class="certeficate-time" max="${
      new Date().toISOString().split("T")[0]
    }">
  `;

  certeficateContainer.insertBefore(certeficateDiv, button);

  certeficateCount++;
  currentCerteficateIndex = certeficateCount;
  document.getElementById("certeficate-btn").innerHTML =
    "Add More Certificates";
}

//=============================ADD REFERENCE INPUTES===================================//

let referenceCount = 0;
let currentReferenceIndex = 0;

function validateReferenceInputs() {
  const references = document.querySelectorAll(".reference");
  if (references.length === 0) return false;

  const currentReference = references[references.length - 1];
  const name = currentReference.querySelector(".reference-name");
  const email = currentReference.querySelector(".reference-email");
  const phone = currentReference.querySelector(".reference-phone");
  const work = currentReference.querySelector(".reference-work");

  return (
    name.value.trim() !== "" &&
    email.value.trim() !== "" &&
    phone.value.trim() !== "" &&
    work.value.trim() !== ""
  );
}

function addReference(button) {
  const referencesContainer = document.getElementById("referencesContainer");

  if (referenceCount > 0 && !validateReferenceInputs()) {
    showSnackbar("Fill all the required inputs");
    return;
  }

  if (currentReferenceIndex > 0) {
    const currentReference = document.getElementById(
      `reference${currentReferenceIndex}`
    );
    currentReference.style.display = "none";
  }

  if (referenceCount >= 4) {
    showSnackbar("You reached the maximum limit of 4 references");
    return;
  }

  const referenceDiv = document.createElement("div");
  referenceDiv.className = "reference";
  referenceDiv.id = `reference${referenceCount + 1}`;

  referenceDiv.innerHTML = `
    <label style=" font-size:16px;font-weight:600;color:blue;">Added Reference ${referenceCount}</label>
    <input  type="text" placeholder="Enter reference person name" class="reference-name" >
    <input type="email" placeholder="Enter reference email" class="reference-email" >
    <input  type="tel" placeholder="Enter reference valid phone" class="reference-phone" pattern="[0-9]{10}" >
    <input  type="text" placeholder="Enter reference work organization and role" class="reference-work" >
  `;

  referencesContainer.insertBefore(referenceDiv, button);

  referenceCount++;
  currentReferenceIndex = referenceCount;
  document.getElementById("reference-btn").innerHTML = "Add More Reference";
}

//===========================FORM VALIDATION =====================================//

function validateForm() {
  const form = document.getElementById("cvForm");
  let isValid = true;
  let firstInvalidField = null;

  form
    .querySelectorAll("input[required], textarea[required]")
    .forEach((input) => {
      if (!input.value.trim()) {
        isValid = false;
        input.classList.add("is-invalid");
        if (!firstInvalidField) {
          firstInvalidField = input;
        }
      } else {
        input.classList.remove("is-invalid");
      }
    });

  form.querySelectorAll("input[type='tel']").forEach((input) => {
    const pattern = new RegExp(input.pattern);
    if (!pattern.test(input.value.trim())) {
      isValid = false;
      input.classList.add("is-invalid");
      if (!firstInvalidField) {
        firstInvalidField = input;
      }
    } else {
      input.classList.remove("is-invalid");
    }
  });

  if (firstInvalidField) {
    firstInvalidField.focus();
  }

  return isValid;
}
//============================================================================//
//Generate cv//
//============================================================================//
function generateCV() {
  if (!validateForm()) {
    showSnackbar("Please fill out all required fields correctly.");
    return;
  }

  const form = document.getElementById("cvForm");
  const cvPreview = document.getElementById("cvPreview");

  const fullName = capitalizeFirstLetter(form.fullName.value);
  const skills = form.skills.value
    .split(",")
    .map((skill) => `<li>${capitalizeFirstLetter(skill.trim())}</li>`)
    .join("");

  const languages = form.languages.value
    .split(",")
    .map((language) => `<li>${capitalizeFirstLetter(language.trim())}</li>`)
    .join("");

  let photoURL = "";
  const photoFile = form.photo.files[0];
  if (photoFile) {
    const reader = new FileReader();
    reader.onload = function (e) {
      photoURL = e.target.result;
      updateCVPreview();
    };
    reader.readAsDataURL(photoFile);
  } else {
    updateCVPreview();
  }

  function updateCVPreview() {
    const experiences = Array.from(
      document.getElementsByClassName("experience")
    )
      .map((exp) => {
        return `
            <div id="experiance-details" class="card">

            <p><strong>${capitalizeFirstLetter(
              exp.querySelector(".experience-role").value
            )}</strong> at <strong> ${capitalizeFirstLetter(
          exp.querySelector(".experience-organization").value
        )} </strong> from  ${exp.querySelector(".experience-start").value} to ${
          exp.querySelector(".experience-end").value
        } </p>
        <span>
         ${capitalizeFirstLetter(
           exp.querySelector(".experience-description").value
         )} </span>
            </div>
          `;
      })
      .join("");

    const certeficates = Array.from(
      document.getElementsByClassName("certeficate")
    )
      .map((certified) => {
        const name = certified.querySelector(".certeficate-name").value.trim();
        const donor = certified
          .querySelector(".certeficate-doner")
          .value.trim();
        const caseText = certified
          .querySelector(".certeficate-case")
          .value.trim();
        const time = certified.querySelector(".certeficate-time").value;

        if (name && donor && caseText && time) {
          return `
            <div id="certeficate-details" class="card">
              <p>Certified on <strong>${capitalizeFirstLetter(name)}</strong> 
                from <strong>${capitalizeFirstLetter(
                  donor
                )}</strong> on <strong>${time}</strong>
                because of ${capitalizeFirstLetter(caseText)}
                
              </p>
            </div>`;
        } else {
          return "";
        }
      })
      .join("");

    const references = Array.from(document.getElementsByClassName("reference"))
      .slice(0, 4)
      .map((ref) => {
        return `
            <div class="reference-item">
              <strong>Name:</strong> ${capitalizeFirstLetter(
                ref.querySelector(".reference-name").value
              )} <br>
              <strong>Email:</strong> ${
                ref.querySelector(".reference-email").value
              } <br>
              <strong>Phone:</strong> ${
                ref.querySelector(".reference-phone").value
              } <br>
              <strong>Role:</strong> ${capitalizeFirstLetter(
                ref.querySelector(".reference-work").value
              )} <br>
            </div>
          `;
      })
      .join("");

    //================================================================//
    // Cv container  preview//
    //================================================================//
    const github_value = form.github.value
      ? `
    <div>
    <img src="https://img.icons8.com/ios-filled/50/000000/github.png" class="icon" alt="GitHub Icon">
    <span>${form.github.value}</span>
  </div>`
      : "";

    const linkedin_value = form.linkedin.value
      ? `
  <div>
    <img src="https://img.icons8.com/ios-filled/50/000000/linkedin.png" class="icon" alt="LinkedIn Icon">
    <span>${form.linkedin.value}</span>
  </div>`
      : "";

    const website_value = form.website.value
      ? `
  <div>
    <img src="https://img.icons8.com/ios-filled/50/000000/domain.png" class="icon" alt="Website Icon">
    <span>${form.website.value}</span>
  </div>`
      : "";

    const exit_score_value = form.website.value
      ? `
  <div>
    
    <p> Exit score: ${form.exitExamScore.value}</p>
  </div>`
      : "";

    cvPreview.innerHTML = `
        <div class="cv-container">
          <div class="left-column">
            <div class="photo">
              <img src="${photoURL}" alt="Photo">
            </div>
            <div class="contact">
              <div class="section-title">Contact</div>
              <div><img src="https://img.icons8.com/ios-filled/50/000000/phone.png" class="icon" alt="Phone Icon"> <span>
              ${form.phone.value}</span></div>
              
                        <div><img src="https://img.icons8.com/ios-filled/50/000000/email.png" class="icon" alt="Email Icon">   <span>${
                          form.email.value
                        }</span>
                        </div>
                        ${github_value}
                        ${linkedin_value}
                        ${website_value}
                        <div><img src="https://img.icons8.com/ios-filled/50/000000/address.png" class="icon" alt="Address Icon"> 
                        
                        <span>${capitalizeFirstLetter(
                          form.address.value
                        )}</span></div>
                   </div>
            <div class="education">
              <div class="section-title">Education</div>
              <p> ${capitalizeFirstLetter(form.university.value)}</p>
              <p> ${
                form.degree.value +
                " in " +
                capitalizeFirstLetter(form.field.value)
              }</p>
              <p> ${
                form.entryYear.value + " - " + form.graduationDate.value
              }</p>
              <p><strong>CGPA :</strong> ${form.cgpa.value}</p>
              ${exit_score_value}
            </div>

            <div class="skills">
              <div class="section-title">Skills</div>
              <ul>${skills}</ul>
            </div>
            <div class="languages">
              <div class="section-title">Languages</div>
              <ul>${languages}</ul>
            </div>
          </div>
          <div class="right-column">
            <div class="full-name">${fullName}</div>
            <div class="about-me ">
              <div class="section-title ">About Me</div>
              <div class="card">
              <p >${capitalizeFirstLetter(form.aboutMe.value)}</p></div>
            </div>
            ${
              experiences
                ? `<div class="experiences"><div class="section-title">Experiences</div>${experiences}</div>
                <div class="line">`
                : ""
            }
            ${
              certeficates
                ? `<div class="certeficates"><div class="section-title">Certeficates</div><ul>${certeficates}</ul></div>
                <div class="line"></div>`
                : ""
            }
            ${
              references
                ? `<div class="references"><div class="section-title">References</div><div class="references-grid">${references}</div></div>`
                : ""
            }
          </div>
        </div>
      `;

    document.getElementById("themeToggle").style.display = "block";
    document.getElementById("downloadPDF").style.display = "block";
    document.getElementById("downloadImage").style.display = "block";
    document.getElementById("description").style.display = "block";
  }
}

//=============================DOWNLOAD===============================================

function downloadPDF() {
  const cvContainer = document.querySelector(".cv-container");
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF("p", "mm", "a4");

  html2canvas(cvContainer, {
    scale: 2,
    useCORS: true,
  }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      doc.addPage();
      doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    doc.save("CV.pdf");
  });
}

function downloadImage() {
  const cvContainer = document.querySelector(".cv-container");
  html2canvas(cvContainer).then((canvas) => {
    const link = document.createElement("a");
    link.download = "CV.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}
// theme toggling
document.addEventListener("DOMContentLoaded", function () {
  const themes = [
    "root",
    "light",
    "white",
    "black",
    "orange",
    "blue",
    "theme-1",
    "theme-2",
  ];
  let currentThemeIndex = 0;

  const themeToggleButton = document.getElementById("themeToggle");

  themeToggleButton.addEventListener("click", function () {
    document.body.classList.remove(themes[currentThemeIndex]);

    currentThemeIndex = (currentThemeIndex + 1) % themes.length;

    document.body.classList.add(themes[currentThemeIndex]);
  });

  document.body.classList.add(themes[currentThemeIndex]);
});

// Window scroll events
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".navbar a");

  if (window.scrollY > 50) {
    navbar.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    navLinks.forEach((link) => (link.style.color = "#fff"));
  } else {
    navbar.style.backgroundColor = "transparent";
    navLinks.forEach((link) => (link.style.color = "#000"));
  }
});
