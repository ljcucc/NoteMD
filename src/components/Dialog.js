import {LitElement, html, css} from '/lib/lit.min.js';

class InfoDialog extends LitElement{
  static properties = {
    title: {type: String},
    description: {type: String},
    open: {type: Boolean}
  }

  constructor(){
    super();

    this.title = "No title";
  }

  static styles = css`
    dialog::backdrop {
      background: rgba(0,0,0,.25);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }
    dialog{
      padding: 8px;
      border: none;
      border-radius: 15px;
      min-height: 300px;
      width: 500px;
      box-shadow: rgba(0,0,0,0.35) 0px 4px 8px;
    }
    .login-form{
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 60px;
    }
    .title-bar{
      display: flex;
      flex-direction: row;
      /* justify-content: center; */
      align-items: center;
    }
    .title-bar>h2{
      margin:0;
      padding: 0;
      text-align: center;
      flex: 1;
      margin-left: -50px;
      z-index: -1;
    }
    .description{
      text-align: center;
      margin: auto;
      float: center;
      display: flex;
      align-items:center;
      justify-content: center;
      min-height: 200px;
      height: auto;
    }

    .span{
      background: transparent;
      outline: none;
      border:none;
    }
  `;

  updated(){
    console.log(this.open)
    if(!this.open) return;
    let root = this.shadowRoot; // get shadow root in order to get DOM
    console.log("open me")
    let dialog = root.querySelector("dialog");
    dialog.showModal();
  }

  openDialog(){
    this.open = true;
  }

  render(){
    return html`
      <link rel="stylesheet" href="style.css" />
      <dialog>
        <form method="dialog" class="title-bar">
          <button class="span" value="cancel" @click="${(()=>this.open=false).bind(this)}">
            <icon-button name="close"></icon-button>
          </button>
          <h2>${this.title}</h2>
        </form>
        <p class="description">
          <span>
            <slot></slot>
          </span>
        </p>
      </dialog>
    `;
  }
}

customElements.define("app-dialog", InfoDialog);