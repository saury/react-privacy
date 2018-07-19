import axios from 'axios';
import * as React from 'react';
import { Trans, translate } from 'react-i18next';
import { Scroll } from '..';
import { url } from '../../config/URL';
import { isLocationParamValid } from '../../util/param_verify';

interface IProps {
  className?: string;
}

class Panel extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      content: { __html: 'loading...' },
    };
    this.getContent();
  }

  public getContent() {
    if (isLocationParamValid()) {
      axios({
        method: 'get',
        url: url.getPrivacyMsgUrl,
      }).then((resolve) => {
        if (!resolve || !resolve.data || !resolve.data.UrlContent) {
          return;
        }
        this.setState({
          content: { __html: resolve.data.UrlContent },
        });
      });
    }
  }

  public render() {
    return (
      <div className={this.props.className}>
        {/* header */}
        <div className="panel-header">
          <span>
            <Trans>EF Privacy Policy</Trans>
          </span>
        </div>
        {/* body */}
        <Scroll className="panel-body">
          <div dangerouslySetInnerHTML={this.state.content} />
        </Scroll>
        {/* footer */}
        <div className="panel-footer">
          <Trans>Yes, I agree</Trans>
        </div>
      </div>
    );
  }
}

export default translate('translations')(Panel);
