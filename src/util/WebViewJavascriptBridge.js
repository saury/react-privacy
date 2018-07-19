(function() {
  /**
   * If the platform is on a browser on desktop, disable this plugin.
   * Currently check whether it is on a browser by checking parameter "m".
   * Can be checked by user agent instead.
   * The goal is to prevent the Safari from showing warning message in a popup window.
   * This issue happened on Mac-Book Safari.
   */
  var inBrowserMode = true;
  var localtionSearch = getLocationObj();
  if (localtionSearch.mode === 'ios') inBrowserMode = false;
  if (inBrowserMode) {
    window.WebViewJavascriptBridge = {
      init: doNothing,
      send: doNothing,
      registerHandler: doNothing,
      callHandler: doNothing,
      _fetchQueue: doNothing,
      _handleMessageFromObjC: doNothing,
    };
    return;
  }

  function getLocationObj() {
    let searchStr = window.location.search,
      searchArr = searchStr.substr(1).split('&'),
      searchObj = {};

    searchArr.forEach((item) => {
      let itemArr = item.split('=');
      searchObj[itemArr[0]] = Number(itemArr[1]) ? Number(itemArr[1]) : itemArr[1];
    });

    return searchObj;
  }
  function doNothing() {}

  if (window.WebViewJavascriptBridge) {
    return;
  }
  var messagingIframe;
  var sendMessageQueue = [];
  var receiveMessageQueue = [];
  var messageHandlers = {};

  var CUSTOM_PROTOCOL_SCHEME = 'wvjbscheme';
  var QUEUE_HAS_MESSAGE = '__WVJB_QUEUE_MESSAGE__';

  var responseCallbacks = {};
  var uniqueId = 1;

  function _createQueueReadyIframe(doc) {
    messagingIframe = doc.createElement('iframe');
    messagingIframe.style.display = 'none';
    messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + '://' + QUEUE_HAS_MESSAGE;
    doc.documentElement.appendChild(messagingIframe);
  }

  function init(messageHandler) {
    if (WebViewJavascriptBridge._messageHandler) {
      throw new Error('WebViewJavascriptBridge.init called twice');
    }
    WebViewJavascriptBridge._messageHandler = messageHandler;
    var receivedMessages = receiveMessageQueue;
    receiveMessageQueue = null;
    for (var i = 0; i < receivedMessages.length; i++) {
      _dispatchMessageFromObjC(receivedMessages[i]);
    }
  }

  function send(data, responseCallback) {
    _doSend({ data: data }, responseCallback);
  }

  function registerHandler(handlerName, handler) {
    messageHandlers[handlerName] = handler;
  }

  function callHandler(handlerName, data, responseCallback) {
    _doSend({ handlerName: handlerName, data: data }, responseCallback);
  }

  function _doSend(message, responseCallback) {
    if (responseCallback) {
      var callbackId = 'cb_' + uniqueId++ + '_' + new Date().getTime();
      responseCallbacks[callbackId] = responseCallback;
      message['callbackId'] = callbackId;
    }
    sendMessageQueue.push(message);
    messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + '://' + QUEUE_HAS_MESSAGE;
  }

  function _fetchQueue() {
    var messageQueueString = JSON.stringify(sendMessageQueue);
    sendMessageQueue = [];
    return messageQueueString;
  }

  function _dispatchMessageFromObjC(messageJSON) {
    function _timeoutDispatchMessageFromObjC() {
      var message = JSON.parse(messageJSON);
      var messageHandler;

      if (message.responseId) {
        var responseCallback = responseCallbacks[message.responseId];
        if (!responseCallback) {
          return;
        }
        responseCallback(message.responseData);
        delete responseCallbacks[message.responseId];
      } else {
        var responseCallback;
        if (message.callbackId) {
          var callbackResponseId = message.callbackId;
          responseCallback = function(responseData) {
            _doSend({ responseId: callbackResponseId, responseData: responseData });
          };
        }

        var handler = WebViewJavascriptBridge._messageHandler;
        if (message.handlerName) {
          handler = messageHandlers[message.handlerName];
        }

        try {
          handler(message.data, responseCallback);
        } catch (exception) {
          if (typeof console != 'undefined') {
            console.log('WebViewJavascriptBridge: WARNING: javascript handler threw.', message, exception);
          }
        }
      }
    }
    _timeoutDispatchMessageFromObjC();
  }

  function _handleMessageFromObjC(messageJSON) {
    if (receiveMessageQueue) {
      receiveMessageQueue.push(messageJSON);
    } else {
      _dispatchMessageFromObjC(messageJSON);
    }
  }

  window.WebViewJavascriptBridge = {
    init: init,
    send: send,
    registerHandler: registerHandler,
    callHandler: callHandler,
    _fetchQueue: _fetchQueue,
    _handleMessageFromObjC: _handleMessageFromObjC,
  };

  var doc = document;
  _createQueueReadyIframe(doc);
  //var readyEvent = doc.createEvent('Events')
  //readyEvent.initEvent('WebViewJavascriptBridgeReady')
  //readyEvent.bridge = WebViewJavascriptBridge
  //doc.dispatchEvent(readyEvent)
})();

export default window.WebViewJavascriptBridge;
