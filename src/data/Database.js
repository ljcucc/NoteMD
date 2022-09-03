import { Config } from "/src/data/Config.js";

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

export function getStorageStrategyType(){
  return localStorage.getItem("config: storage-solution") || "local";
}

export function getDatabaseWithStrategy(){
  // let localConfig = new LocalDatabase()
  let storageStrategy = getStorageStrategyType();
  console.log("getting strategy...");

  switch(storageStrategy){
    case "local":
      return new LocalDatabase();
    case "md-server":
      const config = new Config(new LocalDatabase());

      const url = config.getLocalConfig("url", "http://localhost");
      const port = config.getLocalConfig("port", 8081);
      const key = config.getLocalConfig("key", "");

      return new MDServerDatabase({
        url,
        port,
        key
      });
    default:
      console.log("switching to default strategy...", storageStrategy);
      return new LocalDatabase();
  }
}

export class LocalDatabase{
  constructor(){
  }

  async setItem(key, value){
    localStorage.setItem(key, value);
  }

  async getItem(key){
    return localStorage.getItem(key);
  }

  async removeItem(key){
    localStorage.removeItem(key)
  }

  async isExists(key){
    return (key in localStorage);
  }
}

export class MDServerDatabase extends LocalDatabase{
  #existsCahce = {};

  constructor(options){
    super();
    const {url, port, jwt} = options;
    this.url = url || "";
    this.port = port || 8080;
    this.jwt = jwt || "";
  }


  async _request(path, body){
    body = body || {};
    body.jwt = this.jwt;
    let data = await (await fetch(`${this.url}:${this.port}${path}`, {
      method: "POST",
      headers:{
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Credentials': true,
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "POST"
      },
      body: JSON.stringify(body)
    })).json();

    console.log(body);
    console.log(data);
    return data;
  }

  async test(){
    console.log("run testing...");
    let data = await this._request("/api/test");
    console.log(data);
    console.log("testing done");
  }

  async setItem(key, value){
    this.#existsCahce[key] = value;
    let data = await this._request("/api/set", {
      key,
      value
    });
  }

  async getItem(key){
    if(key in this.#existsCahce) return this.#existsCahce[key];
    return (await this._request("/api/get", {
      key
    })).value;
  }

  async removeItem(key){
    await this._request("/api/remove", {
      key
    });
    delete this.#existsCahce[key];
  }

  async isExists(key){
    if(key in this.#existsCahce)
      return this.#existsCahce[key];

    const result = (await this._request("/api/is_exists", {
      key
    })).result;
    
    return result;
  }
}