import { LocalDatabase } from "/src/data/Database.js";

export class Config{
  constructor(){
    this.db = new LocalDatabase();
  }

  initConfig(){
    if(!this.db.isExists("config: init")){
      const defaultVal = {
        "font-size": 16,
        "font-family": "sans",
        "storage-solution": "local"
      }
    }
  }

  setConfig(key, value){
    if(!key) return;

    this.db.setItem(this._getKey(key), value);
  }

  _getKey(key){
    return `config: ${key}`
  }

  getConfig(key, defaultVal){
    if(!key) return;
    
    if (!this.db.isExists(this._getKey(key))) {
      console.log("key not exists");
      this.db.setItem(this._getKey(key), defaultVal);
      return defaultVal;
    }


    return this.db.getItem(this._getKey(key));
  }
}