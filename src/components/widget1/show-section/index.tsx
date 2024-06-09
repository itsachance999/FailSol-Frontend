import { Paper, styled } from "@mui/material";

import Show1 from "../../../assets/showcase/1.png";
import Show2 from "../../../assets/showcase/2.png";
import Show3 from "../../../assets/showcase/3.png";
import Show4 from "../../../assets/showcase/4.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

type Props = {};
const Root = styled(Paper)(() => ({
  borderRadius: 16,
  padding: 16,
  display: "flex",
  justifyContent: "center",
  height: 300,
  //   width: "100%",

  //   width: "100%",
}));
const Image = styled("img")(({ theme }) => ({
  borderRadius: "14px",
  [theme.breakpoints.down("sm")]: {
    width: 300,
  },
}));
const ShowSection = (_props: Props) => {
  return (
    <Root>
      <Swiper
        pagination={{ clickable: true }}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
        }}
        navigation={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        // style={{ display: "flex", justifyContent: "center" }}
        // spaceBetween={50}
        slidesPerView={1}
        modules={[Autoplay, Pagination, Navigation]}
        // effect="fade"

        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide style={{ display: "flex", justifyContent: "center" }}>
          <Image src={Show1} alt="show" />
        </SwiperSlide>
        <SwiperSlide style={{ display: "flex", justifyContent: "center" }}>
          <Image src={Show2} alt="show" />
        </SwiperSlide>
        <SwiperSlide style={{ display: "flex", justifyContent: "center" }}>
          <Image src={Show3} alt="show" />
        </SwiperSlide>
        <SwiperSlide style={{ display: "flex", justifyContent: "center" }}>
          <Image src={Show4} alt="show" />
        </SwiperSlide>
        ...
      </Swiper>

      {/* <Carousel
        responsive={{
          desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
          },
          tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
          },
          mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
          },
        }}
      >
        <div>
        </div>
        <div>
          <img src={Show2} alt="show" height={"400px"} />
        </div>
        <div>
          <img src={Show3} alt="show" height={"400px"} />
        </div>
        <div>
          <img src={Show4} alt="show" height={"400px"} />
        </div>
        <div>
          <img src={Show5} alt="show" height={"400px"} />
        </div>
      </Carousel> */}
    </Root>
  );
};

export default ShowSection;
