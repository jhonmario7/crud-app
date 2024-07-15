import usersStore from "../../store/users-store";
import { showModal } from "../render-modal/render-modal";
import "./render-table.css";
import { deleteUserById } from './../../use-cases/delete-user-by-id';

let table;

const createTable = () => {
  const table = document.createElement("table");

  const tableHeaders = document.createElement("thead");
  tableHeaders.innerHTML = `
      <tr>
        <th>#ID</th>
        <th>Balance</th>
        <th>FirstName</th>
        <th>LastName</th>
        <th>Active</th>
        <th>Actions</th>
      </tr>
    `;

  //El tableBody es donde vamos a colocar nuestros registros.
  const tableBody = document.createElement("tbody");
  table.append(tableHeaders, tableBody);
  return table;
};

/**
 *
 * @param { MouseEvent} event
 */
const tableSelectListener = (event) => {

  const element = event.target.closest('.select-user');
  if( !element ) return;

  const id = element.getAttribute('data-id');
  showModal(id);
};


/**
 *
 * @param { MouseEvent} event
 */
const tableDeleteListener = async (event) => {

  const element = event.target.closest('.delete-user');
  if( !element ) return;

  const id = element.getAttribute('data-id');
  try {
    //Eliminamos.
    await deleteUserById(id);
    //Recargamos la pagina.
    await usersStore.reloadPage();
    //Cambiamos la pagina en el caso de que esto haya sucedido.
    document.querySelector('#current-page').innerText = usersStore.getCurrentPage();
    //Renderizamos la pagina.
    renderTable();

  } catch (error) {
    console.log(error);
    alert('No se pudo eliminar :(')
  }
};



/**
 *
 * @param {HTMLDivElement} element
 */
export const renderTable = (element) => {
  const users = usersStore.getUsers();

  if (!table) {
    table = createTable();
    element.append(table);

    //Listeners a la table:
    table.addEventListener('click', tableSelectListener);
    table.addEventListener('click', tableDeleteListener);

  }
  let tableHTML = '';

  users.forEach((user) => {
    tableHTML += `
    <tr>
        <th>${user.id}</th>
        <td>${user.balance}</td>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.isActive}</td>
        <td>
          <a href='#/' class='select-user' data-id=${user.id}>Select</a>
          |
          <a href='#/' class='delete-user' data-id=${user.id}>Delete</a>
        </td>
    </tr>
    `;
  });

  table.querySelector('tbody').innerHTML = tableHTML;
};
