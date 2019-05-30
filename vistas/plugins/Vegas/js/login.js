jQuery(function($){

  $(".login-page").vegas({
    slides: [
      { src: "vistas/plugins/Vegas/img/shop1.jpg"},
      { src: "vistas/plugins/Vegas/img/shop2.jpg"},
      { src: "vistas/plugins/Vegas/img/shop3.jpg"},
      { src: "vistas/plugins/Vegas/img/shop4.jpg"},
      { src: "vistas/plugins/Vegas/img/shop5.jpg"}
    ],
    overlay: "vistas/plugins/Vegas/img/overlays/02.png",
    transition: ['zoomOut','slideRight','slideDown', 'fade']
  });
});
