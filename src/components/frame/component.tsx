import * as React from 'react';

interface IProps {
  className?: string;
}

export class Frame extends React.Component<IProps> {
  public render() {
    return (
      <div className={this.props.className}>
        <div className="nav" />
      </div>
    );
  }
}
