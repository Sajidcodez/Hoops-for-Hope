let themeButton = document.getElementById("darkModeButton");


const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
};

themeButton.addEventListener("click", toggleDarkMode);


const validateForm = (event) => {
    event.preventDefault();
    let containsErrors = false;
    
    const rsvpInputs = document.getElementById("rsvp-form").elements;
    
    // Create a person object to store user data
    const person = {
        name: document.getElementById("name").value,
        state: document.getElementById("state").value,
        email: document.getElementById("email").value
    };
    
    // Validate name and state length
    if (person.name.length < 2) {
        containsErrors = true;
        document.getElementById("name").classList.add("error");
    } else {
        document.getElementById("name").classList.remove("error");
    }
    
    if (person.state.length < 2) {
        containsErrors = true;
        document.getElementById("state").classList.add("error");
    } else {
        document.getElementById("state").classList.remove("error");
    }
    
    // Validate email (contains '@')
    if (person.email.indexOf("@") === -1) {
        containsErrors = true;
        document.getElementById("email").classList.add("error");
    } else if (person.email.length >= 2) {
        document.getElementById("email").classList.remove("error");
    }
    
    if (!containsErrors) {
        addParticipant(person);
        document.getElementById("rsvp-form").reset();
    }
};

const addParticipant = (person) => {
    const newRSVP = document.createElement("p");
    newRSVP.textContent = `🎟️ ${person.name} from ${person.state} has RSVP'd.`;
    
    const rsvpList = document.querySelector(".rsvp-participants");
    rsvpList.appendChild(newRSVP);
    
    // Show the modal with the person's info
    toggleModal(person);
};


let rotateFactor = 0;
let modalImage = document.getElementById("modal-image");

// Function to animate the image
const animateImage = () => {
    if (rotateFactor === 0) {
        rotateFactor = -10;
    } else {
        rotateFactor = 0;
    }
    modalImage.style.transform = `rotate(${rotateFactor}deg)`;
};

// Function to close the modal
const closeModal = () => {
    let modal = document.getElementById("success-modal");
    modal.style.display = "none";
};

const toggleModal = (person) => {
    let modal = document.getElementById("success-modal");
    let modalText = document.getElementById("modal-text");
    
    
    modal.style.display = "flex";

   
    modalText.textContent = `Thanks for RSVPing, ${person.name}! We can't wait to see you at Hoops for Hope on April 20th!`;

  
    const intervalId = setInterval(animateImage, 500);

    
    setTimeout(() => {
       
        modal.style.display = "none";
      
        clearInterval(intervalId);
    }, 5000);
    
   
    document.getElementById("close-modal-btn").addEventListener("click", () => {
        closeModal();
        clearInterval(intervalId);
    });
};


const submitButton = document.getElementById("rsvp-button");
submitButton.removeEventListener("click", addParticipant); 
submitButton.addEventListener("click", validateForm);




