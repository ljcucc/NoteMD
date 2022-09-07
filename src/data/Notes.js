// import "/src/data/Config.h";

import { LocalDatabase, MDServerDatabase } from "./Database.js";
import { Config } from "./Config.js";

// let notes = new Notes(new LocalDatabase());

// handle all low abstract note actions
export class Notes{
  constructor(db){
    if(!db) throw "No Database Strategy found!";
    this.db = db;
  }

  async #initNotes(){
    if(await this.db.isExists("list"))
      return;

    await this.#setNotes([]);
  }

  // get raw notes object (JSON)
  async getNotes() {
    await this.#initNotes();
    return JSON.parse(await this.db.getItem("list"));
  }

  async getNotesList() {
    await this.#initNotes();
    let strategy = this;
    return await Promise.all(
      JSON.parse(await this.db.getItem("list")).map(
        noteJSONObj => (async () => {
          let note = new Note(strategy);
          await note.open(noteJSONObj.id)
          return note;
        })()
      )
    );
  }

  // internal set method
  async #setNotes(list) {
    await this.db.setItem("list", JSON.stringify(list));
  }

  async updateNote(id, note) {
    if (id.trim() == "") return;
    if (!await this.db.isExists(`note:${id}`)) return;

    let notes = await this.getNotes();
    for (var i in notes) {
      if (id == notes[i].id) {
        notes[i].title = note.title
        break;
      }
    }
    await this.#setNotes(notes);

    await this.db.setItem(`note:${id}`, JSON.stringify(note));
  }

  #uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

  async setNoteIndex(id, key, value){
    console.log("setting note index", key, value)
    let list = await this.getNotes() || [];
    list.map(e=>{
      if(e.id != id) return e;
      e[key] = value;
      return e;
    });
    await this.#setNotes(list);
  }

  async getNoteIndex(id, key){
    let list = await this.getNotes() || [];
    for(var i in list){
      if(list[i].id == id){
        console.log("getting note index", key, list[i][key])
        return list[i][key];
      }
    }
  }

  async appendNote(note) {
    // if(await this.db.isExists(`note:${note?.id||""}`)) return;
    let notes = await this.getNotes();
    let id = "";
    while (await this.db.isExists(`note:${(id = this.#uuidv4())}`)) {
      console.log("recreating uuid...")
    }
    const template = {
      title: "Untitled",
      id,
      content: ""
    };

    notes.push(template);
    console.log("newNote::uuid", notes);
    await this.db.setItem(`note:${id}`, JSON.stringify(template));
    await this.#setNotes(notes);

    return id;
  }

  async getNote(id) {
    if (!await this.db.isExists(`note:${id}`))
      return;

    return JSON.parse(await this.db.getItem(`note:${id}`));
  }

  async deleteNote(id) {
    if (!await this.db.isExists(`note:${id}`)) return;
    await this.db.removeItem(`note:${id}`);
    let notes = await this.getNotes();
    notes = notes.filter((note) =>
      id != note.id);
    await this.#setNotes(notes);
  }
}

export class LocalNotes extends Notes {
  constructor() {
    super(new LocalDatabase());
  }
}

export class ServerNotes extends Notes {
  constructor() {
    super(
      new MDServerDatabase(
        {
          url: new Config().getLocalConfig("backend-server-address", "http://localhost"),
          port: new Config().getLocalConfig("backend-server-port", 8081),
          jwt: new Config().getLocalConfig("backend-server-passwd", "")
        }
      )
    );

    console.log( {
          url: new Config().getLocalConfig("backend-server-address", "http://localhost"),
          port: new Config().getLocalConfig("backend-server-port", 8081),
          jwt: new Config().getLocalConfig("backend-server-passwd", "")
        })
  }
}

// doing all high abstract note action, you can handle Note as an note object
// handle it to interact with a single note that targetted.
export class Note{
  #notes;
  #uuid = "";
  #obj = null;

  constructor(notes){
    this.#notes = notes;
  }

  // fetch note when updated
  async #fetchNote(){
    this.#obj = await this.#notes.getNote(this.#uuid);
  }

  // pushing note when updated
  async #pushNote(){
    await this.#notes.updateNote(this.#uuid, this.#obj);
  }

  async open(uuid){
    this.#uuid = uuid;
    this.#obj = await this.#notes.getNote(uuid);
    console.log(this.#obj)
  }

  async create(title, content){
    let uuid = await this.#notes.appendNote(title || "untitle", content || "");
    await this.open(uuid);
  }

  async delete(){
    await this.#notes.deleteNote(this.#uuid)
  }

  async getTitle(){
    await this.#fetchNote();
    return this.#obj?.title || "";
  }

  async updateLastOpen(){
    await this.#notes.setNoteIndex(this.#uuid, "last_open", new Date().getTime());
  }

  async getLastOpen(){
    let lastOpen = await this.#notes.getNoteIndex(this.#uuid, "last_open") || 0;
    return lastOpen;
  }

  getTitleSync(){
    return this.#obj?.title || "";
  }

  getContentSync(){
    return this.#obj?.content || "";
  }

  async getContent(){
    await this.#fetchNote();
    return this.#obj?.content || "";
  }

  async setTitle(title){
    if(this.#uuid == "") return false;

    this.#obj.title = title;
    await this.#pushNote();
    return true;
  }

  async setContent(content){
    if(this.#uuid == "") return false;

    console.log(content)
    this.#obj["content"] = content;
    await this.#pushNote();
    return true;
  }
}