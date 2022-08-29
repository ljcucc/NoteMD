import {LitElement, html, css} from '/lib/lit.min.js';

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
    overflow-y: scroll;
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
    const note = localStorage.getItem(`note:${this.uuid}`) || "";
    console.log({
      note,
      uuid: this.uuid
    })
    txt.value = note.content || "";
  }

  onChange(){
    const txt = this.renderRoot.querySelector("textarea");
    let note = localStorage.getItem(`note:${this.uuid}`) || {};
    note.content = txt.value
    localStorage.setItem(this.uuid, note);
  }

  render(){
    console.log(this.logs);
    return html`
    <textarea @change="${this.onChange}" class="chat-box"></textarea>
    `
  }
}

customElements.define("note-editor", NoteEditor);