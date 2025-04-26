const themeButton = document.getElementById("darkModeButton")

const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode")
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark")
  } else {
    localStorage.setItem("theme", "light")
  }
}

themeButton.addEventListener("click", toggleDarkMode)

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode")
  }
})

const validateForm = (event) => {
  event.preventDefault()
  let containsErrors = false

  const person = {
    name: document.getElementById("name").value,
    state: document.getElementById("state").value,
    email: document.getElementById("email").value,
  }

  if (person.name.length < 2) {
    containsErrors = true
    document.getElementById("name").classList.add("error")
  } else {
    document.getElementById("name").classList.remove("error")
  }

  if (person.state.length < 2) {
    containsErrors = true
    document.getElementById("state").classList.add("error")
  } else {
    document.getElementById("state").classList.remove("error")
  }

  if (person.email.indexOf("@") === -1) {
    containsErrors = true
    document.getElementById("email").classList.add("error")
  } else if (person.email.length >= 2) {
    document.getElementById("email").classList.remove("error")
  }

  if (!containsErrors) {
    addParticipant(person)
    document.getElementById("rsvp-form").reset()
  }
}

const addParticipant = (person) => {
  const newRSVP = document.createElement("p")
  newRSVP.textContent = `🎟️ ${person.name} from ${person.state} has RSVP'd.`

  const rsvpList = document.querySelector(".participants-list")
  rsvpList.appendChild(newRSVP)

  toggleModal(person)
}

let rotateFactor = 0
const modalImage = document.getElementById("modal-image")

const animateImage = () => {
  if (rotateFactor === 0) {
    rotateFactor = -10
  } else {
    rotateFactor = 0
  }
  modalImage.style.transform = `rotate(${rotateFactor}deg)`
}

const closeModal = () => {
  const modal = document.getElementById("success-modal")
  modal.style.display = "none"
}

const toggleModal = (person) => {
  const modal = document.getElementById("success-modal")
  const modalText = document.getElementById("modal-text")

  modal.style.display = "flex"
  modalText.textContent = `Thanks for RSVPing, ${person.name}! We can't wait to see you at Hoops for Hope on April 20th!`

  const intervalId = setInterval(animateImage, 500)

  setTimeout(() => {
    modal.style.display = "none"
    clearInterval(intervalId)
  }, 5000)

  document.getElementById("close-modal-btn").addEventListener("click", () => {
    closeModal()
    clearInterval(intervalId)
  })
}

const submitButton = document.getElementById("rsvp-button")
submitButton.removeEventListener("click", addParticipant)
submitButton.addEventListener("click", validateForm)