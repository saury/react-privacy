import * as React from 'react';
// tslint:disable-next-line:no-var-requires
const BScroll = require('better-scroll').default;

interface IProps {
  className?: string;
}

export class Scroll extends React.Component<IProps> {
  public scroll: any;
  public ScrollRef: React.RefObject<HTMLDivElement>;
  constructor(props: IProps) {
    super(props);
    this.ScrollRef = React.createRef();
  }
  public componentDidMount() {
    this.scroll = new BScroll(this.ScrollRef.current, {
      mouseWheel: {
        easeTime: 300,
        invert: false,
        speed: 20,
      },
      scrollbar: {
        fade: false,
        interactive: true,
      },
    });
  }
  public render() {
    return (
      <div ref={this.ScrollRef} className={this.props.className}>
        {this.props.children}
      </div>
    );
  }
  public componentWillUnmount() {
    this.scroll.destroy();
  }
}
