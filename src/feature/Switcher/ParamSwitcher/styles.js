import styled, { css } from 'styled-components';

export const ParamListContainer = styled.div``;

const BigHeader = css`
  text-transform: uppercase;
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
`;

const SmallHeader = css`
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-transform: capitalize;
  margin: 8px 0;
`;

export const ParamHeader = styled.p`
  margin: 0;
  height: 18px;
  font-family: Roboto Condensed;
  ${(props) => (props.miniCart ? `${SmallHeader}` : `${BigHeader}`)};
`;

export const ParamList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => (props.mini ? '8px' : '12px')};
`;

const SmallTextListItem = css`
  min-width: 24px;
  height: 24px;
  line-height: 24px;
  font-size: 14px;
  padding: 0 3px;
`;

const BigTextListItem = css`
  min-width: 63px;
  height: 45px;
  line-height: 45px;
  font-size: 18px;
  padding: 0 10px;
`;

export const ListItem = styled.li`
  cursor: pointer;
  font-family: Source Sans Pro;
  font-weight: 400;
  text-align: center;
  list-style: none;
  box-sizing: border-box;
  border: 1px solid black;
  background: ${(props) => props.active && 'black'};
  ${(props) => (props.mini ? `${SmallTextListItem}` : `${BigTextListItem}`)};
  color: ${(props) => props.active && 'white'};
  &:hover {
    color: white;
    background: ${(props) => props.theme.primary};
    border-color: ${(props) => props.theme.primary};
  }
  &:before {
    content: '${(props) => props.value}';
  }
`;

const SmallColorListItem = css`
  width: 16px;
  height: 16px;
`;

const BigColorListItem = css`
  width: 32px;
  height: 32px;
`;

export const ColorItem = styled.li`
  cursor: pointer;
  filter: drop-shadow(0px 4px 11px rgba(29, 31, 34, 0.2));
  background: ${(props) => props.value};
  ${(props) => (props.mini ? `${SmallColorListItem}` : `${BigColorListItem}`)};
  outline: ${(props) => props.active && `2px solid ${props.theme.primary}`};
  outline-offset: 1px;
  &:hover {
    color: white;
    outline: 2px solid ${(props) => props.theme.primary};
  }
`;
