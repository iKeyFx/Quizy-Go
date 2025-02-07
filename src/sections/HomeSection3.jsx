import { LazyLoadImage } from "react-lazy-load-image-component";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import TestimonyImage1 from "../asset/testi-1.png";
import TestimonyImage2 from "../asset/testi-2.png";
import TestimonyImage3 from "../asset/testi-3.png";
import TestimonyCardComponent from "../components/TestimonyCardComponent";
import LaptopImageH from "../asset/laptopH.png";
import LaptopMobile from "../asset/laptopImage.png";

const StyledSection = styled.section``;
const StyledUsersFeedback = styled.div`
  /* display: flex; */
  /* flex-direction: column;
  align-items: center; */
  padding: 3rem 0;

  h2 {
    color: var(--color-primary);
    margin-bottom: 2rem;
    text-align: center;
  }

  @media (max-width: 500px) {
    font-size: 12px;
  }
`;

const StyledDiv2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 5rem;

  @media (max-width: 1020px) {
    flex-direction: column-reverse;
    padding-right: 0;
  }

  @media (max-width: 500px) {
    font-size: 12px;
  }
`;

const StyledFunCon = styled.div`
  border: 1px solid var(--color-primary);
  border-radius: 8px;
  padding: 0 0.2rem 0.2rem;
  display: flex;
  flex-direction: column;
  h2 {
    color: var(--color-primary);
    margin-top: 0;
  }
  p {
    color: var(--color-gray-text);
    font-size: 12px;
  }
`;

const Button = styled.button`
  background-color: var(--color-primary);
  color: var(--color-white);
  width: 470px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;

  &:hover {
    background-color: var(--color-primary-2);
  }

  @media (max-width: 640px) {
    width: 300px;
  }
`;

const StyledImage = styled(LazyLoadImage)`
  @media (max-width: 1020px) {
    display: none;
  }
`;

const StyledImageMobile = styled(LazyLoadImage)`
  display: none;
  @media (max-width: 1020px) {
    display: grid;
  }

  @media (max-width: 640px) {
    width: 300px;
  }
`;
function HomeSection3() {
  return (
    <StyledSection>
      <StyledUsersFeedback>
        <div>
          <h2>What our users have said</h2>
        </div>

        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={false}
          modules={[Autoplay, Navigation]}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          <SwiperSlide>
            <TestimonyCardComponent
              name="Dave Steve"
              text="Using quizzy has changed my knowledge base. Its has helped me prepare for school test better."
              image={TestimonyImage1}
            />
          </SwiperSlide>
          <SwiperSlide>
            <TestimonyCardComponent
              name="Emmanuel Rhema"
              text="Used to play around tests and quizzes but using quizzy made my study fun while being fun and engaging."
              image={TestimonyImage2}
            />
          </SwiperSlide>
          <SwiperSlide>
            <TestimonyCardComponent
              name="Dave Steve"
              text="Using quizzy has changed my knowledge base. Its has helped me prepare for school test better."
              image={TestimonyImage1}
            />
          </SwiperSlide>
          <SwiperSlide>
            <TestimonyCardComponent
              name="Emmanuel Rhema"
              text="Used to play around tests and quizzes but using quizzy made my study fun while being fun and engaging."
              image={TestimonyImage3}
            />
          </SwiperSlide>
        </Swiper>
      </StyledUsersFeedback>

      <StyledDiv2>
        <div>
          <StyledImage src={LaptopImageH} alt="Quizz App" />
          <StyledImageMobile src={LaptopMobile} alt="Quizz App" />
        </div>

        <StyledFunCon>
          <div>
            <h2>Fun, Fast, and Free!</h2>
            <p>One challenge a day, keeps the doctor away!</p>
          </div>
          <Button>Start playing today</Button>
        </StyledFunCon>
      </StyledDiv2>
    </StyledSection>
  );
}

export default HomeSection3;
