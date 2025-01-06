import styled from 'styled-components';

const Footer: React.FC = () => {
  return (
    <Container>
      <FooterText>
        <FooterSmall>Copyright © 2024 Team MOG</FooterSmall>
      </FooterText>
    </Container>
  );
};

export default Footer;

const Container = styled.footer`
  background-color: #f8f9fa;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  color: #495057;
  padding: 1rem 0 4rem 0;
`;
const FooterText = styled.p``;
const FooterSmall = styled.small``;
