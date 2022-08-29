import {LitElement, html, css} from '/lib/lit.min.js';

import "/src/components/IconButton.js";
import "/src/components/DropMenu.js";

import "/src/NoteEditor.js";

class ChatBox extends LitElement {
  static properties = {
    // logs: {tyep: Array},
    uuid: {type: String},
    title: {tyep: String}
  };

  static styles = css`

  .app{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  .chat-box{
    flex: 1;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    height: 100vh;
    box-sizing: border-box;
  }

  note-editor{
    flex: 1;
    height: 100%;
    /* max-height: calc( 100vh - 130px); */
    box-sizing: border-box;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  `;

  constructor(){
    super();

    this.uuid = "";
    this.title = "NoteMD";
  }

  // send(e){
  //   this.dispatchEvent(new CustomEvent("send", {
  //     detail:{value: e.detail.value}
  //   }));
  // }

  onToggle(){
    this.dispatchEvent(new Event("showlist"))
  }
  
  onToggleNicksList(){
    console.log("hi")
    this.dispatchEvent(new Event("show-nickslist"))
  }

  onMenuChoose(e){
    const id = e.detail?.id || "";
    if(id == "Settings"){
      this.dispatchEvent(new Event("settings"));
    }
  }

  openDropMenu(){
    const dropMenu = this.renderRoot.querySelector("#main-menu")
    dropMenu.toggleMenu();
  }

  render(){
    console.log(this.logs);

    return html`

    <div class="app">
      <app-topbar>
        <appbar-items slot="left">
          <icon-button style="margin-right:8px;" @click="${this.onToggle}" name="menu" id="more_vert"></icon-button>
          <appbar-title .title=${this.title}></appbar-title>
        </appbar-items>
        <appbar-items slot="right">
          <icon-button name="remove_red_eye" id="more_vert" @click="${this.onToggleNicksList}"></icon-button>
          <icon-button name="more_vert" id="more_vert" @click="${this.openDropMenu}"></icon-button>
          <drop-menu id="main-menu" >
            <dropmenu-list @item-click="${this.onMenuChoose}" list="Settings,Help"></dropmenu-list>
          </drop-menu>
        </appbar-items>
      </app-topbar>
      <div class="chat-box">
        <note-editor .uuid=${this.uuid}></note-editor>
        <!-- <chat-sender @send="${this.send}"></chat-sender> -->
      </div>
    </div>
    `
  }
}

customElements.define("chat-box", ChatBox);