import styled from 'styled-components';

import CheckedIcon from '../../../assets/check-mark.svg';
import ArrowImage from '../../../assets/dropdown-arrow.svg';

export const DropDownContainer = styled.div`
  margin: 0 auto;
  height: 40px;
  width: 40px;
  font-weight: 500;
  font-size: 18px;
  z-index: 10;
`;

export const DropDownHeader = styled.div`
  display: flex;
  margin-right: 10px;
  justify-content: flex-end;
  align-items: center;
  min-width: 30px;
  height: 40px;
  background: #ffffff;
  &:hover {
    color: ${(props) => props.theme.primary};
  }
`;

export const Checked = styled.img`
  margin-left: 10px;
  width: 15px;
  height: 15px;
`;

Checked.defaultProps = { src: CheckedIcon };

export const DropDownListContainer = styled.div``;

export const DropDownList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 94px;
  margin-left: -20px;
  padding-left: 20px;
  background: #ffffff;
  filter: drop-shadow(0px 4px 35px rgba(168, 172, 176, 0.19));
  &:first-child {
    padding-top: 20px;
  }
`;

export const ListItem = styled.li`
  height: 30px;
  line-height: 30px;
  list-style: none;
  margin-bottom: 0.8em;
  &:hover {
    color: ${(props) => props.theme.primary};
  }
`;

export const Arrow = styled.img`
  margin-left: 10px;
  transition: transform 0.5s;
  transform: ${(props) => (props.rotate ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

Arrow.defaultProps = { src: ArrowImage };
