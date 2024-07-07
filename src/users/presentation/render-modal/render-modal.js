import modalhtml from './render-modal.html?raw';


let modal;

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderModal = (element) => {


  if (modal) return;


  modal = document.createElement('div');
  modal.innerHTML = modalhtml;


}