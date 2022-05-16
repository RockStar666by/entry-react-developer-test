import styled from 'styled-components';
import LogoImage from '../../assets/a-logo.svg';

export const HeaderWrapper = styled.header`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  max-width: 1440px;
  box-sizing: border-box;
  padding: 0 100px;
  background: white;
`;

export const Logo = styled.img`
  position: absolute;
  width: 41px;
  height: 41px;
  left: 0;
  right: 0;
  margin: 0 auto;
`;

export const Actions = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  right: 0;
`;

Logo.defaultProps = { src: LogoImage };
