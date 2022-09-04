import { LitElement, html, css, classMap, until} from '/lib/lit.min.js';
import { Notes } from "/src/data/Notes.js";

import { getDatabaseWithStrategy } from "/src/data/Database.js";
import { Config } from './data/Config.js';

let config = new Config();

class NoteEditor extends LitElement {
  static properties = {
    fontSize: {type: Number},
    fontFamily: {type: String},
    note: { type: Object },
  }

  static styles = css`
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');

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

  .font-sans{
    font-family:Helvetica, Arial, sans-serif;
  }

  .font-serif{
    font-family: serif;
  }

  .font-mono{
    /* font-family: monospace; */
    font-family: 'Roboto Mono', monospace;
  }
  `;

  constructor(){
    super();

    this.fontSize = 16;
    this.fontFamily = "sans"

    this.note = null;
  }

  async updated(){
    const txt = this.renderRoot.querySelector("textarea");
    const note = this.note;
    if(!note) {
      txt.value = "";
      return;
    }
    console.log({
      note,
    })
    txt.value = (await note.getContent()) || "";
  }

  getTitleFromMetadata(txt){
    let list = txt.split("\n");
    for(var i in list){
      var key = list[i].split(":");
      if(key[0] == "title" && key[1].trim()){
        return key[1].trim();
      }
    }
  }

  async onChange(){
    const txt = this.renderRoot.querySelector("textarea");

    if(!this.note){
      txt.value = "";
      return;
    }

    let note = this.note;
    await note.setContent(txt.value);
    await note.setTitle(this.getTitleFromMetadata(txt.value.split("...")[0] || "Untitled"));

    this.dispatchEvent(new Event("update"))
  }

  async onType(e){
    if(config.getLocalConfig("auto-backup-solution", "onchange") != "ontype") return;
    await this.onChange()
  }

  onKeyPress(e){
    const txt = this.renderRoot.querySelector("textarea");

    if (txt.selectionStart != txt.selectionEnd) {
      switch (e.key) {
        case "_":
        case "~":
        case "`":
        case "*":
        case "[":
        case "(":
          e.preventDefault();

          var start = txt.selectionStart
          var end = txt.selectionEnd;
          console.log(start, end)

          // txt.value = txt.value.slice(0, start) + "*" + txt.value.slice(start, end) + "*" + txt.value.slice(end);
          const replaceTailChar = {
            "_":"_",
            "~": "~",
            "`":"`",
            "*":"*",
            "[":"]",
            "(":")",
          }

          document.execCommand("insertText", false, e.key + txt.value.slice(start, end) + replaceTailChar[e.key]);
          txt.setSelectionRange(start + 1, end + 1, "forward");
          this.onChange();
          break;
        default:
          return;
      }
    }

    if(e.keyCode == 13){
      e.preventDefault();

      var start = txt.selectionStart 
      var end = txt.selectionEnd;
      var indentLine = txt.value.substring(0, start).split("\n");

      indentLine = indentLine.pop()
      var count = indentLine.indexOf(indentLine.trim())
      // txt.value = txt.value.slice(0, start) + "\n" + " ".repeat(count) + txt.value.slice(start);
      document.execCommand("insertText", false,  "\n" + " ".repeat(count));

      txt.selectionStart = start + count + 1;
      txt.selectionEnd = start + count + 1;
      this.onChange();

      return;
    }
  }

  onKeyDown(e) {
    if (e.key != "Tab"){
      // console.log(e.key);
      return;
    }
    e.preventDefault();

    const txt = this.renderRoot.querySelector("textarea");
    const start = txt.selectionStart;
    // console.log(start);
    txt.value = txt.value.slice(0, start) + " ".repeat(4) + txt.value.slice(start);

    txt.selectionStart = start + 4;
    txt.selectionEnd = start + 4;

    this.onChange();
  }

  render(){
    console.log(this.logs);
    return html`
    <textarea style="font-size: ${this.fontSize}px;" @keydown="${this.onKeyDown}" @keypress="${this.onKeyPress}" @keyup="${this.onType}" @change="${this.onChange}" class="chat-box font-${this.fontFamily}"></textarea>
    `
  }
}

customElements.define("note-editor", NoteEditor);