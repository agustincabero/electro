/*
 * Modelo
 */
var Modelo = function() {
  this.whishList = [];
  this.cart = [];
  this.subtotal = 0;
  this.total = 0;
  this.token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1Yjk4NTcwMzkxMzNhZDQ5ZmZkYTFhZTMiLCJlbWFpbCI6ImFndXN0aW5AbGF0ZXJhbHZpZXcubmV0IiwiaWF0IjoxNTM3MjI4MjAyLCJleHAiOjE1MzczMTQ2MDJ9.5cgqaW5J0mjo1C3AV3qJDu-g9_yWcWwLMJ5DEFGiDYY";
  
  //inicializacion de eventos
  this.itemAgregadoAWhishList = new Evento(this);
  this.itemEliminadoDeWhishList = new Evento(this);
  this.wishListReady = new Evento(this);
  this.carritoLlenado = new Evento(this);
  this.userLogged = new Evento(this);
  this.productsReady = new Evento(this);
};

Modelo.prototype = {
  
  loadProducts: function() {
    var contexto = this;
    $.ajax({
      method: "GET",
      url: "http://ecommerce.casu-net.com.ar/api/products",
    })
    .done(function( body ) {
      var response = body;    
      contexto.productsReady.notificar(response);
    });
  },

  addToWishlist: function(productID) {
    var contexto = this;
    $.ajax({
      method: "POST",
      url: "http://ecommerce.casu-net.com.ar/api/wishlist",
      headers: { "x-access-token": contexto.token },
      data: {
        productId: productID,
      }
    })
    .done(function( body ) {
      contexto.itemAgregadoAWhishList.notificar(productID);
    });
  },

  removeFromWishlist: function(productID){
    var contexto = this;
    $.ajax({
      method: "POST",
      url: "http://ecommerce.casu-net.com.ar/api/wishlist/"+productID,
      headers: { "x-access-token": contexto.token },
      data: {
        productId: productID,
      }
    })
    .done(function( body ) {
      console.log(body);
      contexto.itemEliminadoDeWhishList.notificar(productID);
    });
  },

  //se guardan en el local storage
  guardar: function(dest, element){
    localStorage.setItem(dest, JSON.stringify(element));
  },

  getWishList: function() {
    var contexto = this;
    $.ajax({
      method: "GET",
      url: "http://ecommerce.casu-net.com.ar/api/wishlist",
      headers: { "x-access-token": contexto.token }
    })
    .done(function( body ) {
      var response = body;
      response.forEach(function(el){
        contexto.whishList.push(el._id)           
      });
      return contexto.whishList;
    });
  },

  cargarWishList: function(){
    var contexto = this;
    $.ajax({
      method: "GET",
      url: "http://ecommerce.casu-net.com.ar/api/wishlist",
      headers: { "x-access-token": contexto.token }
    })
    .done(function( body ) {
      var response = body;
      response.forEach(function(el){
        contexto.whishList.push(el._id)           
      });
      contexto.wishListReady.notificar(contexto.whishList);
    });
  },

  cargarCart: function(){
    var listaCarro = localStorage.getItem("miCarrito");
    if(listaCarro){
      this.cart = JSON.parse(listaCarro);
    };
    this.calcularSubtotal();
    this.calcularTotal();
    this.carritoLlenado.notificar({cart: this.cart, subtotal: this.subtotal, total: this.total});
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
    this.calcularTotal();
    //this.subtotal = subtotal;
    this.guardar("miCarrito",this.cart);
    this.carritoLlenado.notificar({cart: this.cart, subtotal: this.subtotal, total: this.total})
    
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
    this.calcularTotal();
    this.guardar("miCarrito",this.cart);   
    this.carritoLlenado.notificar({cart: this.cart, subtotal: this.subtotal, total: this.total});
  },

  calcularSubtotal: function() {
    var contexto = this;
    this.subtotal = 0;
    this.cart.forEach(function(element){
      contexto.subtotal += element.price * element.cant;
    });
  },
  
  calcularTotal: function() {
    var contexto = this;
    this.total = 0;
    this.cart.forEach(function(element){
      contexto.total += element.cant;
    });
  },

  logIn: function(user, pass) {
    var contexto = this;
    $.ajax({
      method: "POST",
      url: "http://ecommerce.casu-net.com.ar/api/users/authenticate",
      data: { email: user, password: pass }
    })
    .done(function( body ) {
      var response = body;
      contexto.token = response.token;
      contexto.guardar('token', contexto.token);
      contexto.userLogged.notificar(response.user.firstname);
    })
    .error(function( body ){
      var response = body;
      contexto.userLogged.notificar(response.status);
    });
  }

};
