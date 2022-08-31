import {LitElement, html, css} from '/lib/lit.min.js';

import "/src/components/IconButton.js";
import "/src/components/DropMenu.js";

import "/src/NoteEditor.js";
import { Config } from '/src/data/Config.js';

class ChatBox extends LitElement {
  static properties = {
    // logs: {tyep: Array},
    uuid: {type: String},
    title: {type: String},

    // _fontSize: {type: Number},
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
    /* overflow-y: scroll; */
    overflow-x: hidden;
  }
  `;

  constructor(){
    super();

    this.uuid = "";
    this.title = "NoteMD";
    this.config = new Config();

    // this._fontSize = this.config.getConfig("font-size", 16);
  }
  
  onToggle(){
    this.dispatchEvent(new Event("showlist"))
  }
  
  onToggleNicksList(){
    console.log("hi")
    this.dispatchEvent(new Event("show-nickslist"))
  }

  onMenuChoose(e){
    const id = e.detail?.id || "";
    if(id == "Delete"){
      this.dispatchEvent(new Event("delete"));
    }

    if(id == "Settings"){
      this.dispatchEvent(new Event("settings"))
    }

    if(id == "About"){
      window.open("https://github.com/ljcucc/NoteMD/")
    }
  }

  openDropMenu(){
    const dropMenu = this.renderRoot.querySelector("#main-menu")
    dropMenu.toggleMenu();
  }

  onUpdate(){
    this.dispatchEvent(new Event("update"));
  }

  render(){
    console.log(this.logs);

    return html`

    <div class="app">
      <!-- appbar -->
      <app-topbar>
        <appbar-items slot="left">
          <icon-button style="margin-right:8px;" @click="${this.onToggle}" name="menu" id="more_vert"></icon-button>
          <appbar-title .title=${this.uuid == ""? "": this.title}></appbar-title>
        </appbar-items>
        <appbar-items slot="right">
          <icon-button name="remove_red_eye" id="more_vert" @click="${this.onToggleNicksList}"></icon-button>
          <icon-button name="more_vert" id="more_vert" @click="${this.openDropMenu}"></icon-button>
          <drop-menu id="main-menu" >
            <dropmenu-list @item-click="${this.onMenuChoose}" list="Settings,About;split,Delete"></dropmenu-list>
          </drop-menu>
        </appbar-items>
      </app-topbar>

      <!-- main editor -->
      <div class="chat-box">
        <note-editor @update="${this.onUpdate}" .uuid=${this.uuid} .fontSize="${this.config.getConfig("font-size", 16)}" .fontFamily="${this.config.getConfig("font-family", "sans")}"></note-editor>
      </div>
    </div>
    `
  }
}

customElements.define("app-box", ChatBox);