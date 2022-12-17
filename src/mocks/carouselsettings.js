const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 6.1,
    slidesToScroll: 4,
    initialSlide: 0,
    arrows: false,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 5.5,
                slidesToScroll: 5.5,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 4.5,
                slidesToScroll: 4.5,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 3.5,
                slidesToScroll: 3.5
            }
        }
    ]
};

export default settings;