import {LitElement, html, css} from '/lib/lit.min.js';

import "/src/components/IconButton.js";

class SettingsPage extends LitElement{

  static properties = {
    options: {type: Object},
  }

  static styles = css`
  .settings-page{
    padding: 16px;
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
    padding: 0 16px;
    margin: 0px;
  }

  .subtitle{
    font-size: 18px;
    font-weight: bold;
    font-family: Helvetica,Arial, sans-serif;
    color: rgba(0,0,0,0.55);
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

    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    border-bottom: 2.5px solid rgba(0,0,0,0.15);

    transition: background 0.15s, border 0.35s;
  }

  input:focus, select:focus{
    background: rgba(0,0,0,0.10);
    border-bottom: 2.5px solid rgba(0,0,0,0.35);
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
      <div class="title-box">
        <icon-button name="arrow_back" id="close" @click="${this.close}"></icon-button>
        <h2 class="title">Settings</h2>
      </div>

      <div class="options">
        <div class="subtitle">Connection</div>
        <input type="text" placeholder="Weechat Relay URL"/>
        <input type="text" placeholder="Port"/>
        <input type="password" placeholder="Password"/>

        <div class="label">Using SSL</div>
        <select>
          <option value="false">Use non-SSL</option>
          <option value="true">Use SSL</option>
        </select>
      </div>
    </div>
    `;
  }
}

customElements.define("settings-page", SettingsPage);