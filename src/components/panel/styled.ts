import styled from 'styled-components';

import Close from '../../assets/close.svg';
import Component from './component';

export const Panel = styled(Component)`
  font-family: 'Helvetica Neue', 'Arial', 'sans-serif';
  &,
  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    background: #ffffff;
    max-width: 100%;
    max-height: 100%;
    transition: all 0.2s;
  }
  @media screen and (min-width: 660px) {
    max-width: 620px;
    max-height: 500px;
    border-radius: 8px;
    overflow: hidden;
  }
  .panel-header,
  .panel-footer {
    position: absolute;
    left: 0;
    width: 100%;
    height: 60px;
    line-height: 60px;
    padding: 0 20px;
  }
  .close-icon {
    position: absolute;
    width: 16px;
    height: 16px;
    right: 20px;
    top: 50%;
    margin-top: -8px;
    background: url(${Close}) center/contain no-repeat;
    cursor: pointer;
  }
  .panel-header {
    top: 0;
    font-size: 20px;
    text-align: left;
    background: #f6f8fa;
  }
  .panel-body {
    position: absolute;
    left: 0;
    top: 60px;
    bottom: 60px;
    overflow: hidden;
    text-align: left;
    font-size: 14px;
    > div:first-child {
      padding: 20px;
    }
    h1 {
      font-size: 2em;
      margin: 0.67em 0;
    }
    h2 {
      font-size: 1.5em;
      margin: 0.83em 0;
    }
    p {
      margin: 1em 0;
    }
    ol {
      margin: 1em 0 1em 40px;
    }
    blockquote {
      margin: 1em 40px;
    }
  }
  .panel-footer {
    bottom: 0;
    cursor: pointer;
    color: #64a0ff;
    font-weight: 600;
    &.disabled {
      color: #ccc;
      cursor: not-allowed;
    }
    &.hidden {
      color: transparent;
      cursor: default;
    }
  }
  ol,
  ul {
    list-style: none;
  }
`;
