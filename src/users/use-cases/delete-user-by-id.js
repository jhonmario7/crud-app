



//Aqui voy a poder eliminar un registro.
/**
 * @param {String|Number} id
 */
export const deleteUserById = async (id) => {
  const url = `${import.meta.env.VITE_BASE_URL}/users/${id}`;

  const res = await fetch(url, {
    //Configuración para eliminar.
    method: 'DELETE',
  });

  //Si todo sale bien mi backend me va regresar mi data:
  const deleateResult = await res.json();
  console.log({ deleateResult });

  return true;
};


