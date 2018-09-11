var VistaItems = function(modelo, controlador) {
  this.modelo = modelo;
  this.controlador = controlador;
  var contexto = this;

  // suscripción de observadores
  this.modelo.itemAgregadoAWhishList.suscribir(function(modelo, productID) {
    contexto.prenderCorazon(productID);
  });

  this.modelo.itemEliminadoDeWhishList.suscribir(function(modelo, productID) {
    contexto.apagarCorazon(productID);
  });

  this.modelo.wishListReady.suscribir(function(modelo,whishList){
    
    for (var x = 0; x < whishList.length; x++){
      contexto.prenderCorazon(whishList[x]);
    }
    /*
    whishList.forEach(function(element) {
      contexto.prenderCorazon(element);
    });
    */
  });
};



VistaItems.prototype = {
  inicializar: function() {
    this.configuracionDeBotones();
    this.controlador.loadWishList();
  },

  configuracionDeBotones: function(){
    var contexto = this;

    $("button.add-to-wishlist").click(function() {
      var id = $(this).closest("div.product").attr("id");
      contexto.controlador.addToWishlist(id);
    });
    $("button.add-to-cart-btn").click(function() {
      var id = $(this).closest("div.product").attr("id");
      var productName = $("div#"+id).find("a").text();
      var productImg = $("div#"+id).find("img").attr("src");
      var productPrice = $("div#"+id).find("h4").text();
      productPrice = productPrice.substr(0,productPrice.indexOf(" "));
      var productObj = { id: id, name: productName, price: productPrice, img: productImg };
      contexto.controlador.addToCart(productObj);
    });
  },

  prenderCorazon: function(productID){
    $("div#" + productID).find("button.add-to-wishlist i").addClass('fa-heart').removeClass('fa-heart-o');
    $("div#" + productID).find("span.tooltipp").html('remove from wishlist');
  },

  apagarCorazon: function(productID){
    $("div#" + productID).find("button.add-to-wishlist i").addClass('fa-heart-o').removeClass('fa-heart');
    $("div#" + productID).find("span.tooltipp").html('add to wishlist');
  }
};