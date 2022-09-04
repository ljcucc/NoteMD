import {LitElement, html, css, until} from '/lib/lit.min.js';
import { getDatabaseWithStrategy, getStorageStrategyType } from "/src/data/Database.js";

import "/src/components/IconButton.js";
import "/src/components/DropMenu.js";
import "/src/components/Slider.js";

import "/src/NoteEditor.js";
import { Config } from '/src/data/Config.js';

import "/src/widgets/DialogPage.js";

class ChatBox extends LitElement {
  static properties = {
    title: { type: String },
    note: { type: Object },

    _openAbout: { type: String },
  };

  static styles = css`

  *{
    font-family: Helvetica, Arial, sans-serif;
  }

  a{
    color: #3080db;
  }

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

    this.title = "NoteMD";
    this.config = new Config();
    this.note = null;

    this._openAbout = "";
  }
  
  onToggle(){
    this.dispatchEvent(new Event("showlist"))
  }
  
  onToggleNicksList(){
    console.log("hi")
    this.dispatchEvent(new Event("show-preview"))
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
      // window.open("https://github.com/ljcucc/NoteMD/")
      this._openAbout = "true";
    }
  }

  openDropMenu(){
    const dropMenu = this.renderRoot.querySelector("#main-menu")
    dropMenu.toggleMenu();
  }

  onUpdate(){
    this.dispatchEvent(new Event("update"));
  }

  aboutClose(){
    this._openAbout = "false";
  }

  updateSettings(){
    this.requestUpdate();
  }

  render(){
    console.log(this.logs);
    console.log("getStorageStrategyType", getStorageStrategyType());

    return html`

    <div class="app">
      <!-- appbar -->
      <app-topbar>
        <appbar-items slot="left">
          <icon-button style="margin-right:8px;" @click="${this.onToggle}" name="menu" id="more_vert"></icon-button>
          <appbar-title .title=${this.note == null? "": this.title}></appbar-title>
        </appbar-items>
        <appbar-items slot="right">
          ${
            getStorageStrategyType() == "md-server"?
            html`
              <icon-button name="cloud" style="opacity: 0.35;"></icon-button>
            `: ""
          }
          <icon-button name="remove_red_eye" id="more_vert" @click="${this.onToggleNicksList}"></icon-button>
          <icon-button name="more_vert" id="more_vert" @click="${this.openDropMenu}"></icon-button>
          <drop-menu id="main-menu" >
            <dropmenu-list @item-click="${this.onMenuChoose}" list="Settings,About;split,Delete"></dropmenu-list>
          </drop-menu>
        </appbar-items>
      </app-topbar>

      <!-- main editor -->
      <div class="chat-box">
        <note-editor .note=${this.note} @update="${this.onUpdate}" .fontSize="${
          until(this.config.getConfig("font-size", 16))
          }" .fontFamily="${
            until(this.config.getConfig("font-family", "sans"))
            }"></note-editor>
      </div>
    </div>

    <dialog-page title="About" .open=${this._openAbout} @close="${this.aboutClose}">
      <div style="padding: 8px">
        <img src="/assets/icon@512.png" alt="" srcset="" width="256" />

        <div style="padding: 8px;">
          <h2>Notes</h2>
          <p>
            As known as NoteMD, which is a simple but modern note (web) app. 
          </p>

          <p>
            We're learning from the concept of IRC, Supported wide range of backend server solution by using cross-origin RESTful API, separate the front-end and back-end to different provider.
          </p>

          <p>Version: 1.2</p>

          <p>Source code and more info: <a href="https://github.com/ljcucc/NoteMD" target="_blank">https://github.com/ljcucc/NoteMD</a></p>
          <p>Self-host your backend server: <a href="https://github.com/ljcucc/NoteMD-server" target="_blank">https://github.com/ljcucc/NoteMD-server</a></p>
          <p>License: GPL v2</p>


          <p style="margin-top: 100px;">
          <content-slider title="Credit & license">
            <a href="https://lit.dev" target="_blank">lit.dev</a> ( <a href="https://github.com/lit/lit/blob/main/LICENSE" target="_blank">LICENSE</a> ), <br>
            <a href="https://github.com/showdownjs/showdown" target="_blank">Showdown markdown conventor</a> (<a href="https://github.com/showdownjs/showdown/blob/master/LICENSE" target="_blank">LICENSE</a>), <br>
            <a href="https://fonts.google.com" target="_blank">Material icons, Roboto mono</a> <br>
          </content-slider>

          </p>

        </div>
      </div>
    </dialog-page>

    `
  }
}

customElements.define("app-box", ChatBox);