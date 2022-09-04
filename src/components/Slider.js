import {LitElement, html, css, classMap} from '/lib/lit.min.js';

class ContentSlider extends LitElement{
  static properties = {
    _close: { type: Boolean },
    title: { type: String },
    isHeader: { type: Boolean },
    // _noteList: { type: Array },
  };

  static styles = css`
  .label{
    margin-top: 32px;
    font-size: 16px;
    font-weight: bold;
    font-family: Helvetica,Arial, sans-serif;
    /* color: #7a7a7a; */
    padding: 20px;
    align-items: center;
    background: rgba(0,0,0,.05);
    border-radius: 10px;

    transition: background 0.35s;

    background:linear-gradient(rgba(255,255,255, 0) 0%, white 20%, white 80%, rgba(255,255,255, 0) 100%);
    /* background: white; */
    position: sticky;
    top:0;
  }

  .close.label:hover{
    background: rgba(0,0,0,.05) !important;
  }

  .list{
    transition: max-height 0.35s, height 0.35s;
    box-sizing: border-box;
    overflow: hidden;
    height: auto;
    max-height: 100%;
    margin-top: 32px;
    padding: 16px;
  }

  .list.close{
    max-height: 0;
    height: 0;
    padding: 0;
  }

  .icon{
    transition: transform 0.15s;
    transform-origin: center center;
    transform: rotate(180deg);
  }
  .icon.close{
    transform: rotate(90deg);
  }

  `;

  constructor(){
    super();

    this._close = true;
    this.isHeader = false;
  }

  toggleClose(){
    this._close = !this._close;
  }

  render(){
    return html`
      <div @click="${this.toggleClose}" class="label ${classMap({
        "close": this._close
      })}" style="cursor: pointer; display: flex; flex-direction: row;">
        ${this.title}
        <span style="flex: 1;"></span>
        <material-icons name="expand_less" class="icon ${this._close ? "close": ""}"></material-icons>
      </div>
      <div class="list ${this._close ? "close": ""}">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("content-slider", ContentSlider);