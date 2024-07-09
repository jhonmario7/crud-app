import modalhtml from "./render-modal.html?raw";
import "./render-modal.css";

let modal, form;

//Funcionalidades para comportamiento del modal.

// TODO: CARGAR EL USUARIO POR ID
export const showModal = () => {
  modal?.classList.remove("hide-modal");
};

export const hideModal = () => {
  modal?.classList.add("hide-modal");

  form?.reset();
};

/**
 *
 * @param {HTMLDivElement} element
 * @param {(userLike)=> Promise<void>} callback
 */
export const renderModal = (element, callback) => {
  if (modal) return;

  modal = document.createElement("div");
  modal.innerHTML = modalhtml;
  //Esto es para que oculte ese modal.
  modal.className = "modal-container hide-modal";

  //Creamos el form para evitar el refresh de la pagina cuando enviamos datos desde la modal.
  form = modal.querySelector("form");

  //METODO PARA OCULTAR EL MODAL:
  modal.addEventListener("click", (event) => {
    if (event.target.className === "modal-container") {
      hideModal();
    }
  });

  //METODO PARA REENVIAR EL FORMULARIO Y PREVENGA HACER EL REFRESH DE LA PAGINA.

  form.addEventListener("submit", async(event) => {
    event.preventDefault();

    // console.log('Formulario Enviado.');

    const formData = new FormData(form);

    // if(!formData.get('isActive')){
    //   formData.append('isActive', 'off');
    // }

    const userLike = {};

    //DESTRUCTURAMOS:
    for (const [key, value] of formData) {
      if (key === 'balance') {
        userLike[key] = +value;
        continue;
      }

      if (key === 'isActive') {
        userLike[key] = (value === 'on') ? true : false;
        continue;
      }
      // if((key === 'isActive')){
      //   (!userLike['isActive']) = false
      //   continue;
      // }

      userLike[key] = value;
    }

    // console.log(userLike);
    await callback(userLike);

    hideModal();

  });

  element.append(modal);
};
