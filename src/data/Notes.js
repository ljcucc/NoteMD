import { LocalDatabase } from "/src/data/Database.js";
// import "/src/data/Config.h";

export class Notes{
  constructor(){
    this.db = new LocalDatabase();
  }

  initNotes(){
    if(this.db.isExists("list"))
      return;

    this.setNotes([]);
  }

  getNotes(){
    this.initNotes();
    return JSON.parse(this.db.getItem("list"));
  }

  // internal set method
  setNotes(list){
    this.db.setItem("list", JSON.stringify(list));
  }

  updateNote(id, note){
    if(id.trim() == "") return;
    if(!this.db.isExists(`note:${id}`)) return;

    let notes = this.getNotes();
    for(var i in notes){
      if(id == notes[i].id){
        notes[i].title = note.title
        break;
      }
    }
    this.setNotes(notes);

    this.db.setItem(`note:${id}`, JSON.stringify(note));
  }

  _uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

  appendNote(note){
    if(this.db.isExists(`note:${note.id}`)) return;
    let notes = this.getNotes();
    const id = this._uuidv4();

    notes.push({
      title: note.title,
      id,
      content: ""
    });
    console.log("newNote::uuid", notes);
    this.db.setItem(`note:${id}`, JSON.stringify(note));
    this.setNotes(notes);

    return id;
  }


  getNote(id){
    if(!this.db.isExists(`note:${id}`))
      return;
    
    return JSON.parse(this.db.getItem(`note:${id}`));
  }

  deleteNote(id){
    if(!this.db.isExists(`note:${id}`)) return;
    this.db.removeItem(`note:${id}`);
    let notes = this.getNotes();
    notes = notes.filter((note)=>
        id != note.id);
    this.setNotes(notes);
  }
}