var VistaWishList = function(modelo, controlador) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.cantidad = 0;
  var contexto = this;

  // suscripción de observadores
  this.modelo.itemAgregadoAWhishList.suscribir(function() {
    contexto.incrementarContador();
  });

  this.modelo.itemEliminadoDeWhishList.suscribir(function() {
    contexto.decrementarContador();
  });

  this.modelo.wishListReady.suscribir(function(modelo,whishList){
    contexto.cantidad = whishList.length;
    contexto.actualizarVistaCantidad(contexto.cantidad);
  });

};


VistaWishList.prototype = {
  inicializar: function() {
    this.controlador.loadWishList();
  },
  actualizarVistaCantidad: function(cant){
    $("#wishlist-qty").html(cant);
  },
  incrementarContador: function(){
    this.cantidad++;
    //$("#wishlist-qty").html(this.cantidad);
    this.actualizarVistaCantidad(this.cantidad);
  },

  decrementarContador: function(){
    this.cantidad--;
    //$("#wishlist-qty").html(this.cantidad);
    this.actualizarVistaCantidad(this.cantidad);
  },
};
