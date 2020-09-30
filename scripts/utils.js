

const showPopUp = (popup) => {
  // Получает модальное окно как параметр, навешивает слушатели и открывает его
  if (popup === accountPopUp) {
    accountInputName.value = accountName.textContent;
    accountInputDesc.value = accountDescription.textContent;
  }


  popup.classList.add('popup_opened');
  popup.addEventListener('click', crossOverlayExit);
  document.addEventListener('keyup', ESCExit);
}
export default showPopUp;