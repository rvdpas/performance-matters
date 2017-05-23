(function (){
  var app = {
    htmlElements: {
      loader: document.querySelector('.loader-wrapper')
    },
    init: function() {
      loader.setLoader();
    }
  };

  var loader = {
    setLoader: function() {
      console.log('loader')
      setTimeout(function() {
        app.htmlElements.loader.classList.add('hide');
      }, 1000);
    }
  };

  app.init();

})();
