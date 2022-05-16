import styled from 'styled-components';

export const GalleryContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 730px;
  height: 510px;
  margin-right: 100px;
`;

export const ImagesSlider = styled.div`
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

export const MiniImage = styled.div`
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

export const SelectedImage = styled.div`
  position: relative;
  width: 610px;
  height: 510px;
  background: url(${(props) => props.bgImage}) center no-repeat;
  background-size: contain;
`;
