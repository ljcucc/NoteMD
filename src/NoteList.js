import { getStorageStrategyType } from './data/Database.js';
import { Note, LocalNotes, ServerNotes } from '/src/data/Notes.js';
import {LitElement, html, css, until} from '/lib/lit.min.js';
import "/src/components/Icons.js";

class SearchBar extends LitElement{
  static styles = css`
    .search-bar{
      padding: 16px 24px;
      width: 100%;
    }

    input{
      padding: 12px;
      background: rgba(0,0,0,.05);
      border-radius: 10px;
      outline:none;
      border: none;
      font-size: 16px;

      width: 100%;
      box-sizing: border-box;
    }

    input::placeholder{
      color: rgba(0,0,0,.35);
    }

    form{
      width: 100%;
      box-sizing: border-box;
    }

    h2.title{
      font-size: 30px;
      font-weight: bold;
      font-family: Helvetica,Arial, sans-serif;
      padding: 24px;
      margin-bottom: 0px;
    }

  `;

  submit(){
    const input = this.renderRoot.querySelector("input");
    const value = input.value;
    this.dispatchEvent(new CustomEvent("search", {
      detail: {value}
    }))
  }
  
  render(){
    return html`
    <h2 class="title">Notes</h2>
    <form action="javascript:void(0);" class="search-bar" @submit="${this.submit}">
      <input placeholder="Search"/>
    </form>
    `;
  }
}

class NoteLists extends LitElement {
  static properties = {
    _filteredString: {type: String},
  };

  static styles = css`
  .note-list{
    height: 100vh;
    border-right: 1px solid rgba(0,0,0,0.35);
    display: flex;
    flex-direction: column;

    /* padding-bottom: 100px; */

    font-family: Helvetica, Arial, sans-serif;
    font-size: 18px;

    overflow-y: scroll;
    overflow-x: hidden;
  }
  

  search-bar{
    width: 100%;
    min-width: 100px;
  }

  ::-webkit-scrollbar {
  width: 10px;
}

  ::-webkit-scrollbar-thumb{
    transition: all 0.35s;
    border-radius: 10px;
    background-color: rgba(0,0,0,.15);
  }

  ::-webkit-scrollbar-thumb:hover{
    background-color: rgba(0,0,0,.35);
  }

  ::-webkit-scrollbar-track{
    background: transparent;
  }

  `;

  selectedNote(e){
    const detail = e.detail;
    this.dispatchEvent(new CustomEvent("select", {
      detail
    }));
  }

  newNote(){
    this.dispatchEvent(new Event("new"));
  }

  onSearch(e){
    const { value } = e.detail;
    this._filteredString = value;
  }

  constructor(){
    super();
    this._filteredString = "";
  }

  render(){
    console.log(this.list);

    return html`
    <div class="note-list" >
      <search-bar @search="${this.onSearch}"></search-bar>

      <note-list 
        @select="${this.selectedNote}" 
        @new="${this.newNote}" 
        .storageStrategy=${new LocalNotes()} 
        strategyName="Local"
      ></note-list>

      ${getStorageStrategyType() == "md-server" ?
      html`
        <note-list 
          @select="${this.selectedNote}" 
          @new="${this.newNote}" 
          .storageStrategy=${new ServerNotes()} 
          strategyName="Server"
        ></note-list>
      `: ""
      }

      <!-- <div class="label">Server</div> -->

      <div style="margin-bottom: 100px; width: 300px;"></div>
    </div>
    `;
  }
}

class NoteList extends LitElement{
  static properties = {
    storageStrategy: { type: Object },
    strategyName: { type: String },
    _close: { type: Boolean },
    // _noteList: { type: Array },
  };

  static styles = css`
  .note-list{
    height: 100vh;
    border-right: 1px solid rgba(0,0,0,0.35);
    display: flex;
    flex-direction: column;

    /* padding-bottom: 100px; */

    font-family: Helvetica, Arial, sans-serif;
    font-size: 18px;

    overflow-y: auto;
    overflow-x: hidden;
  }
  .item{
    padding-left: 24px;
    min-height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    transition: background 0.15s;
    margin: 8px 16px;
    border-radius: 10px;
    cursor: pointer;
    /* font-weight: bold; */
    /* border-bottom: 1px solid rgba(0,0,0,0.15); */
  }

  .item.create{
    background: rgba(0,0,0,0.05);
  }

  .item:hover{
    background: rgba(0,0,0,0.15);
  }

  search-bar{
    width: 100%;
    min-width: 100px;
  }


  .label{
    margin-top: 32px;
    font-size: 16px;
    font-weight: bold;
    font-family: Helvetica,Arial, sans-serif;
    color: #7a7a7a;
    padding: 16px 32px;

    background:linear-gradient(white 50%, rgba(255,255,255, 0) 100%);
    position: sticky;
    top:0;
  }

  .list{
    transition: max-height 0.35s;
    box-sizing: border-box;
    overflow: hidden;
    height: auto;
    max-height: 100%;
  }

  .list.close{
    max-height: 0;
  }

  .icon{
    transition: transform 0.15s;
    transform-origin: center center;
    transform: rotate(180deg);
  }
  .icon.close{
    transform: rotate(90deg);
  }

  `;

  constructor(){
    super();

    this.storageStrategy = null;
    this.strategyName = null;

  }

  async #updateNoteList(){
    this.requestUpdate();
  }

  async newNote(){
    // this.dispatchEvent(new Event("new"));
    let note = new Note(this.storageStrategy);
    await note.create();
    await note.updateLastOpen();
    this.dispatchEvent(new CustomEvent("select", {
      detail: {
        note
      }
    }));
    await this.#updateNoteList();

    this.requestUpdate();
  }

  // update(){
  //   this.requestUpdate();
  // }

  selectedNote(note){
    return async function(){
      await note.updateLastOpen();
      this.dispatchEvent(new CustomEvent("select", {
        detail:{
          note
        }
      }));
    }.bind(this);
  }

  toggleClose(){
    this._close = !this._close;
  }

  render(){
    let notes = until((async () => {
      let noteList = await this.storageStrategy.getNotesList();
      let notes = (noteList || [])
      let noteSortIndex = await Promise.all(notes.map(e=>e.getLastOpen()))

      notes = notes
        .map((e,i)=>[e,noteSortIndex[i]])
        .sort((a,b)=>{return b[1] - a[1]})
        .map(e=>e[0])
        .map(note =>
          html`<div class="item" @click="${this.selectedNote(note)}">${note.getTitleSync() || "Untitled"}</div>`
        );

      return notes
    })());

    return html`
      <div @click="${this.toggleClose}" class="label" style="cursor: pointer; display: flex; flex-direction: row;">
        ${this.strategyName}
        <span style="flex: 1;"></span>
        <material-icons name="expand_less" class="icon ${this._close ? "close": ""}"></material-icons>
      </div>
      <div class="list ${this._close ? "close": ""}">
        ${notes}
      </div>
      <div class="item create" @click="${this.newNote}"> <material-icons style="margin-top: 5px;margin-right: 16px;" name="add_circle_outline"></material-icons> New note</div>
    `;
  }
}

customElements.define("note-lists", NoteLists);
customElements.define("note-list", NoteList);

customElements.define("search-bar", SearchBar);