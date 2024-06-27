
/**
 * 
 * @param {Number} page función que nos permitira llamar a los usuarios.
 * @returns
 */
export const loadUsersByPage = async (page = 1) => {

  //URL para hacer la petición 

  const url = `${import.meta.env.VITE_BASE_URL}/users?_page=${ page }`;

  //FETCH
  const res = await fetch(url);

  //DATA EN SU FORMA JSON
  const data = await res.json();


  console.log(data);


}