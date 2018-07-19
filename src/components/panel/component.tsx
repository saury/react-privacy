import * as React from 'react';
import { Trans, translate } from 'react-i18next';
import { Scroll } from '..';
import { bridge } from '../../communication/bridge';
import { get, post } from '../../communication/http';
import { DELAY } from '../../config/CONSTANT';
import { url } from '../../config/URL';
import { mode, productid, rejected } from '../../config/URL_PARAM';
import { verifyUrlParams } from '../../util/param_verify';

interface IProps {
  className?: string;
}

interface IState {
  content: any;
  submitActived: boolean;
  submitHidden: boolean;
}

class Panel extends React.Component<IProps, IState> {
  public privacyDocumentId: string;

  constructor(props: IProps) {
    super(props);
    this.state = {
      content: { __html: 'loading...' },
      submitActived: false,
      submitHidden: false,
    };
    this.agree = this.agree.bind(this);
  }

  public componentDidMount() {
    this.getContent();
  }

  public getContent() {
    try {
      verifyUrlParams();
      get({
        url: url.getPrivacyMsgUrl,
      }).then((resolve) => {
        if (!resolve || !resolve.data) {
          return;
        }
        this.privacyDocumentId = resolve.data.Id;
        this.setState({
          content: { __html: resolve.data.UrlContent },
          submitActived: true,
        });
      });
    } catch (error) {
      this.setState({
        content: {
          __html: `<h2>There's something wrong with this page, try refreshing!</h2>
          Error information: <em>${error}</em>`,
        },
      });
    }
  }

  public agree() {
    if (!this.state.submitActived) {
      return;
    }
    this.setState({
      submitActived: false,
    });
    // this.submitAjaxStatus = false;
    try {
      post({
        data: {
          privacyDocumentId: this.privacyDocumentId,
          product: productid,
        },
        timeout: DELAY,
        url: url.postStudentAgreement,
      }).then(() => {
        bridge.accept();
        this.setState({
          submitHidden: true,
        });
        // removeClass($submitBtn, 'show');
      });
    } catch (error) {
      this.setState({
        submitActived: true,
      });
      bridge.fail();
    }
  }

  public close() {
    bridge.reject();
  }

  public render() {
    return (
      <div className={this.props.className}>
        {/* header */}
        <div className="panel-header">
          <span>
            <Trans>EF Privacy Policy</Trans>
          </span>
          {(mode !== 'ios' || !rejected) && <i className="close-icon" onClick={this.close} />}
        </div>
        {/* body */}
        <Scroll className="panel-body">
          <div dangerouslySetInnerHTML={this.state.content} />
        </Scroll>
        {/* footer */}
        <div
          className={`panel-footer ${!this.state.submitActived && 'disabled'} ${this.state.submitHidden && 'hidden'}`}
          onClick={this.agree}
        >
          <Trans>Yes, I agree</Trans>
        </div>
      </div>
    );
  }
}

export default translate('translations')(Panel);
