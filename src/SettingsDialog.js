import {LitElement, html, css} from '/lib/lit.min.js';

import "/src/components/IconButton.js";
import "/src/components/Button.js";
import { Config } from '/src/data/Config.js';

class SettingsPage extends LitElement{

  static properties = {
    open: {type: String},
    options: {type: Object},
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

  input, select{
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

    this.config = new Config();
  }

  close(){
    this.dispatchEvent( new Event("close"));
  }

  onChange(key, value){
    return (e)=>{
      const el = this.renderRoot.querySelector(`*[name=${key}]`);
      const value = el.value;
      console.log(key, el.value);

      this.config.setConfig(key, value);

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
    return html`
    <div class="settings-page ${this.open == "true" ? "open" : ""} ${this.open == "false" ? "close": ""}">
      <div class="dialog">
      <div class="title-box">
        <icon-button name="arrow_back" id="close" @click="${this.close}"></icon-button>
        <h2 class="title">Settings</h2>
      </div>

      <div class="options" @submit="${this.onChange("appearance")}">
         <div class="label">Font size</div>
          <input .value=${this.config.getConfig("font-size", 16)} name="font-size" type="number" placeholder="16" min="0" @change="${this.onChange("font-size")}"/>

          <div class="label">Font family</div>
          <select .value=${this.config.getConfig("font-family","sans")} name="font-family" @change="${this.onChange("font-family")}">
            <option value="sans">Sans (Helvetica)</option>
            <option value="mono">Monospace</option>
            <option value="serif">Serif</option>
          </select>

          <!-- <div class="subtitle">Storage / Server</div>

          <div class="label">Storage Strategy</div>
          <select name="font-family" @change="${this.onChange("font-family")}">
            <option value="local">locally (localStorage)</option>
            <option value="md-server" disabled>NoteMD Server</option>
          </select> -->

          <!-- <div class="label">Backend Server Address</div>
          <input type="text" placeholder="localhost" @change="${this.onChange("backend-server-address")}"/>

          <div class="label">Port</div>
          <input type="number" placeholder="8080" @change="${this.onChange("backend-server-port")}"/>

          <div class="label">Email Account</div>
          <input type="email" placeholder="exmpale@ljcu.cc" @change="${this.onChange("backend-server-account")}"/>

          <div class="label">Password / Session key</div>
          <input type="password" placeholder="P@5svv0R6" @change="${this.onChange("backend-server-passwd")}"/> -->
        
          <app-button style="margin-top: 50px;color:#B00020;align-self: flex-start" @click="${this.resetStorage}">Reset storages</app-button>
      </div>
      </div>
    </div>
    `;
  }
}

customElements.define("settings-page", SettingsPage);