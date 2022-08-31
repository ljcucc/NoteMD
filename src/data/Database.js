// export class Database{
//   constructor();
//   setItem();
//   getItem();
//   isExists();
// }

// /**
//  * 
//  * @param {string} strategy stragtegy must be "local" or "md-server", if not set, then will reference from localStorage by config
//  */
// export function getDatabase(strategy){

// }

export class LocalDatabase{
  constructor(){
  }

  setItem(key, value){
    localStorage.setItem(key, value);
  }

  getItem(key){
    return localStorage.getItem(key);
  }

  removeItem(key){
    localStorage.removeItem(key)
  }

  isExists(key){
    return (key in localStorage);
  }
}