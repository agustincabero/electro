var VistaCart = function(modelo, controlador) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.cantidad = 0;
  var contexto = this;

  //suscripcion a eventos del modelo
  this.modelo.carritoLlenado.suscribir(function(modelo, carroObj) {
    contexto.actualizarCarro(carroObj);
  });

};

VistaCart.prototype = {
  inicializar: function() {
    this.controlador.loadCart();
  },

  actualizarCarro: function(carroObj) { 
    $('.newItem').remove();   
    var carro = carroObj.cart;
    var subtotal = carroObj.subtotal;
    var total = carroObj.total;
    var $subTotal = $('.cart-summary');
    $subTotal.find('h5').html('Subtotal: $' + subtotal); 
    var $total = $('#cart-qty');
    $total.html(total);
    
    carro.forEach(function(el){
      var $template = $('#template');
      var $clone = $template.clone();
      var id = el.id
      $clone.removeClass('hide');
      $clone.addClass('newItem');
      $clone.attr('id', id);
      $clone.find('img').attr('src', el.img);
      $clone.find('a').html(el.name);
      $clone.find('h4').html(`<span class="qty">${el.cant}x</span>$${el.price}`);
      $clone.find('button.delete').click(function() {
        controlador.deleteToCart(id);
        });     
      $clone.insertBefore($template);           
    });
  },
};

