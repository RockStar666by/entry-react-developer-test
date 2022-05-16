import styled, { css } from 'styled-components';

export const CounterContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${(props) => (props.mini ? '24px' : '45px')};
  height: 100%;
`;

const SmallQuantity = css`
  width: 24px;
  height: 16px;
  line-height: 16px;
  font-size: 16px;
`;

const BigQuantity = css`
  width: 45px;
  height: 24px;
  line-height: 24px;
  font-size: 24px;
`;

export const Quantity = styled.div`
  ${(props) => (props.mini ? `${SmallQuantity}` : `${BigQuantity}`)};
  font-weight: 500;
  text-align: center;
`;

const BigButton = css`
  width: 45px;
  height: 45px;
  line-height: 38px;
  font-size: 38px;
`;

const SmallButton = css`
  width: 24px;
  height: 24px;
  line-height: 20px;
  font-size: 28px;
  text-align: left;
  &::first-letter {
    margin-left: -3px;
  }
`;

export const ChangeCountButton = styled.button`
  padding: 0;
  background: none;
  cursor: pointer;
  font-weight: 100;
  text-align: center;
  box-sizing: border-box;
  border: 1px solid black;
  ${(props) => (props.mini ? `${SmallButton}` : `${BigButton}`)}
  &:hover {
    color: white;
    background: ${(props) => props.theme.primary};
    border-color: ${(props) => props.theme.primary};
  }
  &:active {
    background: black;
    border-color: black;
  }
`;
