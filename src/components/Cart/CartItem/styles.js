import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import DeleteIcon from '../../../assets/delete-button.svg';

export const CartItemContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 336px;

  border-bottom: ${(props) => (props.mini ? 'none' : '1px solid #e5e5e5')};
  &:first-child {
    border-top: ${(props) => (props.mini ? 'none' : '1px solid #e5e5e5')};
  }

  &:hover {
    .delete-button {
      opacity: 0.2;
    }
  }
  ${(props) =>
    props.mini &&
    `box-sizing: border-box;
    border-left: 6px solid transparent;
    padding: 0 16px 0 10px;
    height: auto;
    min-height: 190px;
    &:hover {
    border-left: 6px solid #5ece7b;
  }`};
`;

const SmallDeleteButton = css`
  width: 24px;
  height: 24px;
  right: 16px;
  top: 0px;
  background-size: 16px;
`;

const BigDeleteButton = css`
  width: 45px;
  height: 45px;
  right: 24px;
  top: 24px;
  background-size: 24px;
`;

export const DeleteButton = styled.button`
  cursor: pointer;
  position: absolute;
  border: 1px solid black;
  background: url(${DeleteIcon}) center no-repeat;
  ${(props) => (props.mini ? `${SmallDeleteButton}` : `${BigDeleteButton}`)}
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  z-index: 1;
  &:hover {
    filter: invert(20%) sepia(89%) saturate(7314%) hue-rotate(357deg) brightness(92%) contrast(119%);
    opacity: 1 !important;
  }
`;

export const CustomLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:hover {
    text-decoration: underline;
  }
`;

export const SettingsLeft = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const SettingsRight = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: ${(props) => (props.mini ? '0' : '24px 0')};
`;

const BigHeader = css`
  margin: 24px 0 0;
  font-weight: 600;
  font-size: 30px;
  line-height: 27px;
`;

const SmallHeader = css`
  margin: 0;
  font-weight: 300;
  font-size: 16px;
  line-height: 26px;
`;

export const CartItemHeader = styled.h2`
  ${(props) => (props.mini ? `${SmallHeader}` : `${BigHeader}`)};
`;

const BigType = css`
  margin: 16px 0 0;
  font-weight: 400;
  font-size: 30px;
  line-height: 27px;
`;

export const CartItemType = styled.p`
  ${(props) => (props.mini ? `${SmallHeader}` : `${BigType}`)};
`;

export const ParamSwitcherContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  ${(props) => (props.mini ? 'height: auto;' : 'height: 180px;')};
  column-gap: 40px;
  pointer-events: none;
`;

const BigPriceTag = css`
  margin: 20px 0 20px;
  height: 24px;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
`;

const SmallPriceTag = css`
  margin: 0;
  font-weight: 500;
  font-size: 16px;
  line-height: 34px;
`;

export const PriceTag = styled.p`
  ${(props) => (props.mini ? `${SmallPriceTag}` : `${BigPriceTag}`)};
`;
