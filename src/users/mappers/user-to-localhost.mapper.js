import { User } from "./../models/user";

// Aquí vamos hacer el proceso opuesto, yo tengo una instancia de mi clase, y la voy a convertir a lo que espera el backend.

/**
 * @param {User} user
 */
export const userModelToLocalhost = (user) => {
  //Proceso de conversión:
  const { avatar, balance, firstName, gender, id, isActive, lastName } = user;

  return {
    avatar,
    balance,
    first_name: firstName,
    gender,
    id,
    isActive,
    last_name: lastName,
  };
};
