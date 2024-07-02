
import { User } from './../models/user';


/**
 * 
 * @param {Like<User>} localhostUser 
 * @returns {User}
 */
  export const localhostUserToModel = ( localhostUser ) => {

    //Regresar una nueva instancia de nuestro usuario.
      const {

        avatar,
        balance,
        first_name,
        gender,
        id,
        isActive,
        last_name,

      } = localhostUser;

      //Regresamos una nueva instancia de mi usuario:
  return new User({
    avatar,
    balance,
    firstName: first_name,
    gender,
    id,
    isActive,
    lastName: last_name,
  });
  }



