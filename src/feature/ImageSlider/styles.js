import styled, { css } from 'styled-components';
import sliderArrow from '../../assets/slider-arrow.svg';

const BigContainer = css`
  margin: 24px;
  height: 100%;
  width: 200px;
`;

const SmallContainer = css`
  margin: 0 0 0 4px;
  height: 100%;
  width: 120px;
`;

export const SliderContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  ${(props) => (props.mini ? `${SmallContainer}` : `${BigContainer}`)};
  overflow: hidden;
`;

export const SliderImage = styled.img`
  position: absolute;
  height: 100%;
  width: auto;
  opacity: 0;
  transition: opacity ease-in-out 0.4s;
  ${(props) => props.isActive && 'opacity: 1;'}
`;

export const SliderButtons = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  height: 24px;
  width: 56px;
  bottom: 16px;
  right: 16px;
  ${(props) => props.imageCount < 2 && 'display: none;'}
`;

export const SliderButton = styled.button`
  position: relative;
  padding: 0;
  width: 24px;
  height: 24px;
  border: none;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.73);
  ${(props) => props.disabled && 'background: rgba(0, 0, 0, 0.3);'}
  &::before {
    display: flex;
    content: '';
    width: 24px;
    height: 24px;
    background: url(${sliderArrow}) center no-repeat;
    ${(props) => props.right && 'transform: scaleX(-1);'}
  }
`;
