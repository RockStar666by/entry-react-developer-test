import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';

const theme = { primary: '#5ece7b' };

const GalleryContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 730px;
  height: 510px;
  margin-right: 100px;
`;

const ImagesSlider = styled.div`
  position: relative;
  overflow-y: hidden;
  overflow-x: hidden;
  scroll-padding: 50px 0 0 50px;
  width: 97px;
  height: 480px;
  margin-right: 23px;
  &:hover {
    overflow-y: auto;
  }
  > *:not(:last-child) {
    margin-bottom: 20px;
  }
  &::-webkit-scrollbar {
    background-color: transparent;
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #babac0;
    border-radius: 6px;
  }
  &::-webkit-scrollbar-button {
    display: none;
  }
`;

const MiniImage = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  box-sizing: border-box;
  border: 2px solid transparent;
  background: url(${(props) => props.bgImage}) center no-repeat;
  background-size: cover;
  &:hover {
    border-color: ${(props) => props.theme.primary};
  }
`;

const SelectedImage = styled.div`
  position: relative;
  width: 610px;
  height: 510px;
  background: url(${(props) => props.bgImage}) center no-repeat;
  background-size: contain;
`;

export class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentPicture: null };
    this.handleChange = this.handleChange.bind(this);
    this.onPictureClicked = this.onPictureClicked.bind(this);
  }

  componentDidMount() {
    this.setState({ currentPicture: this.props.gallery[0] });
  }

  handleChange(event) {
    console.log(this.state);
    this.setState({ currentOption: event.target.value });
  }

  onPictureClicked(value) {
    return () => {
      this.setState({ currentPicture: value });
      console.log(value);
    };
  }

  render() {
    const { currentPicture } = this.state;
    const { gallery } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <GalleryContainer>
          <ImagesSlider>
            {gallery.map((elem) => (
              <MiniImage key={elem} bgImage={elem} onMouseEnter={this.onPictureClicked(elem)} />
            ))}
          </ImagesSlider>
          <SelectedImage bgImage={currentPicture} />
        </GalleryContainer>
      </ThemeProvider>
    );
  }
}

Gallery.propTypes = { gallery: PropTypes.arrayOf(PropTypes.string).isRequired };
