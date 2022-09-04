import {LitElement, html, css, until} from '/lib/lit.min.js';

import "/src/components/IconButton.js";
import "/src/components/Button.js";
import { Config } from '/src/data/Config.js';

import { getDatabaseWithStrategy, getStorageStrategyType } from "/src/data/Database.js";

// import "/src/widgets/BackendStrategyHint.js";
import "/src/widgets/HintBlock.js";
import "/src/components/Select.js";

class SettingsPage extends LitElement{

  static properties = {
    open: {type: String},
    options: {type: Object},
    _storageStrategy: {type: String},
  }

  static styles = css`
  .settings-page{
    /* padding: 16px; */
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0, .35);
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: hidden;

    z-index: 1000;
  }

  @media only screen and (max-width: 800px){
    .dialog{
      width: 100%;
      height: 100%;
      max-height: 100vh !important;
    }
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

  .dialog{
    width: 600px;
    padding: 16px;
    background: white;
    border-radius: 10px;
    max-height: 80vmin;
    overflow: auto;
  }

  .title-box{
    display:flex;
    flex-direction: row;
    align-items: center;
  }

  h2.title{
    font-size: 24px;
    font-weight: bold;
    font-family: Helvetica,Arial, sans-serif;
    padding: 24px;
    /* padding: 0 16px; */
    margin: 0px;
  }

  .subtitle{
    font-size: 18px;
    font-weight: bold;
    font-family: Helvetica,Arial, sans-serif;
    color: rgba(0,0,0,0.55);
    margin-top: 64px;
  }

  .label{
    margin-top: 32px;
    font-size: 14px;
    font-weight: bold;
    font-family: Helvetica,Arial, sans-serif;
    color: rgba(0,0,0,0.35);
  }

  .options{
    padding: 16px;
    display: flex;
    flex-direction: column;
  }

  select.boolean{
    width: 100px;
  }

  select{
    line-height: 30px;
  }

  input, select, textarea{
    background: rgba(0,0,0,0.05);
    border-radius: 10px;
    font-size: 18px;
    padding: 16px;
    outline: none;
    border: none;

    width: 300px;

    margin: 16px 0px 0px 0px;

    border-radius: 10px;
    /* border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    border-bottom: 2.5px solid rgba(0,0,0,0.15); */

    transition: background 0.15s, border 0.35s;
  }

  input[type=submit]{
    background: rgba(0,0,0,.0);
    width: auto;
    min-width: 0px;
    font-size: 16px;
    text-transform: uppercase;
    font-weight: 700;
    font-family: Helvetica, Arial, sans-serif;
    cursor: pointer;
  }

  input[type=submit]:hover{
    background: rgba(0,0,0,.15);
  }

  input[type=number]{
    width: 100px;
  }

  app-button{
    margin-top: 16px;
  }



  input:focus, select:focus{
    background: rgba(0,0,0,0.10);
    /* border-bottom: 2.5px solid rgba(0,0,0,0.35); */
  }

  .settings-page.open{
    animation-name: open;
    animation-duration: 0.25s;
    animation-iteration-count:1;

    visibility: visible;
    opacity: 1;
  }

  .settings-page.open > .dialog{
    margin-top: 0;

    animation-name: dialogopen;
    animation-duration: 0.25s;
    animation-iteration-count:1;
  }

  .settings-page.close > .dialog{
    margin-top: 25vh;

    animation-name: dialogclose;
    animation-duration: 0.25s;
    animation-iteration-count:1;
  }

  .settings-page.close{
    animation-name: close;
    animation-duration: 0.25s;
    animation-iteration-count:1;
  }

  @keyframes dialogopen{
    0%{ 
      margin-top: 10vh;
    }
    100%{ 
      margin-top: 0; 
    }
  }

  @keyframes dialogclose{
    100%{ 
      margin-top: 10vh;
    }
    0%{ 
      margin-top: 0; 
    }
  }

  @keyframes open{
    0%{
      visibility: hidden;
      opacity: 0;
    }

    1%{
      visibility: visible;
      opacity: 0;
    }

    100%{
      visibility: visible;
      opacity: 1;
    }
  }

  @keyframes close{
    100%{
      visibility: hidden;
      opacity: 0;
    }

    99%{
      visibility: visible;
      opacity: 0;
    }

    0%{
      visibility: visible;
      opacity: 1;
    }
  }
  `;

  constructor(){
    super();

    this.config = new Config(getDatabaseWithStrategy());
    this._storageStrategy = getStorageStrategyType();
  }

  close(){
    this.dispatchEvent( new Event("close"));
  }

  onChange(key){
    return async (e)=>{
      const el = this.renderRoot.querySelector(`*[name=${key}]`);
      const value = el.value;
      console.log(key, el.value);

      if (key == "storage-solution") {
        this._storageStrategy = value;
        this.requestUpdate();
      }

      await this.config.setConfig(key, value);

     this.dispatchEvent(new Event("change")) 
    };
  }

  settingsChange(){
  }

  resetStorage(){
    if (!confirm("Do you want to do this? All notes will be gone after this action, the action CANNOT undo.")) return;
    localStorage.clear()
    location.reload();
  }

  render(){
    const serverConfig = html`

      <!-- <backend-strategy-hint></backend-strategy-hint> -->
      <hint-block>
      ⚠️ This strategy still in beta! and reqiured a MDNote-server hosted on public or a reachable IP that you can connect.
      learn more about md-server here: <a href="https://github.com/ljcucc/NoteMD-server" target="_blank" rel="noopener noreferrer">[ notemd-server on github ]</a>
      </hint-block>

      <div class="label">Backend Server Address</div>
      <input name="backend-server-address" type="text" .value=${until(this.config.getConfig("backend-server-address", "http://localhost"))} placeholder="localhost" @change="${this.onChange("backend-server-address")}"/>

      <div class="label">Port</div>
      <input name="backend-server-port" type="number" .value=${until(this.config.getConfig("backend-server-port", 8080))} placeholder="8080" @change="${this.onChange("backend-server-port")}"/>

      <!-- <div class="label">Account</div>
      <input type="text" .value=${until(this.config.getConfig("backend-server-account", ""))} placeholder="exmpale@ljcu.cc" @change="${this.onChange("backend-server-account")}"/> -->

      <div class="label">Session key</div>
      <input style="width: auto;max-width: 500px" name="backend-server-passwd" type="password" .value=${until(this.config.getConfig("backend-server-passwd", ""))} placeholder="P@5svv0R6" @change="${this.onChange("backend-server-passwd")}"/>
      <!-- <app-button style="margin-top: 24px;align-self: flex-start" @click="${this.resetStorage}">Connect</app-button> -->

      <hint-block>
        All configurations will store locally. if not working try to reload the page.
      </hint-block>
    `;

    const restfulApiConfig = html`
      <hint-block>RESTful API feature is unfinished, all option will be disabled</hint-block>
      <div class="label">GetItem request</div>
      <textarea disabled name="backend-server-address" type="text" .value=${until(this.config.getConfig("restful-get-request", "{}"))} placeholder="localhost" @change="${this.onChange("backend-server-address")}">
      </textarea>

      <div class="label">SetItem request</div>
      <textarea disabled name="backend-server-address" type="text" .value=${until(this.config.getConfig("restful-set-request", "{}"))} placeholder="localhost" @change="${this.onChange("backend-server-address")}"/>
      </textarea>

      <div class="label">RemoveItem request</div>
      <textarea disabled name="backend-server-address" type="text" .value=${until(this.config.getConfig("restful-set-request", "{}"))} placeholder="localhost" @change="${this.onChange("backend-server-address")}"/>
      </textarea>

      <div class="label">IsExists request</div>
      <textarea disabled name="backend-server-address" type="text" .value=${until(this.config.getConfig("restful-set-request", "{}"))} placeholder="localhost" @change="${this.onChange("backend-server-address")}"/>
      </textarea>
    `;

    return html`
    <div class="settings-page ${this.open == "true" ? "open" : ""} ${this.open == "false" ? "close": ""}">
      <div class="dialog">
      <div class="title-box">
        <icon-button name="arrow_back" id="close" @click="${this.close}"></icon-button>
        <h2 class="title">Settings</h2>
      </div>

      <div class="options" @submit="${this.onChange("appearance")}">
         <div class="subtitle" style="margin-top: 0;">General Settings</div>
         <div class="label">Font size</div>
          <input .value=${until(this.config.getConfig("font-size", 16))} name="font-size" type="number" placeholder="16" min="0" @change="${this.onChange("font-size")}"/>

          <div class="label">Font family</div>
          <app-select 
          style="width: 300px;" 
          .list=${[
            { title: "Sans (Helvetica)", id: "sans" },
            { title: "Monospace", id: "mono" },
            { title: "Serif", id: "serif" },
          ]}
          .value=${until(this.config.getConfig("font-family","sans"))}
          name="font-family"
          @select="${this.onChange("font-family")}"
          ></app-select>
          <!-- <select .value=${until(this.config.getConfig("font-family","sans"))} name="font-family" @change="${this.onChange("font-family")}">
            <option value="sans">Sans (Helvetica)</option>
            <option value="mono">Monospace</option>
            <option value="serif">Serif</option>
          </select> -->

          <div class="subtitle">Storage / Server</div>

          <div class="label">Storage Strategy</div>
          <app-select 
            style="width: auto;max-width: 400px;" 
            .value=${until(this.config.getConfig("storage-solution", "local"))} 
            name="storage-solution" 
            @select="${this.onChange("storage-solution")}"
            .list=${[
              {id: "local", title: "local-only (localStorage)"},
              {id: "md-server", title: "NoteMD Server"},
              {id: "restful-api", title: "RESTful API"},
            ]}
          >
          </app-select>

          ${(this._storageStrategy == "md-server"?serverConfig:"")}
          ${(this._storageStrategy == "restful-api"?restfulApiConfig:"")}

          <div class="subtitle">Advanced Settings</div>

          <div class="label">Backup Strategy</div>
          <app-select style="width: auto;max-width: 400px;" 
            .value=${until(this.config.getConfig("auto-backup-solution", "onchange"))} 
            name="auto-backup-solution" 
            @select="${this.onChange("auto-backup-solution")}"
            .list=${[
              {id:"onchange", title: "on change"},
              {id: "ontype", title: "on type (upload frequently)"},
            ]}>
          </app-select>

          <hint-block>If you choosing ontype, Notes will send request in every time you press the key.</hint-block>

          <div class="label">Drawer behavior</div>
          <app-select style="width: auto;max-width: 400px;" 
            .value=${until(this.config.getConfig("drawer-behavior", "auto"))} 
            name="drawer-behavior" 
            @select="${this.onChange("drawer-behavior")}"
            .list=${[
              {id:"auto", title: "Close on selected (default)"},
              {id: "resident", title: "Resident drawer (recommended on larger screen)"},
            ]}>
          </app-select>

          <div class="subtitle">Reset / Diagnosis</div>
        
          <app-button style="margin-top: 50px;color:#B00020;align-self: flex-start" @click="${this.resetStorage}">Reset localstorage</app-button>
          <hint-block>If the file system is broken, trying to reset localstorage and try again.</hint-block>

      </div>
      </div>
    </div>
    `;
  }
}

customElements.define("settings-page", SettingsPage);