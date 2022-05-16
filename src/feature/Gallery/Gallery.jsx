import React from 'react';
import { arrayOf, string } from 'prop-types';
import { ThemeProvider } from 'styled-components';
import * as Styles from './styles';

const theme = { primary: '#5ece7b' };
export class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentPicture: null };
    this.onPictureClicked = this.onPictureClicked.bind(this);
  }

  componentDidMount() {
    this.setState({ currentPicture: this.props.gallery[0] });
  }

  onPictureClicked(value) {
    return () => {
      this.setState({ currentPicture: value });
    };
  }

  render() {
    const { currentPicture } = this.state;
    const { gallery } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Styles.GalleryContainer>
          <Styles.ImagesSlider>
            {gallery.map((elem) => (
              <Styles.MiniImage key={elem} bgImage={elem} onMouseEnter={this.onPictureClicked(elem)} />
            ))}
          </Styles.ImagesSlider>
          <Styles.SelectedImage bgImage={currentPicture} />
        </Styles.GalleryContainer>
      </ThemeProvider>
    );
  }
}

Gallery.propTypes = { gallery: arrayOf(string).isRequired };
