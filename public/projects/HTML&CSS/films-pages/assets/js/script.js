// $('.sl-genres').slick(

// );

$('.sl-genres').slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 7,
    slidesToScroll: 5,
    arrows: false,
    responsive: [
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 4,
          infinite: true,
          dots: false,
          arrows: false
        }
      },
      {
        breakpoint: 780,
        settings: {
          infinite: true,
          slidesToShow: 5,
          slidesToScroll: 3,
          arrows: false
        }
      },
      {
        breakpoint: 670,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          arrows: false
        }
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          arrows: false
        }
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          arrows: false
        }
      }
    ]
  });