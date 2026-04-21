const modal = document.getElementById("modal");
const openBtn = document.querySelector('.submit-button');
const closeBtn = document.querySelector(".close");

openBtn.onclick = () => {
    modal.style.display = "block";
};

closeBtn.onclick = () => {
    modal.style.display = "none";
};