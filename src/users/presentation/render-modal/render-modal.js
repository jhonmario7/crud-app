import modalhtml from "./render-modal.html?raw";
import "./render-modal.css";
import { User } from "./../../models/user";
import { getUserById } from "./../../use-cases/get-user-by-id";

let modal, form;
let loadedUser = {};

//Funcionalidades para comportamiento del modal.

//Aquí vamos a recibir el id.

/**
 *
 * @param {String|Number} id
 */
export const showModal = async (id) => {
  modal?.classList.remove("hide-modal");
  loadedUser = {};

  //Si viene un id se tiene que cargar:
  if (!id) return;
  const user = await getUserById(id);
  setFormValues(user);
};

export const hideModal = () => {
  modal?.classList.add("hide-modal");

  form?.reset();
};

//Cargamos la infomración del formulario:
/**
 *
 * @param {User} user
 */
const setFormValues = (user) => {
  form.querySelector('[name= "firstName"]').value = user.firstName;
  form.querySelector('[name= "lastName"]').value = user.lastName;
  form.querySelector('[name= "balance"]').value = user.balance;
  form.querySelector('[name= "isActive"]').checked = user.isActive;
  //Esta variable la estoy usando cuando la persona venga y este editando un usuario
  loadedUser = user;
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

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // console.log('Formulario Enviado.');

    const formData = new FormData(form);

    if(!formData.get('isActive')){
      formData.append('isActive', 'off');
    }

    //Sprect reparte los datos en el modal.
    const userLike = { ...loadedUser };

    //DESTRUCTURAMOS:
    for (const [key, value] of formData) {
      if (key === "balance") {
        userLike[key] = +value;
        continue;
      }

      if (key === "isActive") {
        userLike[key] = value === "on" ? true : false;
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
