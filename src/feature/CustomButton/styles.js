import styled, { css } from 'styled-components';

const BigButton = css`
  width: 292px;
  height: 52px;
  line-height: 45px;
  font-size: 18px;
  padding: 0 22px;
`;

const SmallButton = css`
  width: 140px;
  height: 45px;
  line-height: 45px;
  font-size: 18px;
  padding: 0 22px;
`;

export const ButtonContainer = styled.button`
  cursor: pointer;
  margin: 0 auto;
  font-weight: 400;
  font-family: inherit;
  text-align: center;
  border: none;
  color: white;
  ${(props) => (props.small ? `${SmallButton}` : `${BigButton}`)};
  width: ${(props) => props.wide && '100%'};
  background: ${(props) => props.theme.primary};
  &:hover {
    filter: drop-shadow(0px 4px 11px rgba(29, 31, 34, 0.1));
  }
`;
