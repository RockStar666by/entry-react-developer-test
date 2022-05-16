import styled from 'styled-components';

export const CounterContainer = styled.div`
  margin-bottom: 16px;
`;

export const CounterHeader = styled.p`
  height: 18px;
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
`;

export const CounterField = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: row;
`;

export const Quantity = styled.div`
  width: 60px;
  height: 24px;
  line-height: 24px;
  font-size: 18px;
  text-align: center;
`;

export const ChangeCountButton = styled.button`
  padding: 0;
  background: none;
  cursor: pointer;
  width: 24px;
  height: 24px;
  line-height: 22px;
  font-size: 24px;
  font-weight: 400;
  text-align: center;
  box-sizing: border-box;
  border: 1px solid black;
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
