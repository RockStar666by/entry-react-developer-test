import styled from 'styled-components';

export const CategoryPageContainer = styled.div`
  position: relative;
  width: 1440px;
  display: flex;
  flex-direction: column;
  flex: 1;
  box-sizing: border-box;
  padding: 80px 100px 0;
  margin-bottom: 190px;
`;

export const CategoryPageTitle = styled.h2`
  margin: 0;
  position: relative;
  margin-bottom: 100px;
  height: 70px;
  font-weight: 400;
  font-size: 42px;
  line-height: 70px;
`;

export const ProductsContainer = styled.div`
  position: relative;
  margin-bottom: 50px;
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
`;
