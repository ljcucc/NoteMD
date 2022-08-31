import {LitElement, html, css, classMap} from '/lib/lit.min.js';

// import { getKeyByValue } from "/lib/utils.js";

import { Notes } from "/src/data/Notes.js";

import "/src/AppBox.js";
import "/src/NoteList.js";
import "/src/NicksList.js";
import "/src/components/Appbar.js";
import "/src/SettingsDialog.js";
import { Config } from "/src/data/Config.js";

class MainApp extends LitElement {
  static styles = css`
  .app{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100dvh;
    overflow: hidden;
  }

  .layout{
    flex: 1;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
  }

  .chat-box{
    flex: 1;
    /* height: 100%; */
    height: 100dvh;
    min-width: 50vw;
  }

  note-list{
    width:30vmax;
    /* max-width: 300px !important; */
    max-width: 300px;
    max-width: 300px;
    transition: margin-left 0.35s;
  }

    nicks-list{
      --wd: 50vw;
      width: var(--wd);
      min-width: var(--wd);
      transition: all 0.35s;
      height: 100%;

      background-color: white;
    }

    nicks-list.close{
      /* position: absolute;
      right:0;
      top:0;
      bottom:0; */
      margin-right: calc(-1 * var(--wd));
    }


    note-list.close{
      margin-left: -300px;
    }

    settings-page{
      /* position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: white; */
    }
  
  @media only screen and (max-width: 900px){
    .chat-box{
      min-width: 100vw;
    }

    nicks-list{
      width: 100vw;
      position: fixed;
      top:0;
      bottom:0;
      right:0;
      bottom:0;
      /* left:0; */
      z-index: 3000;
    }

    nicks-list.close{
      /* margin-right: 0; */
      /* display: none; */
      right: -100vw;
    }
  }

  @media only screen and (max-width: 1000px){
    note-list.close{
      /* margin-left: -31vmax;  */
      /* margin-left: calc( -30vmax - 30px ); */
      margin-left: -350px;
    }

    note-list{
      min-width: 350px;
    }

    /* chat-box{
      min-width: 100vw;
    } */
  }
  `;

  static properties = {
    // Notes opetation
    _noteUuidList: {type: Object},
    _title: {type: String},
    _selectedNoteId: {type: String},

    // GUI logci
    _showlist: {type: Boolean},
    _showNickList: {type: Boolean},
    _openSettings: {type: String},

    _previewContent: {type: Object},
  }

  constructor(){
    super();

    this._noteUuidList = {};

    this._title = "NoteMD";
    this._selectedNoteId = "";

    this._showlist = true;
    this._showNickList = false;
    this._openSettings = "";

    this.updateNotesList();
  }

  updateNotesList(){
    let { notes, notelist } = this.getNotes();
    this._noteUuidList = notelist;
  }

  getNotes(){
    let data = new Notes();
    const notes = data.getNotes();

    let notelist = (notes || []).reduce((acc,cur)=>{
      const { id } = cur;
      acc[id] = cur;
      return acc;
    }, {});

    return {
      notelist,
      notes
    }
  }

  onNoteSelected(e) {
    this._selectedNoteId = e.detail.id;
    this.updatePreview();
    this.toggleList();
  }

  newNote(e){
    let note = {
      title: "Untitled",
      content: ""
    };

    const id = new Notes().appendNote(note);
    console.log(id)
    this._selectedNoteId = id;

    this.getNotes();

    this.updatePreview();
    this.toggleList();
  }

  connectedCallback(){
    super.connectedCallback();
  }

  toggleList(){
    this._showlist = !this._showlist;
  }

  toggleNicksList(){
    this._showNickList = !this._showNickList;
  }

  settingsClose(){
    this._openSettings = "false";
  }

  settingsOpen(){
    this._openSettings = "true";
  }

  
  updatePreview(){
    this.updateNotesList();

    const id = this._selectedNoteId;
    let note = new Notes().getNote(id);
    let content = note.content || "";
    let title = note.title || "";

    this._previewContent = {
      content,
      title
    };
  }

  onDelete(){
    const id = this._selectedNoteId;
    new Notes().deleteNote(id)

    this._selectedNoteId = "";
    this._showlist = false;

    this.updateNotesList();
    this.requestUpdate();

  }

  render() {
    console.log("render");
    console.log(this._noteUuidList);

    return html`
    <div class="app">
      <div class="layout">

        <note-list .list=${this._noteUuidList} @new="${this.newNote}" @select="${this.onNoteSelected}" class="${classMap({close:this._showlist })}"></note-list>

        <app-box 
          class="chat-box"
          @show-nickslist="${this.toggleNicksList}" 
          @update="${this.updatePreview}"
          @showlist="${this.toggleList}" 
          @settings="${this.settingsOpen}"
          @delete="${this.onDelete}"
          .uuid=${this._selectedNoteId}
          .title=${this._previewContent?.title}></app-box>

        <nicks-list class="${classMap({
          close:  !this._showNickList
        })}" @close="${this.toggleNicksList}"
        .uuid=${this._selectedNoteId}
        .title=${this._previewContent?.title || ""}
        .content=${this._previewContent?.content || ""}
        ></nicks-list>

        <settings-page .open=${this._openSettings} @close="${this.settingsClose}"></settings-page>

      </div>
    </div>
    `;
  }
}

customElements.define("main-app", MainApp);