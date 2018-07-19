import styled from 'styled-components';

import Component from './component';

export const Panel = styled(Component)`
  &,
  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #ffffff;
  }
  .panel-header,
  .panel-footer {
    position: absolute;
    left: 0;
    width: 100%;
    height: 60px;
    line-height: 60px;
  }
  .panel-header {
    top: 0;
  }
  .panel-body {
    position: absolute;
    left: 0;
    top: 60px;
    bottom: 60px;
    overflow: hidden;
  }
  .panel-footer {
    bottom: 0;
    cursor: pointer;
  }
  ol,
  ul {
    list-style: none;
  }
`;
