import React from 'react';
import { arrayOf, string } from 'prop-types';
import { ThemeProvider } from 'styled-components';
import * as Styles from './styles';

const theme = { primary: '#5ece7b' };
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
