/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  addToWishlist: function(productID) {
    this.lista = this.modelo.getWishList();
    if (!this.lista.includes(productID)){
      this.modelo.addToWishlist(productID);
    } else {
      this.modelo.removeFromWishlist(productID);
    }
  },
  addToCart: function(productObj) {
    productObj.price = parseFloat(productObj.price.replace("$",""));
    productObj.cant = 1;
    this.modelo.addToCart(productObj);
  },
  loadWishList: function(){
    this.modelo.cargarWishList();
  },

  loadCart: function(){
    this.modelo.cargarCart();
  },

  deleteToCart: function(id) {
    this.modelo.removeToCart(id);
  }

};
