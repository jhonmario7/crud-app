import { User } from "./../models/user";
import { localhostUserToModel } from './../mappers/localhost-user.mapper';
import { userModelToLocalhost } from "./../mappers/user-to-localhost.mapper";


//CREACIÓN Y ACTUALIZACIÓN DEL MISMO ARCHIVO:
/**
 *
 * @param {Like<User>} userLike
 */

//Estamos creando la variable saveUser para que pueda determinar un ID:
export const saveUser = async (userLike) => {
  const user = new User(userLike);

  //Validación para que arroje un error si la persona envie los datos vacios.
  if (!user.firstName || !user.lastName)
    throw "First &  last Name are required.";

  //Creamos una variable que se llama userToSave = al mapper que creamos, y vamos a llamar la instancia.
  const userToSave = userModelToLocalhost(user);
  let userUpdated;
  //Si tenemos un user id:
  if (user.id) {
    userUpdated = await updateUser( userToSave );
  } else {
    //Si ya existe actualizo, si no, voy a llamar  una constante, aquí llamamos la instancia de userToSave.
    userUpdated = await createUser( userToSave );
  }

  return localhostUserToModel(userUpdated);
};

//Aqui voy a recibir a un usuario que luce como un usuario pero realmente va ser el usuario que tengo que grabar en el backend.
/**
 * @param {Like<User>} User
 */
const createUser = async (user) => {
  const url = `${import.meta.env.VITE_BASE_URL}/users`;

  const res = fetch(url, {
    //Configuración para enviar una configuración post:
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

  //Si todo sale bien mi backend me va regresar mi data:
  const newUser = await res.json();
  console.log({ newUser });

  return newUser;
};

//Aqui voy a recibir a un usuario que luce como un usuario pero realmente va ser el usuario que tengo que grabar en el backend.
/**
 * @param {Like<User>} User
 */
const updateUser = async (user) => {
  const url = `${import.meta.env.VITE_BASE_URL}/users/${user.id}`;

  const res = await fetch(url, {
    //Configuración para enviar una configuración post:
    method: "PATCH",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

  //Si todo sale bien mi backend me va regresar mi data:
  const updateUser = await res.json();
  console.log({ updateUser });

  return updateUser;
};
