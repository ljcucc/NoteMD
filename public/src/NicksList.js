import {LitElement, html, css} from '/lib/lit.min.js';

import "/src/components/IconButton.js";

class NicksList extends LitElement{

  static properties = {
    nicklist: {type: Array},
    title: {type: String},
    topic: {type: String},
  };

  constructor(){
    super();

    this.nicklist = [];
    this.title = "Channel Title";
    this.topic = "Channel Topic";
  }

  static styles = css`
    .nicks-list{
      height:100vh;
      box-sizing: border-box;
      overflow-y: scroll;
      /* width: 30vmax; */
      border-left: 1px solid rgba(0, 0, 0, 0.35);
      font-family: Helvetica,Arial, sans-serif;
    }

    h2.title{
      font-size: 30px;
      font-weight: bold;
      font-family: Helvetica,Arial, sans-serif;
      padding: 16px;
      padding-bottom: 0px;
      margin-bottom: 0px;
    }

    .topic{
      padding: 16px;
      padding-left: 18px;
      margin-top: 0px;
    }

    #close{
      /* position: absolute; */
      margin-top: 16px;
      margin-left:16px;
    }

    @media only screen and (min-width: 750px){
      #close{
        display: none;
      }
    }

    .list{
      display: flex;
      flex-direction: column;
      width: 100%;
      overflow-y: scroll;
    }

    .item{
      padding: 16px;
      transition: background 0.35s;
      font-family: Helvetica,Arial, sans-serif;
      cursor: pointer;
    }

    .item:hover{
      background: rgba(0,0,0,0.15);
    }
  `;

  close(){
    this.dispatchEvent(new Event("close"))
  }

  render(){
    const nicklist = this.nicklist.map(e=>{
      return html`
      <div class="item">${e.name}</div>
      `
    });
    
    return html`
    <div class="nicks-list">
      <div style="padding-left: 8px;">
        <icon-button name="arrow_back" id="close" @click="${this.close}"></icon-button>
        <h2 class="title">${this.title}</h2>
        <p class="topic">${this.topic}</p>
      </div>

      <div class="list"></div>
      ${nicklist}
    </div>
    `;
  }
}

customElements.define("nicks-list", NicksList);