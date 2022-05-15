import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
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

const SliderContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  ${(props) => (props.mini ? `${SmallContainer}` : `${BigContainer}`)};
  overflow: hidden;
`;

const SliderImage = styled.img`
  position: absolute;
  height: 100%;
  width: auto;
  opacity: 0;
  transition: opacity ease-in-out 0.4s;
  ${(props) => props.isActive && 'opacity: 1;'}
`;

const SliderButtons = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  height: 24px;
  width: 56px;
  bottom: 16px;
  right: 16px;
  ${(props) => props.imageCount < 2 && 'display: none;'}
`;

const SliderButton = styled.button`
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

export class Slider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { currentImageIndex: 0 };
    this.handleClickLeftButton = this.handleClickLeftButton.bind(this);
    this.handleClickRightButton = this.handleClickRightButton.bind(this);
  }

  handleClickLeftButton() {
    console.log(this.state.currentImageIndex, this.props.gallery.length);
    if (this.state.currentImageIndex > 0) {
      this.setState((prevProps) => ({ currentImageIndex: prevProps.currentImageIndex - 1 }));
    }
  }

  handleClickRightButton() {
    console.log(this.state.currentImageIndex, this.props.gallery.length);
    if (this.state.currentImageIndex < this.props.gallery.length - 1) {
      this.setState((prevProps) => ({ currentImageIndex: prevProps.currentImageIndex + 1 }));
    }
  }

  handleDisabledLeftButton() {
    return this.state.currentImageIndex === 0;
  }

  handleDisabledRightButton() {
    return this.state.currentImageIndex === this.props.gallery.length - 1;
  }

  render() {
    const { gallery, mini } = this.props;
    const { currentImageIndex } = this.state;
    console.log(currentImageIndex);
    return (
      <SliderContainer mini={mini}>
        {/* eslint-disable-next-line */}
        {gallery.map((elem, index) => {
          console.log(index, currentImageIndex);
          return <SliderImage key={elem} src={elem} isActive={index === currentImageIndex} />;
        })}

        <SliderButtons imageCount={gallery.length}>
          <SliderButton disabled={this.handleDisabledLeftButton()} onClick={this.handleClickLeftButton} />
          <SliderButton disabled={this.handleDisabledRightButton()} right onClick={this.handleClickRightButton} />
        </SliderButtons>
      </SliderContainer>
    );
  }
}

Slider.propTypes = { mini: PropTypes.bool, gallery: PropTypes.arrayOf(PropTypes.string).isRequired };
Slider.defaultProps = { mini: false };
