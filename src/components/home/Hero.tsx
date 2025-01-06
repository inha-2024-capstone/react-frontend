import { HeroImg } from '../../assets/home';
import styled from 'styled-components';

const Hero: React.FC = () => {
  return (
    <HeroContainer>
      {/* Hero 이미지 */}
      <HeroPicture>
        <HeroSource
          type="image/webp"
          srcSet="https://yoger.o-r.kr/img/goods-demo.55b05bb4.webp"
        />
        <HeroImgWrapper src={HeroImg} alt="hero" />
      </HeroPicture>

      {/* Hero 텍스트 */}
      <HeroHgroup>
        <HeroP>Custom</HeroP>
        <HeroH2>
          판매중인 Yoger의
          <HeroBr /> 커스텀 굿즈
        </HeroH2>
      </HeroHgroup>
    </HeroContainer>
  );
};

export default Hero;

const HeroContainer = styled.section`
  height: 8rem;
  width: calc(100% - 2rem);
  display: flex;
  background-color: #1d1d1d;
  align-self: center;
  border-radius: 12px;
  margin-top: 1rem;
`;
const HeroPicture = styled.picture`
  height: 100%;
`;
const HeroSource = styled.source``;
const HeroImgWrapper = styled.img`
  height: 100%;
  border-radius: 12px 0 0 12px;
`;
const HeroHgroup = styled.hgroup`
  margin-left: 1rem;
  margin-top: auto;
`;
const HeroP = styled.p`
  color: #0deffd;
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
`;
const HeroH2 = styled.h2`
  color: #fff;
  font-size: 1rem;
  margin-top: 0;
`;
const HeroBr = styled.br``;
