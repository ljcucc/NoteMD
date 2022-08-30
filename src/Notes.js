export class Notes{

  initNotes(){
    if("list" in localStorage)
      return;

    this.setNotes([]);
  }

  getNotes(){
    this.initNotes();
    return JSON.parse(localStorage.getItem("list"));
  }

  // internal set method
  setNotes(list){
    localStorage.setItem("list", JSON.stringify(list));
  }

  updateNote(id, note){
    if(id.trim() == "") return;
    if(!(`note:${id}` in localStorage)) return;

    let notes = this.getNotes();
    for(var i in notes){
      if(id == notes[i].id){
        notes[i].title = note.title
        break;
      }
    }
    this.setNotes(notes);

    localStorage.setItem(`note:${id}`, JSON.stringify(note));
  }

  appendNote(note){
    if(`note:${note.id}` in localStorage) return;
    let notes = this.getNotes();
    notes.push({
      title: note.title,
      id: note.id,
      content: ""
    });
    console.log("newNote::uuid", notes);
    localStorage.setItem(`note:${note.id}`, JSON.stringify(note));
    this.setNotes(notes);
  }

  getNote(id){
    if(!(`note:${id}` in localStorage))
      return;
    
    return JSON.parse(localStorage.getItem(`note:${id}`));
  }

  deleteNote(id){
    if(!(`note:${id}` in localStorage)) return;
    localStorage.removeItem(`note:${id}`);
    let notes = this.getNotes();
    notes = notes.filter((note)=>
        id != note.id);
    this.setNotes(notes);
  }
}