
import { User } from './../models/user';


//CREACIÓN Y ACTUALIZACIÓN DEL MISMO ARCHIVO:
/**
 * 
 * @param {Like<User>} userLike 
 */
export const saveUser = async ( userLike  ) => {

  const user = new User(userLike);


  //TODO: AQUÍ FALTA UN MAPPERS.


  if (user.id){
    throw 'NO implementada la actualización'
    return;
  }

  const updateUser = await createUser(user);
  return updateUser;

}

/**
 * @param {Like<User>} User
 */
const createUser = async () =>{


  const url = `${import.meta.env.VITE_BASE_URL}/users`;
  const res = fetch(url, {
    method: 'POST',
    body: JSON.stringify(User),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const newUser = (await res).json();
  console.log({ newUser });
  return newUser;

}