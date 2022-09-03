// import { LocalDatabase, MDServerDatabase } from "/src/data/Database.js";

import { LocalDatabase } from "/src/data/Database.js";

export class Config{
  constructor(db){
    // if(!db) throw "No Database Strategy found!";
    // this.db = db;
    this.db = new LocalDatabase()
  }

  async initConfig(){
    if(!await this.db.isExists("config: init")){
      const defaultVal = {
        "font-size": 16,
        "font-family": "sans",
        "storage-solution": "local"
      }
    }
  }

  async setConfig(key, value){
    if(!key) return;

    await this.db.setItem(this._getKey(key), value);
  }

  _getKey(key){
    return `config: ${key}`
  }

  getLocalConfig(key, defaultValue){
    const hash = this._getKey(key);
    if(!(hash in localStorage)) return defaultValue;

    return localStorage.getItem(hash);
  }

  setLocalConfig(key, value){
    localStorage.setItem(key, JSON.stringify(value));
  }

  async getConfig(key, defaultVal){
    if(!key) return;
    
    if (!await this.db.isExists(this._getKey(key))) {
      console.log("key not exists");
      await this.db.setItem(this._getKey(key), defaultVal);
      return defaultVal;
    }


    return await this.db.getItem(this._getKey(key));
  }
}