import React from 'react';
import { bool, arrayOf, string } from 'prop-types';
import * as Styles from './styles';

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
      <Styles.SliderContainer mini={mini}>
        {gallery.map((elem, index) => {
          console.log(index, currentImageIndex);
          return <Styles.SliderImage key={elem} src={elem} isActive={index === currentImageIndex} />;
        })}

        <Styles.SliderButtons imageCount={gallery.length}>
          <Styles.SliderButton disabled={this.handleDisabledLeftButton()} onClick={this.handleClickLeftButton} />
          <Styles.SliderButton disabled={this.handleDisabledRightButton()} right onClick={this.handleClickRightButton} />
        </Styles.SliderButtons>
      </Styles.SliderContainer>
    );
  }
}

Slider.propTypes = { mini: bool, gallery: arrayOf(string).isRequired };
Slider.defaultProps = { mini: false };
