import { renderButtons } from "./presentation/render.buttons/render-buttons";
import { renderTable } from "./presentation/render.table/render-table";
import usersStore from "./store/users-store";
import { renderAddButton } from './presentation/render-add-button/render-add-button';
import { renderModal } from "./presentation/render-modal/render-modal";
import { saveUser } from './use-cases/save-user';


/**
 * 
 * @param {HTMLDivElement} element 
 */
export const UsersApp = async (element) => {

  element.innerHTML = 'Loading...';

  await usersStore.loadNextPage();

  element.innerHTML = '';


  renderTable(element);
  // console.log(usersStore.getUsers());
  renderButtons(element);
  renderAddButton(element);
  renderModal(element, async (userLike) => {

    const user = await saveUser(userLike);
    //actualizamos el store:
    usersStore.onUserChange(user);
    renderTable();
  }
  );

}