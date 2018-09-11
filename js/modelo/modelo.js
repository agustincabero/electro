/*
 * Modelo
 */
var Modelo = function() {
  this.whishList = [];
  this.cart = [];
  this.subtotal = 0;
  contexto = this;
  //inicializacion de eventos
  this.itemAgregadoAWhishList = new Evento(this);
  this.itemEliminadoDeWhishList = new Evento(this);
  this.wishListReady = new Evento(this);
  this.carritoLlenado = new Evento(this);
};

Modelo.prototype = {
  addToWishlist: function(productID) {
    this.whishList.push(productID);
    this.itemAgregadoAWhishList.notificar(productID);
    this.guardar("wishListItems",this.whishList);
  },

  removeFromWishlist: function(productID){
    var index = this.whishList.indexOf(productID);
    if (index > -1) {
      this.whishList.splice(index, 1);
      this.itemEliminadoDeWhishList.notificar(productID);
      this.guardar("wishListItems",this.whishList);
    }
  },

  //se guardan en el local storage
  guardar: function(dest,element){
    localStorage.setItem(dest,JSON.stringify(element));
  },

  getWishList: function() {
    return this.whishList;
  },

  cargarWishList: function(){
    var lista = localStorage.getItem("wishListItems");
    if(lista) {
      this.whishList = JSON.parse(lista);
    }
    this.wishListReady.notificar(this.whishList);
  },

  cargarCart: function(){
    var listaCarro = localStorage.getItem("miCarrito");
    if(listaCarro){
      this.cart = JSON.parse(listaCarro);
    };
    this.calcularSubtotal();
    this.carritoLlenado.notificar({cart: this.cart, subtotal: this.subtotal});
  },

  addToCart: function(productObj){
    var carritoId = this.cart.map(function(elemento){
      return elemento.id;
    });
    var index = carritoId.indexOf(productObj.id);
    if(index < 0){
      this.cart.push(productObj);
    }
    else{
      this.cart[index].cant++;
    }
    this.calcularSubtotal();
    this.guardar("miCarrito",this.cart);
    this.carritoLlenado.notificar({cart: this.cart, subtotal: this.subtotal})
    
  },

  removeToCart: function(id){
    for(var i=0; i < this.cart.length; i++){
      if(this.cart[i].id == id) {
        if(this.cart[i].cant > 1) {
          this.cart[i].cant--;
        } else {
          this.cart.splice(i, 1);
        };        
        
      }
    }
    this.calcularSubtotal();
    this.guardar("miCarrito",this.cart);   
    this.carritoLlenado.notificar({cart: this.cart, subtotal: this.subtotal});
  },

  calcularSubtotal: function() {
    this.cart.forEach(function(element){
      contexto.subtotal = element.price * element.cant;
    });
  },
  
};

