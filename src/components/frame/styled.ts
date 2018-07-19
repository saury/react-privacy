import styled from 'styled-components';

import { Frame as Component } from './component';

import Logo from '../../assets/logo.svg';

export const Frame = styled(Component)`
  &,
  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  &::after {
    content: '';
    background: rgba(0, 0, 0, 0.5);
  }
  .nav {
    width: 100%;
    height: 54px;
    background: #00b9c6 url(${Logo}) 20px center/50px 54px no-repeat;
  }
`;
