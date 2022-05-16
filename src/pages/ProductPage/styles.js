import styled from 'styled-components';

export const ProductPageContainer = styled.div`
  position: relative;
  width: 1440px;
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: flex-start;
  box-sizing: border-box;
  padding: 80px 100px 0;
  margin-bottom: 100px;
`;

export const ProductInfoContainer = styled.article`
  width: 292px;
  min-height: 510px;
`;

export const ProductInfoHeader = styled.h2`
  margin: 0;
  font-weight: 600;
  font-size: 30px;
  line-height: 27px;
  margin-bottom: 16px;
`;

export const ProductInfoType = styled.p`
  margin: 0;
  font-weight: 400;
  font-size: 30px;
  line-height: 27px;
  margin-bottom: 43px;
`;

export const PriceContainer = styled.div`
  margin: 40px 0 20px;
`;

export const PriceHeader = styled.p`
  margin: 0;
  font-family: Roboto Condensed;
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
`;

export const PriceTag = styled.p`
  margin: 0;
  height: 46px;
  font-weight: 700;
  font-size: 24px;
  line-height: 46px;
`;

export const ParamSwitchersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Description = styled.div`
  margin-top: 40px;
  font-family: Roboto;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  max-height: 400px;
  overflow: hidden;
  ul {
    margin: 0;
    padding-left: 20px;
  }
  &:hover {
    overflow-y: overlay;
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
