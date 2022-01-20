const buttonId = document.getElementById('students-modal');
const modalContainer = document.getElementById('students-container');

buttonId.addEventListener('click', openModal);
modalContainer.addEventListener('click', closeModal);

function openModal() {
  modalContainer.removeAttribute('.class');
  modalContainer.classList.add('one');
  document.body.classList.add('students-active');
}

function closeModal() {
  modalContainer.classList.add('out');
  document.body.classList.remove('students-active');
  setTimeout(() => {
  modalContainer.classList.remove('one');
  modalContainer.classList.remove('out');
  }, 1500);
}