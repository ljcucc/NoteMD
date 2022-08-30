import {LitElement, html, css} from '/lib/lit.min.js';

import "/src/components/IconButton.js";
import "/src/components/Button.js";

class SettingsPage extends LitElement{

  static properties = {
    open: {type: Boolean},
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

    z-index: 1000;
  }

  @media only screen and (max-width: 800px){
    .dialog{
      width: 100%;
      height: 100%;
      max-height: 100vh !important;
    }
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
  `;

  close(){
    this.dispatchEvent( new Event("close"));
  }

  settingsChange(){
  }

  render(){
    return html`
    <div class="settings-page">
      <div class="dialog">
      <div class="title-box">
        <icon-button name="arrow_back" id="close" @click="${this.close}"></icon-button>
        <h2 class="title">Settings</h2>
      </div>

      <div class="options">
        <div class="subtitle">Appearance</div>

        <div class="label">Font size</div>
        <input type="number" placeholder="Font size"/>

        <div class="label">Font family</div>
        <select>
          <option value="sans">Sans (Helvetica)</option>
          <option value="mono">Monospace</option>
          <option value="serif">Serif</option>
        </select>

        <app-button>Save</app-button>

        <div class="subtitle">Backup / Sync</div>
        <input type="text" placeholder="Backend Server Address"/>
        <input type="number" placeholder="Port"/>
        <input type="email" placeholder="Email Account"/>
        <input type="password" placeholder="Password / Session key"/>
        
        <app-button>Sync</app-button>
        <app-button>Save</app-button>

        <div class="label">Using SSL</div>
        <select>
          <option value="false">Use non-SSL</option>
          <option value="true">Use SSL</option>
        </select>
      </div>
      </div>
    </div>
    `;
  }
}

customElements.define("settings-page", SettingsPage);