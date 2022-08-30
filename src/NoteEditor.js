import {LitElement, html, css} from '/lib/lit.min.js';
import { Notes } from "/src/Notes.js";

class NoteEditor extends LitElement {
  static properties = {
    uuid: {type: String}
  }
  static styles = css`
  .chat-box{
    width: 100%;
    height: 100%;
    /* max-width: 100vw; */
    /* display: inline-flex; */
    /* flex-direction: column; */
    /* gap: 8px; */
    padding: 32px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    font-family:Helvetica, Arial, sans-serif;
    font-size: 16px;
    overflow-y: auto;
    overflow-x: hidden;
    outline: none;
    border: none;

    resize: none;
  }

  .line.other{
    margin-right:auto;
    border-top-left-radius: var(--br);
    border-top-right-radius: var(--br);
    border-bottom-right-radius: var(--br);
    --bg: #e0e0e0;
    --txt: black;
  }

  .line.me{
    margin-left:auto;
    border-top-left-radius: var(--br);
    border-top-right-radius: var(--br);
    border-bottom-left-radius: var(--br);
    --bg: rgb(76, 145, 199);
    --txt: white;
  }

  .nickname{
    font-weight: bold;
    font-size: 14px;
    color: rgb(0,0,0);
    opacity: 0.75;
    margin-right: 16px;
  }

  .msg{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
  }

  .line{
    /* display: inline-flex; */
    --br: 20px;
    display: flex;
    flex-direction: column;
    background:var(--bg);

    word-wrap: normal;
    max-width: 50vw;

    padding: 10px 16px;
    margin-bottom: 16px;


    color: var(--txt);
    font-size: 16px;
    
    word-break: break-all;
  }

  .hint{
    margin: 16px auto;
    padding: 12px 16px;
    background: rgba(0,0,0,0.05);
    color: rgba(0,0,0,0.35);
    border-radius: 30px;
    word-break: break-all;
    box-sizing: border-box;
    font-size: 14px;
  }

  #load_content{
    margin: 16px auto;
    padding: 12px 16px;
    background: rgba(0,0,0,0.15);
    color: rgba(0,0,0,0.7);
    border-radius: 30px;
    cursor: pointer;
    transition: background 0.15s;
    border:none;
    outline: none;
    font-size: 16px;
  }

  #load_content:hover{
    background: rgba(0,0,0,0.35);
  }

  #load_content:active{
    background: rgba(0,0,0,0.55);
    /* color:white; */
  }
  `;

  constructor(){
    super();

    this.uuid = "";
  }

  updated(){
    // const cb = this.renderRoot.querySelector(".chat-box")
    // cb.scrollTop = cb.scrollHeight;
    // console.log("scroll")
  }

  updated(){
    const txt = this.renderRoot.querySelector("textarea");
    // const note = JSON.parse(localStorage.getItem(`note:${this.uuid}`) || "{}");
    const note = new Notes().getNote(this.uuid);
    if(!note) {
      txt.value = "";
      return;
    }
    console.log({
      note,
      uuid: this.uuid
    })
    txt.value = note.content || "";
  }

  getTitle(txt){
    let list = txt.split("\n");
    for(var i in list){
      var key = list[i].split(":");
      if(key[0] == "title" && key[1].trim()){
        return key[1].trim();
      }
    }
  }

  // updateTitle(uuid, title){
  //   // let list = JSON.parse(localStorage.getItem("list") || "[]");
  //   let list = new Notes().getNotes();
  //   for(var i in list){
  //     if(uuid == list[i].id){
  //       list[i].title = title
  //       break;
  //     }
  //   }
  //   // localStorage.setItem("list", JSON.stringify(list));
  // }

  onChange(){
    const txt = this.renderRoot.querySelector("textarea");
    if(!this.uuid){
      txt.value = "";
      return;
    }
    // let note = JSON.parse(localStorage.getItem(`note:${this.uuid}`) || "{}" );
    let n = new Notes();
    let note = n.getNote(this.uuid);
    note.content = txt.value
    note.title = this.getTitle(txt.value.split("...")[0] || "Untitled")
    // this.updateTitle(note.id, note.title)
    console.log(note);
    n.updateNote(this.uuid, note);
    // localStorage.setItem(`note:${this.uuid}`, JSON.stringify(note))

    this.dispatchEvent(new Event("update"))
  }

  render(){
    console.log(this.logs);
    return html`
    <textarea @keyup="${this.onChange}" @change="${this.onChange}" class="chat-box"></textarea>
    `
  }
}

customElements.define("note-editor", NoteEditor);