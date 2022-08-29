import {LitElement, html, css, unsafeHTML} from '/lib/lit.min.js';

import "/src/components/IconButton.js";

class NicksList extends LitElement{

  static properties = {
    title: {type: String},
    content: {type: String},
    uuid: {type: String},
  };

  constructor(){
    super();

    this.title = "Channel Title";
    this.content = "Channel Title";
    this.uuid = "Channel Topic";
  }

  static styles = css`
    .nicks-list{
      height:100vh;
      box-sizing: border-box;
      overflow-y: scroll;
      /* width: 30vmax; */
      width: 100%;
      border-left: 1px solid rgba(0, 0, 0, 0.35);
      font-family: Helvetica,Arial, sans-serif;
    }

    .nicks-list>div>*{
      box-sizing: border-box;
      width: 100%;
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

    @media only screen and (min-width: 900px){
      #close{
        display: none;
      }
    }

     del{
  opacity: 0.15;
  text-decoration-line: none;
}

a{
  color: rgb(65, 138, 223);
  /* color: rgb(255, 203, 32); */
  text-decoration: none;
}

a:hover{
  text-decoration: underline;
}

ol{
  list-style-position: inside;
}

ol, ul{
    /* padding-left: 0; */
    margin: 40px 0 !important;
    box-sizing: border-box;
}

ul {
  list-style-type:square;
}

li{
  margin-top: 16px;
}

h1, h2, h3{
  font-size: 26px !important;
  font-weight: normal;
  /* line-height: 90%; */
  margin-top: 100px !important;
  width: 100%;
  /* color: rgb(23, 52, 87); */
}

/* p{
  color: rgb(23, 52, 87);
} */

h2{
  /* margin-bottom: 100px !important; */
  font-size: 35px !important;
}

h3{
  margin-bottom: 40px !important;
}

h1{
  font-size: 60px !important;
}

h1, h2{
  font-family: 'Times New Roman', Times, serif;
}

.content>*{
  margin-top: 1.2rem;
  font-size: 18px;
  font-weight: normal;
  width: 100% !important;
  /* border: 1px solid; */
}

blockquote{
  margin: 30px 0 !important;
  background: rgb(242, 246, 252);
  /* background: rgb(226, 235, 248); */
  border-radius: 10px;
  padding: 1px 16px;
  color: rgb(48, 75, 114);
  box-sizing:unset;
  box-sizing: border-box;
}

iframe, img{
  margin: 60px 0 !important;
  border-radius: 18px;
  padding: 0;
  margin: 0;
  max-width: 100%;
  /* border: 3px solid black; */
  box-sizing: border-box;
}

iframe, img.full{
  width: 100%;
}

iframe.custom{
  /* box-shadow: 1px 2px 9px rgb(0 0 0 / 35%);; */
  
  border:3px solid rgba(0,0,0,.35);
  /* outline-offset: -2px; */
}

figure{
  margin:0;
}

figcaption{
  display: none;
}

/* figure>embed,figcaption{
  display: none;
}
figure::after{
  content: "[embed is not allow to display]";
} */

h1.title{
  margin-bottom: 30px !important;
      padding: 16px;
      padding-bottom: 0px;
      margin-bottom: 0px;
}

.header-img{
  width: 100%;
  height: 160px;
  margin-top: 180px !important;
  margin-bottom: 24px !important;
  object-fit: cover;
}

.header-img+.title{
  margin-top: 30px !important;
}

pre{
  font-size: 16px !important;
  padding: 16px;
  background-color: black;
  color: white;
  border-radius: 10px;
  overflow-x: auto;
  box-sizing: border-box;
  width: 100%;
}

pre::-webkit-scrollbar{
  background:transparent;
}

pre::-webkit-scrollbar-thumb{
  background: rgba(255,255,255,0.55);
  width: 5px;
}

code, code > *, code>span>*{
  font-family: 'Roboto Mono', monospace !important;
}

pre>code{
  width: 100%;
}

pre>code::selection, code > *::selection, code>span>*::selection{
  background-color: white !important;
  color: black !important;
}
  `;

  close(){
    this.dispatchEvent(new Event("close"))
  }

  render(){
    const converter = new showdown.Converter({
      strikethrough: true
    });
    // let note = JSON.parse(localStorage.getItem(`note:${this.uuid}`) || "{}");
    // let text = note.content || "";
    // let title = note.title || "";

    let text = this.content || "";
    let title = this.title || "";
    text = text.split("...");
    if(text.length > 1)
      text.shift();
    text = text.join("...");

    const htmlCode = converter.makeHtml(text);

    const content = html`
      ${unsafeHTML(htmlCode)}
      `;
    
    return html`
    <div class="nicks-list">
      <div style="padding-left: 8px;">
        <icon-button name="arrow_back" id="close" @click="${this.close}"></icon-button>
        <h1 class="title">${title}</h1>
        <p class="topic">${content}</p>
      </div>
    </div>
    `;
  }
}

customElements.define("nicks-list", NicksList);