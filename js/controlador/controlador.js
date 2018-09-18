/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  logIn: function(user, pass) {
    this.modelo.logIn(user, pass);
  },

  loadProducts: function() {
    this.modelo.loadProducts();
  },

  addToWishlist: function(productID) {
    var lista = this.modelo.getWishList();
    if (!lista.includes(productID)){
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
