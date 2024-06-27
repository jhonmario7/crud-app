

//Nuestro objeto del usuario que vamos a manejar en la APP.
export class User {

  /**
   * 
   * @param {Like<Obeject>} userDateLike 
   */
  constructor(id, isActive, balance, avatar, firtName, lastName, gender){
    
    this.id         = id; 
    this.isActive   = isActive;
    this.balance    = balance;
    this.avatar     = avatar;
    this.firtName   = firtName;
    this.lastName   = lastName;
    this.gender     = gender;


  }


}