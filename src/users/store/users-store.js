import { loadUsersByPage } from "../use-cases/load-users-by-page";

const state = {
  currentPage: 0,
  users: [],
};

//Metodos:

const loadNextPage = async () => {
  const users = await loadUsersByPage(state.currentPage + 1);
  if (users.length === 0) return;

  state.currentPage += 1;
  state.users = users;
  // console.log(state);
};

const loadPreviusPage = async () => {
  if (state.currentPage === 1) return;
  const users = await loadUsersByPage(state.currentPage - 1);
  state.users = users;
  state.currentPage -= 1;
};

const onUserChange = () => {
  throw new Error("No implementado");
};

//TODO:
const reloadPage = () => {
  throw new Error("No implementado");
};

export default {
  loadNextPage,
  loadPreviusPage,
  onUserChange,
  reloadPage,

  //afuera de ese Store, tengamos acceso a cual va ser la pagina actual, y sus usuarios.

  //OPERADOR SPER "..." para esparcir cada uno de ellos.

  /**
   *
   * @returns {User[]}
   */
  getUsers: () => [...state.users],

  //Para saber cual es la pagina actual, y este no va pasar por referencua como el de arriba, porque los primitivos
  // que en este caso un "0" pasan por valor. Los Objetos siempre pasan por referencia en JS y los Objetos por valor.

  /**
   *
   * @returns {Number}
   */
  getCurrentPage: () => state.currentPage,
};
