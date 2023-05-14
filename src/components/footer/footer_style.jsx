import styled from 'styled-components';

export const Box = styled.div`
  margin-top: 20px;
  padding: 10px;
  background: #4BA0A0;
  bottom: 0;
  width: 100%;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 1000px;
    margin: 0 auto;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 60px;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 
                         minmax(185px, 1fr));
  grid-gap: 20px;
`;

export const FooterLink = styled.a`
  color: #fff;
  margin-bottom: 20px;
  font-size: 13px;
  text-decoration: none;
   
  &:hover {
      color: green;
      transition: 200ms ease-in;
  }
`;

export const Heading = styled.p`
  font-size: 19px;
  color: #fff;
  margin-bottom: 20px;
  font-weight: bold;
`;
