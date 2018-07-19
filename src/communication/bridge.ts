import { ACCEPT, FAIL, REJECT } from '../config/CONSTANT';
import { accepted, failed, mode, rejected } from '../config/URL_PARAM';
import WebViewJavascriptBridge from '../util/WebViewJavascriptBridge';

export class Bridge {
  public action: (url: any, type: any) => void;
  public actionList = {
    default: (url: any, type: any) => url && (window.location.href = url),
    iFrame: (url: any, type: any) => window.parent.postMessage(type, '*'),
    iOS: (url: any, type: any) => type === ACCEPT && WebViewJavascriptBridge.callHandler(type, {}),
  };

  constructor(inIOS: boolean = mode === 'ios', inIframe: boolean = window.self === window.top) {
    switch (true) {
      case inIOS:
        this.action = this.actionList.iOS;
        break;
      case inIframe:
        this.action = this.actionList.iFrame;
        break;
      default:
        this.action = this.actionList.default;
        break;
    }
  }

  public accept() {
    this.action(accepted, ACCEPT);
  }

  public fail() {
    this.action(failed, FAIL);
  }

  public reject() {
    this.action(rejected, REJECT);
  }
}

export const bridge = new Bridge();
