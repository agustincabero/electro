var VistaLogIn = function(modelo, controlador) {
  this.modelo = modelo;
  this.controlador = controlador;
  var contexto = this;

  //suscripción de observadores
  this.modelo.userLogged.suscribir(function(modelo, username) {
    contexto.actualizarVistaLogIn(username);
  });
};

VistaLogIn.prototype = {
  inicializar: function() {    
    this.configuracionDeBotones();    
  },

  configuracionDeBotones: function(){
    var contexto = this;
    $("#loginBtn").click(function() {
      var user = $("#user").val();
      var pass = $("#pass").val();
      contexto.controlador.logIn(user, pass);
      $("#login").addClass("hide");
    });
  },

  actualizarVistaLogIn: function(username) {
    if(username === 401){
      alert("El usuario o contraseña incorrectos.");
      $("#user").val("");
      $("#pass").val("");      
      $("#login").removeClass("hide");
    } else {
        var $user = $(`<div><h2 style="color:white;">Bienvenido ${username}</h2></div>`);
        $user.insertBefore($("#login"));
      };
  }
};
