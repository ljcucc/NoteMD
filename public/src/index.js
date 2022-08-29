import {LitElement, html, css, classMap} from '/lib/lit.min.js';

// import { getKeyByValue } from "/lib/utils.js";

import "/src/ChatBox.js";
import "/src/NoteList.js";
import "/src/NicksList.js";
import "/src/components/Appbar.js";
import "/src/Settings.js";

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

  chat-box{
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
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: white;
    }
  
  @media only screen and (max-width: 750px){
    chat-box{
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
    _noteUuidList: {type: Object},
    // _bufferPointers: {type: Object},
    // _dispLogs: {type: Array},
    _title: {type: String},
    _selectedNoteId: {type: String},

    _showlist: {type: Boolean},
    _showNickList: {type: Boolean},

    _dispNicklist: {type: Array},
    _openSettings: {type: Boolean},
  }

  constructor(){
    super();

    this._noteUuidList = {};

    // this._dispLogs = [];
    this._dispNicklist = [];

    this._title = "NoteMD";
    this._selectedNoteId = "";

    this._showlist = true;
    this._showNickList = false;
    this._openSettings = true;

    // this.socket = io();

    // this.socket.on("connect", s=>{
    //   console.log(`connected ${this.socket.id}, requesting get_line`);
    //   // this.socket.emit("get_buffers");
    // });

    // get note

    // this.socket.on("init", e=>{
    //   console.log(e);

    //   // fetch("/api/get_buffers", {
    //   //   method: "POST",
    //   //   headers: {
    //   //     'Content-Type': 'application/json',
    //   //   },
    //   //   body: JSON.stringify({
    //   //     id: this.socket.id
    //   //   })
    //   // }).then(e=>e.json())
    //   // .then(a=>{
    //   //   // console.log(e);
    //   //   let e = a.pointers;
    //   //   this._bufferPointers = e;
    //   //   this._noteUuidList = Object.keys(e).reduce((acc,cur)=>{acc[e[cur]]=cur;return acc}, {});
    //   // });

      

    // })

  //   this.socket.on("new:msg", e=>{
  //     console.log(e);
  //     if(e.buffer == this._selectedNoteId){
  //       this._dispLogs.push(e);
  //       this._dispLogs = this._dispLogs.map(e=>e);
  //       // this.requestUpdate();
  //     }else{
  //       console.log("not")
  //     }
  //   });

    let { notes, notelist } = this.getNotes();
    this._noteUuidList = notelist;
  }

  getNotes(){
    const notes = localStorage.getItem("list") || [
      {id: "uuid", title: "Title", preview: "Hello"}
    ];
    console.log(notes);

    let notelist = notes.reduce((acc,cur)=>{
      const { id } = cur;
      acc[id] = cur;
      return acc;
    }, {});
    console.log(notelist);

    return {
      notelist,
      notes
    }
  }

  onNoteSelected(e) {
    // console.log(this._noteUuidList);
    // this._title = this._bufferPointers[e.detail.id];
    this._selectedNoteId = e.detail.id;

    // const noteid = e.detail.id;

    this.toggleList();

    // get note content

    // fetch("/api/get_msg", {
    //   method: "POST",
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     bufferid,
    //     count: 150,
    //     id: sid
    //   })
    // }).then(e=> e.json())
    // .then(e=>{
    //   this._dispLogs = e;
    // });

    // fetch("/api/get_users", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     bufferid,
    //     id: sid
    //   })
    // }).then(e=>e.json())
    //   .then(e=>{
    //     this._dispNicklist = e;
    //   })
  }

  connectedCallback(){
    super.connectedCallback();
  }

  onMsgSend(e){
    console.log(e)
    this.socket.emit('message', this._selectedNoteId, e.detail.value);
  }

  toggleList(){
    this._showlist = !this._showlist;
  }

  toggleNicksList(){
    this._showNickList = !this._showNickList;
  }

  settingsClose(){
    this._openSettings = false;
  }

  settingsOpen(){
    this._openSettings = true;
  }

  render() {
    console.log("render");
    console.log(this._noteUuidList);
    console.log(this._dispLogs);

    return html`
    <div class="app">
      <div class="layout">
        <note-list .list=${this._noteUuidList} @select="${this.onNoteSelected}" class="${classMap({close:this._showlist })}"></note-list>
        <chat-box 
          @show-nickslist="${this.toggleNicksList}" 
          @send="${this.onMsgSend}" 
          @showlist="${this.toggleList}" 
          @settings="${this.settingsOpen}"
          .uuid=${this._selectedNoteId}
          .title=${this._title}></chat-box>
        <nicks-list class="${classMap({
          close:  !this._showNickList
        })}" @close="${this.toggleNicksList}"
        .nicklist=${this._dispNicklist}
        .title=${this._title}
        ></nicks-list>
      </div>
    </div>
    `;
  }
}

customElements.define("main-app", MainApp);