import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Autoplay, Keyboard, Mousewheel, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './SlideShow.css';
import { Link } from 'react-router-dom';

const SlideShow = ({ items }) => {
	return (
		<Swiper
			modules={[Autoplay, Navigation, Mousewheel, Keyboard]}
			cssMode={true}
			spaceBetween={30}
			slidesPerView={4}
			navigation={true}
			mousewheel={true}
			keyboard={true}
			// autoplay={{
			// 	delay: 3500,
			// }}
		>
			{items?.map(({ idProduct, nameProduct, images }) => (
				<SwiperSlide key={idProduct}>
					<img src={images} alt="" />
					<Link to={`/book/${idProduct}`}>{nameProduct}</Link>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default SlideShow;
