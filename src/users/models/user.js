

//Nuestro objeto del usuario que vamos a manejar en la APP.
export class User {

  /**
   * 
   * @param {Like<Obeject>} userDateLike 
   */
  constructor({id, isActive, balance, avatar, firstName, lastName, gender}){
    
    this.id         = id; 
    this.isActive   = isActive;
    this.balance    = balance;
    this.avatar     = avatar;
    this.firstName  = firstName;
    this.lastName   = lastName;
    this.gender     = gender;

  }
}