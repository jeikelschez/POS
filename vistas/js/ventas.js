/*=============================================
VARIABLE LOCAL STORAGE
=============================================*/
if(localStorage.getItem("capturarRango")!=null){

  	$("#daterange-btn span").html(localStorage.getItem("capturarRango"));

}else{

  	$("#daterange-btn span").html('<i class="fa fa-calendar"></i> Rango de fecha');

}

/*=============================================
CARGAR LA TABLA DINÁMICA DE PRODUCTOS
=============================================*/
$('.tablaVentaProductos').DataTable( {
    "ajax": "ajax/datatable-ventas-productos.ajax.php",
    "deferRender": true,
	"retrieve": true,
	"processing": true,
	 "language": {

		"sProcessing":     "Procesando...",
		"sLengthMenu":     "Mostrar _MENU_ registros",
		"sZeroRecords":    "No se encontraron resultados",
		"sEmptyTable":     "Ningún dato disponible en esta tabla",
		"sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
		"sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0",
		"sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
		"sInfoPostFix":    "",
		"sSearch":         "Buscar:",
		"sUrl":            "",
		"sInfoThousands":  ",",
		"sLoadingRecords": "Cargando...",
		"oPaginate": {
		"sFirst":    "Primero",
		"sLast":     "Último",
		"sNext":     "Siguiente",
		"sPrevious": "Anterior"
		},
		"oAria": {
			"sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
			"sSortDescending": ": Activar para ordenar la columna de manera descendente"
		}

	}

});

/*=============================================
CARGAR LA TABLA DINÁMICA DE VESTIDOS
=============================================*/
$('.tablaVentaVestidos').DataTable( {
    "ajax": "ajax/datatable-ventas-vestidos.ajax.php",
    "deferRender": true,
	"retrieve": true,
	"processing": true,
	 "language": {

		"sProcessing":     "Procesando...",
		"sLengthMenu":     "Mostrar _MENU_ registros",
		"sZeroRecords":    "No se encontraron resultados",
		"sEmptyTable":     "Ningún dato disponible en esta tabla",
		"sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
		"sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0",
		"sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
		"sInfoPostFix":    "",
		"sSearch":         "Buscar:",
		"sUrl":            "",
		"sInfoThousands":  ",",
		"sLoadingRecords": "Cargando...",
		"oPaginate": {
		"sFirst":    "Primero",
		"sLast":     "Último",
		"sNext":     "Siguiente",
		"sPrevious": "Anterior"
		},
		"oAria": {
			"sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
			"sSortDescending": ": Activar para ordenar la columna de manera descendente"
		}

	}

});

/*=============================================
AGREGANDO PRODUCTOS TIPO VENTA A LA VENTA DESDE LA TABLA
=============================================*/
$(".tablaVentaProductos tbody").on("click", "button.agregarProducto", function(){

	var idProducto = $(this).attr("idProducto");

	$(this).removeClass("btn-primary agregarProducto");

	$(this).addClass("btn-default");

	var datos = new FormData();
    datos.append("idProducto", idProducto);

     $.ajax({

     	url:"ajax/productos.ajax.php",
      	method: "POST",
      	data: datos,
      	cache: false,
      	contentType: false,
      	processData: false,
      	dataType:"json",
      	success:function(respuesta){

      		var codigo_absi = respuesta["codigo_absi"];
      	    var descripcion = respuesta["nombre"];
          	var stock = respuesta["stock"];
          	var precio = respuesta["precio_venta"];          	

          	$(".nuevoProducto").append(          		
	          	'<div class="row" style="padding:5px 15px">'+
				  	'<!-- Descripción del producto -->'+
		          	'<div class="col-xs-8" style="padding-right:0px">'+
		            	'<div class="input-group">'+
		              		'<span class="input-group-addon"><button type="button" class="btn btn-danger btn-xs quitarProductoV" idProducto="'+idProducto+'"><i class="fa fa-times"></i></button></span>'+
		              		'<span class="input-group-addon"><button type="button" class="btn btn-primary btn-xs" idProducto="'+idProducto+'"><i class="fa fa-cart-plus"></i></button></span>'+
		              		'<input type="text" class="form-control nuevoCodigoProductoV" idProducto="'+idProducto+'" name="nuevoCodigoProductoV" value="'+codigo_absi+'" readonly required>'+
		       				'<input type="text" class="form-control nuevaDescripcionProductoV" idProducto="'+idProducto+'" name="nuevaDescripcionProductoV" value="'+descripcion+'" readonly required>'+		            		
		            	'</div>'+
		          	'</div>'+
		          	'<!-- Cantidad y Precio del producto -->'+
		          	'<div class="col-xs-4">'+
		             	'<input type="number" class="form-control nuevaCantidadProductoV" name="nuevaCantidadProductoV" min="1" value="1" stock="'+stock+'" nuevoStock="'+Number(stock-1)+'" required>'+
		             	'<div class="input-group ingresoPrecio">'+
		              		'<span class="input-group-addon"><i class="ion ion-social-usd"></i></span>'+
		              		'<input type="text" class="form-control nuevoPrecioProductoV" precioReal="'+precio+'" name="nuevoPrecioProductoV" value="'+precio+'" style="text-align:right;" readonly required>'+
		            	'</div>'+
		          	'</div>'+
		        '</div>'
		    );

	        listarProductosVenta();

	        // PONER FORMATO AL PRECIO DE LOS PRODUCTOS

	        $(".nuevoPrecioProductoV").number(true, 2);

      	}

     })

});

/*=============================================
AGREGANDO PRODUCTOS VENTA DESDE EL BOTÓN PARA DISPOSITIVOS
=============================================*/
var numProducto = 0;

$(".btnAgregarProducto").click(function(){

	$(this).attr("disabled", true);

	numProducto ++;

	var datos = new FormData();
	datos.append("traerProductos", "ok");

	$.ajax({

		url:"ajax/productos.ajax.php",
      	method: "POST",
      	data: datos,
      	cache: false,
      	contentType: false,
      	processData: false,
      	dataType:"json",
      	success:function(respuesta){

      	    $(".nuevoProducto").append(
          		'<div class="row" style="padding:5px 15px">'+
			  		'<!-- Descripción del producto -->'+
	          		'<div class="col-xs-8" style="padding-right:0px">'+
	            		'<div class="input-group">'+
	            			'<span class="input-group-addon"><button type="button" class="btn btn-danger btn-xs quitarProductoV" name="quitarProductoV" idProducto><i class="fa fa-times"></i></button></span>'+
	            			'<span class="input-group-addon"><button type="button" class="btn btn-primary btn-xs" idProducto><i class="fa fa-cart-plus"></i></button></span>'+
	            			'<input type="text" class="form-control nuevoCodigoProductoV" idProducto name="nuevoCodigoProductoV" readonly required>'+
	              			'<select class="form-control nuevaDescripcionProductoV" id="producto'+numProducto+'" idProducto name="nuevaDescripcionProductoV" required>'+
	              				'<option>Seleccione el producto</option>'+
	              			'</select>'+
	            		'</div>'+
	          		'</div>'+
	          		'<!-- Cantidad y Precio del producto -->'+
	          		'<div class="col-xs-4">'+
	             		'<input type="number" class="form-control nuevaCantidadProductoV" name="nuevaCantidadProductoV" min="1" value="1" stock nuevoStock required>'+
	             		'<div class="input-group">'+
		              		'<span class="input-group-addon"><i class="ion ion-social-usd"></i></span>'+
		              		'<input type="text" class="form-control nuevoPrecioProductoV" precioReal="" name="nuevoPrecioProductoV" style="text-align:right;" readonly required>'+
		            	'</div>'+
	          		'</div>' +	          		
	        	'</div>'
	        );

	        // AGREGAR LOS PRODUCTOS AL SELECT

	        respuesta.forEach(funcionForEach);

	        function funcionForEach(item, index){

	         	if(item.stock != 0){

		         	$("#producto"+numProducto).append(

						'<option idProducto="'+item.id+'" value="'+item.id+'">'+item.nombre+'</option>'
		         	)

		        }

	        }	        

	        $(".nuevoPrecioProductoV").number(true, 2);

      	}

	})

})

/*=============================================
SELECCIONAR PRODUCTO VENTA DESDE EL BOTÓN PARA DISPOSITIVOS
=============================================*/
$(".formularioVenta").on("change", "select.nuevaDescripcionProductoV", function(){

	var idProducto = $(this).val();

	$(this).attr("disabled", true);
	$(".btnAgregarProducto").attr("disabled", false);

	$("button.recuperarBoton1[idProducto='"+idProducto+"']").addClass('btn-default');
	$("button.recuperarBoton1[idProducto='"+idProducto+"']").removeClass('btn-primary agregarProducto');

	var nuevaDescripcionProductoV = $(this).parent().parent().parent().children().children().children(".nuevaDescripcionProductoV");
	var quitarProductoV = $(this).parent().parent().parent().children().children().children().children(".quitarProductoV");
	var nuevoPrecioProductoV = $(this).parent().parent().parent().children().children().children(".nuevoPrecioProductoV");
	var nuevoCodigoProductoV = $(this).parent().parent().parent().children().children().children(".nuevoCodigoProductoV");
	var nuevaCantidadProductoV = $(this).parent().parent().parent().children().children(".nuevaCantidadProductoV");

	var datos = new FormData();
    datos.append("idProducto", idProducto);

	$.ajax({

     	url:"ajax/productos.ajax.php",
      	method: "POST",
      	data: datos,
      	cache: false,
      	contentType: false,
      	processData: false,
      	dataType:"json",
      	success:function(respuesta){

      		if($("#listaProductosVenta").val()!=""){

				var resproducto = JSON.parse($("#listaProductosVenta").val());

				for(var i = 0; i < resproducto.length; i++){

					if(resproducto[i]["id"]==respuesta["id"]){
						var repetido = true;
					}

				}

			}

			if(!repetido){

				$(nuevaDescripcionProductoV).attr("idProducto", respuesta["id"]);
				$(quitarProductoV).attr("idProducto", respuesta["id"]);
				$(nuevoCodigoProductoV).val(respuesta["codigo_absi"]);
	      	    $(nuevaCantidadProductoV).attr("stock", respuesta["stock"]);
	      	    $(nuevaCantidadProductoV).attr("nuevoStock", Number(respuesta["stock"])-1);
	      	    $(nuevoPrecioProductoV).val(respuesta["precio_venta"]);
	      	    $(nuevoPrecioProductoV).attr("precioReal", respuesta["precio_venta"]);

		        listarProductosVenta();

			}else{

				$(nuevaDescripcionProductoV).attr("disabled", false);
				$(".btnAgregarProducto").attr("disabled", true);

				swal({
			      	title: "Error",
			      	text: "Ya este Producto fue Agregado para Venta, escoja otro Producto de la lista",
			      	type: "error",
			      	confirmButtonText: "¡Cerrar!"
			    });

			}      	    

      	}

    })

})

/*=============================================
AGREGANDO PRODUCTOS TIPO ORDEN A LA VENTA DESDE LA TABLA
=============================================*/
$(".tablaVentaProductos tbody").on("click", "button.ordenarProducto", function(){

	var idProducto = $(this).attr("idProducto");

	$(this).removeClass("btn-success ordenarProducto");

	$(this).addClass("btn-default");

	var datos = new FormData();
    datos.append("idProducto", idProducto);

     $.ajax({

     	url:"ajax/productos.ajax.php",
      	method: "POST",
      	data: datos,
      	cache: false,
      	contentType: false,
      	processData: false,
      	dataType:"json",
      	success:function(respuesta){

      		var codigo_absi = respuesta["codigo_absi"];
      	    var descripcion = respuesta["nombre"];
          	var stock = respuesta["stock"];
          	var precio = respuesta["precio_venta"];          	

          	$(".nuevoProducto").append(          		
	          	'<div class="row" style="padding:5px 15px">'+
				  	'<!-- Descripción del producto -->'+
		          	'<div class="col-xs-8" style="padding-right:0px">'+
		            	'<div class="input-group">'+
		              		'<span class="input-group-addon"><button type="button" class="btn btn-danger btn-xs quitarProductoO" idProducto="'+idProducto+'"><i class="fa fa-times"></i></button></span>'+
		              		'<span class="input-group-addon"><button type="button" class="btn btn-success btn-xs" idProducto="'+idProducto+'"><i class="fa fa-shopping-basket"></i></button></span>'+
		              		'<input type="text" class="form-control nuevoCodigoProductoO" idProducto="'+idProducto+'" name="nuevoCodigoProductoO" value="'+codigo_absi+'" readonly required>'+
		       				'<input type="text" class="form-control nuevaDescripcionProductoO" idProducto="'+idProducto+'" name="nuevaDescripcionProductoO" value="'+descripcion+'" readonly required>'+		            		
		            	'</div>'+
		          	'</div>'+
		          	'<!-- Cantidad y Precio del producto -->'+
		          	'<div class="col-xs-4">'+
		             	'<input type="number" class="form-control nuevaCantidadProductoO" name="nuevaCantidadProductoO" min="1" value="1" stock="'+stock+'" nuevoStock="'+Number(stock-1)+'" required>'+
		             	'<div class="input-group ingresoPrecio">'+
		              		'<span class="input-group-addon"><i class="ion ion-social-usd"></i></span>'+
		              		'<input type="text" class="form-control nuevoPrecioProductoO" precioReal="'+precio+'" name="nuevoPrecioProductoO" value="'+precio+'" style="text-align:right;" readonly required>'+
		            	'</div>'+
		          	'</div>'+
		        '</div>'
		    );

	        listarProductosOrden();

	        // PONER FORMATO AL PRECIO DE LOS PRODUCTOS

	        $(".nuevoPrecioProductoO").number(true, 2);

      	}

    })

});

/*=============================================
AGREGANDO PRODUCTOS ORDEN DESDE EL BOTÓN PARA DISPOSITIVOS
=============================================*/
var numProducto = 0;

$(".btnOrdenarProducto").click(function(){

	$(this).attr("disabled", true);

	numProducto ++;

	var datos = new FormData();
	datos.append("traerProductos", "ok");

	$.ajax({

		url:"ajax/productos.ajax.php",
      	method: "POST",
      	data: datos,
      	cache: false,
      	contentType: false,
      	processData: false,
      	dataType:"json",
      	success:function(respuesta){

      	    $(".nuevoProducto").append(
          		'<div class="row" style="padding:5px 15px">'+
			  		'<!-- Descripción del producto -->'+
	          		'<div class="col-xs-8" style="padding-right:0px">'+
	            		'<div class="input-group">'+
	            			'<span class="input-group-addon"><button type="button" class="btn btn-danger btn-xs quitarProductoO" name="quitarProductoO" idProducto><i class="fa fa-times"></i></button></span>'+
	            			'<span class="input-group-addon"><button type="button" class="btn btn-success btn-xs" idProducto><i class="fa fa-shopping-basket"></i></button></span>'+
	            			'<input type="text" class="form-control nuevoCodigoProductoO" idProducto name="nuevoCodigoProductoO" readonly required>'+
	              			'<select class="form-control nuevaDescripcionProductoO" id="producto'+numProducto+'" idProducto name="nuevaDescripcionProductoO" required>'+
	              				'<option>Seleccione el producto</option>'+
	              			'</select>'+
	            		'</div>'+
	          		'</div>'+
	          		'<!-- Cantidad y Precio del producto -->'+
	          		'<div class="col-xs-4">'+
	             		'<input type="number" class="form-control nuevaCantidadProductoO" name="nuevaCantidadProductoO" min="1" value="1" stock nuevoStock required>'+
	             		'<div class="input-group">'+
		              		'<span class="input-group-addon"><i class="ion ion-social-usd"></i></span>'+
		              		'<input type="text" class="form-control nuevoPrecioProductoO" precioReal="" name="nuevoPrecioProductoO" style="text-align:right;" readonly required>'+
		            	'</div>'+
	          		'</div>' +	          		
	        	'</div>'
	        );

	        // AGREGAR LOS PRODUCTOS AL SELECT

	        respuesta.forEach(funcionForEach);

	        function funcionForEach(item, index){

	         	if(item.precio_compra != 0){

		         	$("#producto"+numProducto).append(

						'<option idProducto="'+item.id+'" value="'+item.id+'">'+item.nombre+'</option>'
		         	)

		        }

	        }	        

	        $(".nuevoPrecioProductoO").number(true, 2);

      	}

	})

})

/*=============================================
SELECCIONAR PRODUCTO ORDEN DESDE EL BOTÓN PARA DISPOSITIVOS
=============================================*/
$(".formularioVenta").on("change", "select.nuevaDescripcionProductoO", function(){

	var idProducto = $(this).val();

	$(this).attr("disabled", true);
	$(".btnOrdenarProducto").attr("disabled", false);

	$("button.recuperarBoton2[idProducto='"+idProducto+"']").addClass('btn-default');
	$("button.recuperarBoton2[idProducto='"+idProducto+"']").removeClass('btn-success ordenarProducto');

	var nuevaDescripcionProductoO = $(this).parent().parent().parent().children().children().children(".nuevaDescripcionProductoO");
	var quitarProductoO = $(this).parent().parent().parent().children().children().children().children(".quitarProductoO");
	var nuevoPrecioProductoO = $(this).parent().parent().parent().children().children().children(".nuevoPrecioProductoO");
	var nuevoCodigoProductoO = $(this).parent().parent().parent().children().children().children(".nuevoCodigoProductoO");
	var nuevaCantidadProductoO = $(this).parent().parent().parent().children().children(".nuevaCantidadProductoO");

	var datos = new FormData();
    datos.append("idProducto", idProducto);

	$.ajax({

     	url:"ajax/productos.ajax.php",
      	method: "POST",
      	data: datos,
      	cache: false,
      	contentType: false,
      	processData: false,
      	dataType:"json",
      	success:function(respuesta){

      		if($("#listaProductosOrden").val()!=""){

				var resproducto = JSON.parse($("#listaProductosOrden").val());

				for(var i = 0; i < resproducto.length; i++){

					if(resproducto[i]["id"]==respuesta["id"]){
						var repetido = true;
					}

				}

			}

			if(!repetido){

				$(nuevaDescripcionProductoO).attr("idProducto", respuesta["id"]);
				$(quitarProductoO).attr("idProducto", respuesta["id"]);
				$(nuevoCodigoProductoO).val(respuesta["codigo_absi"]);
	      	    $(nuevaCantidadProductoO).attr("stock", respuesta["stock"]);
	      	    $(nuevaCantidadProductoO).attr("nuevoStock", Number(respuesta["stock"])-1);
	      	    $(nuevoPrecioProductoO).val(respuesta["precio_venta"]);
	      	    $(nuevoPrecioProductoO).attr("precioReal", respuesta["precio_venta"]);

		        listarProductosOrden();

			}else{

				$(nuevaDescripcionProductoO).attr("disabled", false);
				$(".btnOrdenarProducto").attr("disabled", true);

				swal({
			      	title: "Error",
			      	text: "Ya este Producto fue Agregado para Orden, escoja otro Producto de la lista",
			      	type: "error",
			      	confirmButtonText: "¡Cerrar!"
			    });

			}      	    

      	}

    })

})

/*=============================================
QUITAR PRODUCTOS VENTA Y RECUPERAR BOTÓN
=============================================*/
var idQuitarProductoV = [];

localStorage.removeItem("quitarProductoV");

$(".formularioVenta").on("click", "button.quitarProductoV", function(){	

	var idProducto = $(this).attr("idProducto");
	var idTipo = $(this).attr("idTipo");	

	$(".btnAgregarProducto").attr("disabled", false);
	$("button.recuperarBoton1[idProducto='"+idProducto+"']").removeClass('btn-default');
	$("button.recuperarBoton1[idProducto='"+idProducto+"']").addClass('btn-primary agregarProducto');

	$(this).parent().parent().parent().parent().remove();

	/*=============================================
	ALMACENAR EN EL LOCALSTORAGE EL ID DEL PRODUCTO A QUITAR
	=============================================*/
	if(localStorage.getItem("quitarProductoV") == null){

		idQuitarProductoV = [];

	}else{

		idQuitarProductoV.concat(localStorage.getItem("quitarProductoV"))

	}

	idQuitarProductoV.push({"idProducto":idProducto});

	localStorage.setItem("quitarProductoV", JSON.stringify(idQuitarProductoV));

	listarProductosVenta();

})

/*=============================================
QUITAR PRODUCTOS ORDEN Y RECUPERAR BOTÓN
=============================================*/
var idQuitarProductoO = [];

localStorage.removeItem("quitarProductoO");

$(".formularioVenta").on("click", "button.quitarProductoO", function(){	

	var idProducto = $(this).attr("idProducto");
	var idTipo = $(this).attr("idTipo");	

	$(".btnOrdenarProducto").attr("disabled", false);
	$("button.recuperarBoton2[idProducto='"+idProducto+"']").removeClass('btn-default');
	$("button.recuperarBoton2[idProducto='"+idProducto+"']").addClass('btn-success ordenarProducto');

	$(this).parent().parent().parent().parent().remove();

	/*=============================================
	ALMACENAR EN EL LOCALSTORAGE EL ID DEL PRODUCTO A QUITAR
	=============================================*/
	if(localStorage.getItem("quitarProductoO") == null){

		idQuitarProductoO = [];

	}else{

		idQuitarProductoO.concat(localStorage.getItem("quitarProductoO"))

	}

	idQuitarProductoO.push({"idProducto":idProducto});

	localStorage.setItem("quitarProductoO", JSON.stringify(idQuitarProductoO));

	listarProductosOden();

})

/*=============================================
AGREGANDO VESTIDOS TIPO VENTA A LA VENTA DESDE LA TABLA
=============================================*/
var valAjuste = 0;

$(".tablaVentaVestidos tbody").on("click", "button.agregarVestido", function(){

	valAjuste ++;

	$(this).removeClass("btn-primary agregarVestido");
	$(this).addClass("btn-default");

	var idVestido = $(this).attr("idVestido");	

	var datos = new FormData();
    datos.append("infoVestido", idVestido);

     $.ajax({

     	url:"ajax/vestidos.ajax.php",
      	method: "POST",
      	data: datos,
      	cache: false,
      	contentType: false,
      	processData: false,
      	dataType:"json",
      	success:function(respuesta){

      		var producto = respuesta["nombre"];
      		var codigo_absi = respuesta["codigo_absi"];
      	    var etiqueta = respuesta["etiqueta"];
      	    var color = respuesta["color"];      	    
      	    var talla = respuesta["talla"]; 
          	var precio = respuesta["precio_venta"];          	

          	$(".nuevoVestido").append(
	          	'<div class="row" style="padding:5px 15px">'+
				  	'<!-- Descripción del vestido y precio -->'+
		          	'<div class="col-xs-6" style="padding-right:0px">'+
		            	'<div class="input-group">'+
		            		'<span class="input-group-addon"><button type="button" class="btn btn-danger btn-xs quitarVestidoV" idVestido="'+idVestido+'"><i class="fa fa-times"></i></button></span>'+
		              		'<span class="input-group-addon"><button type="button" class="btn btn-primary btn-xs" idVestido="'+idVestido+'"><i class="fa fa-cart-plus"></i></button></span>'+		              		
		              		'<input type="text" class="form-control nuevoCodigoVestidoV" idVestido="'+idVestido+'" name="nuevoCodigoVestidoV" value="'+codigo_absi+' ('+etiqueta+')" readonly required>'+
		              		'<input type="hidden" class="form-control nuevoidAjuste" name="nuevoidAjuste" valAjuste='+valAjuste+' idVestido="'+idVestido+'" tipo="1" readonly required>'+
		              		'<input type="text" class="form-control nuevoProductoVestidoV" idVestido="'+idVestido+'" name="nuevoProductoVestidoV" value="'+producto+'" readonly required>'+	       
		            	'</div>'+
		          	'</div>'+
		          	'<!-- Color y Talla-->'+
		          	'<div class="col-xs-4 style="padding-left:0px;">'+
		            	'<div class="input-group">'+
		              		'<input type="text" class="form-control nuevoColorTallaV" name="nuevoColorTallaV" value="'+color+' ('+talla+')" readonly required>'+
		              		'<div class="input-group">'+
			              		'<span class="input-group-addon"><i class="ion ion-social-usd"></i></span>'+
			              		'<input type="text" class="form-control nuevoPrecioVestidoV" precioReal="'+precio+'" name="nuevoPrecioVestidoV" value="'+precio+'" style="text-align:right;" readonly required>'+
			            	'</div>'+
		            	'</div>'+
		          	'</div>'+
		          	'<!-- Cantidad y Ajustes -->'+
		          	'<div class="col-xs-2" style="padding-left:0px">'+
		            	'<div class="input-group">'+		              		
		              		'<input type="number" class="form-control nuevaCantidadVestidoV" name="nuevaCantidadVestidoV" value="1" readonly required>'+
		            	'</div>'+
		            	'<div class="input-group">'+
		            		'<span class="input-group-addon"><button class="btn btn-primary btn-xs agregarAjustes" idVestido="'+idVestido+'"><i class="fa fa-clipboard"></i></button></span>'+
		            	'</div>'+
		          	'</div>'+
		        '</div>'+
		        '<div class="row nuevoAjuste" id="listaAjuste'+valAjuste+'" idVestido="" style="padding:5px 15px">'+
		        '</div>'
		    );

	        listarVestidosVenta();

	        // PONER FORMATO AL PRECIO DE LOS PRODUCTOS

	        $(".nuevoPrecioVestidoV").number(true, 2);

      	}

     })

});

/*=============================================
AGREGANDO VESTIDOS VENTA DESDE EL BOTÓN PARA DISPOSITIVOS
=============================================*/
var numVestido = 0;
var valAjuste = 0;

$(".btnAgregarVestidoVenta").click(function(){

	$(this).attr("disabled", true);	

	numVestido ++;
	valAjuste ++;

	var datos = new FormData();
	datos.append("traerVestidos", "ok");

	$.ajax({

		url:"ajax/vestidos.ajax.php",
      	method: "POST",
      	data: datos,
      	cache: false,
      	contentType: false,
      	processData: false,
      	dataType:"json",
      	success:function(respuesta){

      	    $(".nuevoVestido").append(
	          	'<div class="row" style="padding:5px 15px">'+
				  	'<!-- Descripción del vestido y precio -->'+
		          	'<div class="col-xs-6" style="padding-right:0px">'+
		            	'<div class="input-group">'+
		            		'<span class="input-group-addon"><button type="button" class="btn btn-danger btn-xs quitarVestidoV" idVestido><i class="fa fa-times"></i></button></span>'+
		              		'<span class="input-group-addon"><button type="button" class="btn btn-primary btn-xs" idVestido><i class="fa fa-cart-plus"></i></button></span>'+		              		
		              		'<input type="text" class="form-control nuevoCodigoVestidoV" idVestido name="nuevoCodigoVestidoV" readonly required>'+
		              		'<input type="hidden" class="form-control nuevonombreVestidoV" idVestido name="nuevonombreVestidoV" readonly required>'+
		              		'<input type="hidden" class="form-control nuevoidAjuste" name="nuevoidAjuste" valAjuste='+valAjuste+' idVestido tipo="1" readonly required>'+
		              		'<select class="form-control nuevoProductoVestidoV" id="vestido'+numVestido+'" idVestido name="nuevoProductoVestidoV" required>'+
	              				'<option>Seleccione el producto</option>'+
	              			'</select>'+
		            	'</div>'+
		          	'</div>'+
		          	'<!-- Color y Talla-->'+
		          	'<div class="col-xs-4 style="padding-left:0px;">'+
		            	'<div class="input-group">'+
		              		'<input type="text" class="form-control nuevoColorTallaV" name="nuevoColorTallaV" readonly required>'+
		              		'<div class="input-group">'+
			              		'<span class="input-group-addon"><i class="ion ion-social-usd"></i></span>'+
			              		'<input type="text" class="form-control nuevoPrecioVestidoV" precioReal name="nuevoPrecioVestidoV" style="text-align:right;" readonly required>'+
			            	'</div>'+
		            	'</div>'+
		          	'</div>'+
		          	'<!-- Cantidad y Ajustes -->'+
		          	'<div class="col-xs-2" style="padding-left:0px">'+
		            	'<div class="input-group">'+		              		
		              		'<input type="number" class="form-control nuevaCantidadVestidoV" name="nuevaCantidadVestidoV" value="1" readonly required>'+
		            	'</div>'+
		            	'<div class="input-group">'+
		            		'<span class="input-group-addon"><button class="btn btn-primary btn-xs agregarAjustes" idVestido><i class="fa fa-clipboard"></i></button></span>'+
		            	'</div>'+
		          	'</div>'+
		        '</div>'+
		        '<div class="row nuevoAjuste" id="listaAjuste'+valAjuste+'" idVestido="" style="padding:5px 15px">'+
		        '</div>'
		    );

	        // AGREGAR LOS VESTIDOS AL SELECT

	        respuesta.forEach(funcionForEach);

	        function funcionForEach(item, index){

	         	if(item.estatus == 1){

		         	$("#vestido"+numVestido).append(

						'<option idVestido="'+item.id+'" value="'+item.id+'">'+item.nombre+' ('+item.etiqueta+') Color: '+item.color+' - Talla: '+item.talla+'</option>'
		         	)

		        }

	        }	        

	        $(".nuevoPrecioVestidoV").number(true, 2);
	        $(".agregarAjustes").attr("disabled", true);

      	}

	})

})

/*=============================================
SELECCIONAR VESTIDOS VENTA DESDE EL BOTÓN PARA DISPOSITIVOS
=============================================*/
$(".formularioVenta").on("change", "select.nuevoProductoVestidoV", function(){

	var idVestido = $(this).val();

	$(this).attr("disabled", true);
	$(".agregarAjustes").attr("disabled", false);
	$(".btnAgregarVestidoVenta").attr("disabled", false);

	$("button.recuperarBoton3[idVestido='"+idVestido+"']").addClass('btn-default');
	$("button.recuperarBoton3[idVestido='"+idVestido+"']").removeClass('btn-primary agregarVestido');

	var nuevoProductoVestidoV = $(this).parent().parent().parent().children().children().children(".nuevoProductoVestidoV");
	var nuevonombreVestidoV = $(this).parent().parent().parent().children().children().children(".nuevonombreVestidoV");
	var quitarVestidoV = $(this).parent().parent().parent().children().children().children().children(".quitarVestidoV");
	var nuevoPrecioVestidoV = $(this).parent().parent().parent().children().children().children().children(".nuevoPrecioVestidoV");
	var nuevoCodigoVestidoV = $(this).parent().parent().parent().children().children().children(".nuevoCodigoVestidoV");
	var nuevaCantidadVestidoV = $(this).parent().parent().parent().children().children(".nuevaCantidadVestidoV");
	var nuevoColorTallaV = $(this).parent().parent().parent().children().children().children(".nuevoColorTallaV");	
	var nuevoidAjuste = $(this).parent().parent().parent().children().children().children(".nuevoidAjuste");

	var datos = new FormData();
    datos.append("infoVestido", idVestido);

	$.ajax({

     	url:"ajax/vestidos.ajax.php",
      	method: "POST",
      	data: datos,
      	cache: false,
      	contentType: false,
      	processData: false,
      	dataType:"json",
      	success:function(respuesta){

      		if($("#listaVestidosVenta").val()!=""){

				var resvestido = JSON.parse($("#listaVestidosVenta").val());

				for(var i = 0; i < resvestido.length; i++){

					if(resvestido[i]["id"]==respuesta["id"]){
						var repetido = true;
					}

				}

			}

			if(!repetido){

				$(nuevonombreVestidoV).val(respuesta["nombre"]);
				$(nuevonombreVestidoV).attr('type','text');
				$(nuevoProductoVestidoV).hide();
				$(nuevoProductoVestidoV).attr("idVestido", respuesta["id"]);
				$(quitarVestidoV).attr("idVestido", respuesta["id"]);
				$(nuevoCodigoVestidoV).val(respuesta["codigo_absi"]+' ('+respuesta["etiqueta"]+')');
	      	    $(nuevoPrecioVestidoV).val(respuesta["precio_venta"]);
	      	    $(nuevoPrecioVestidoV).attr("precioReal", respuesta["precio_venta"]);
	      	    $(nuevoColorTallaV).val(respuesta["color"]+' ('+respuesta["talla"]+')');
	      	    $(nuevoidAjuste).attr("idVestido", respuesta["id"]);

		        listarVestidosVenta();

			}else{

				$(nuevoProductoVestidoV).attr("disabled", false);
				$(".btnAgregarVestidoVenta").attr("disabled", true);

				swal({
			      	title: "Error",
			      	text: "Ya este Vestido fue Agregado para Venta, escoja otro Vestido de la lista",
			      	type: "error",
			      	confirmButtonText: "¡Cerrar!"
			    });

			}      	    

      	}

    })

})

/*=============================================
AGREGANDO VESTIDOS TIPO ORDEN A LA VENTA DESDE LA TABLA
=============================================*/
var valAjuste = 0;

$(".tablaVentaVestidos tbody").on("click", "button.ordenarVestido", function(){

	valAjuste ++;

	$(this).removeClass("btn-success ordenarVestido");
	$(this).addClass("btn-default");

	var idVestido = $(this).attr("idVestido");	

	var datos = new FormData();
    datos.append("infoVestido", idVestido);

     $.ajax({

     	url:"ajax/vestidos.ajax.php",
      	method: "POST",
      	data: datos,
      	cache: false,
      	contentType: false,
      	processData: false,
      	dataType:"json",
      	success:function(respuesta){

      	    var producto = respuesta["nombre"];
      	    var codigo_absi = respuesta["codigo_absi"];
      	    var etiqueta = respuesta["etiqueta"];
      	    var color = respuesta["color"];      	    
      	    var talla = respuesta["talla"]; 
          	var precio = respuesta["precio_venta"];          	

          	$(".nuevoVestido").append(
	          	'<div class="row" style="padding:5px 15px">'+
				  	'<!-- Descripción del vestido y precio -->'+
		          	'<div class="col-xs-6" style="padding-right:0px">'+
		            	'<div class="input-group">'+
		            		'<span class="input-group-addon"><button type="button" class="btn btn-danger btn-xs quitarVestidoO" idVestido="'+idVestido+'"><i class="fa fa-times"></i></button></span>'+
		              		'<span class="input-group-addon"><button type="button" class="btn btn-success btn-xs" idVestido="'+idVestido+'"><i class="fa fa-shopping-basket"></i></button></span>'+
		              		'<input type="text" class="form-control nuevoCodigoVestidoO" idVestido="'+idVestido+'" name="nuevoCodigoVestidoO" value="'+codigo_absi+' ('+etiqueta+')" readonly required>'+
		              		'<input type="hidden" class="form-control nuevoidAjuste" name="nuevoidAjuste" valAjuste='+valAjuste+' idVestido="'+idVestido+'" tipo="2" readonly required>'+
		              		'<input type="text" class="form-control nuevoProductoVestidoO" idVestido="'+idVestido+'" name="nuevoProductoVestidoO" value="'+producto+'" readonly required>'+			              		
		            	'</div>'+
		          	'</div>'+
		          	'<!-- Color y Talla-->'+
		          	'<div class="col-xs-4 style="padding-left:0px;">'+
		            	'<div class="input-group">'+
		              		'<input type="text" class="form-control nuevoColorTallaO" name="nuevoColorTallaO" value="'+color+' ('+talla+')" readonly required>'+
		              		'<div class="input-group">'+
			              		'<span class="input-group-addon"><i class="ion ion-social-usd"></i></span>'+
			              		'<input type="text" class="form-control nuevoPrecioVestidoO" precioReal="'+precio+'" name="nuevoPrecioVestidoO" value="'+precio+'" style="text-align:right;" readonly required>'+
			            	'</div>'+
		            	'</div>'+
		          	'</div>'+
		          	'<!-- Cantidad y Ajustes -->'+
		          	'<div class="col-xs-2" style="padding-left:0px">'+
		            	'<div class="input-group">'+		              		
		              		'<input type="number" class="form-control nuevaCantidadVestidoO" name="nuevaCantidadVestidoO" value="1" required>'+
		            	'</div>'+
		            	'<div class="input-group">'+
		            		'<span class="input-group-addon"><button class="btn btn-primary btn-xs agregarAjustes" idVestido="'+idVestido+'"><i class="fa fa-clipboard"></i></button></span>'+
		            	'</div>'+
		          	'</div>'+
		        '</div>'+
		        '<div class="row nuevoAjuste" id="listaAjuste'+valAjuste+'" idVestido="" style="padding:5px 15px">'+
		        '</div>'
		    );

	        listarVestidosOrden();

	        // PONER FORMATO AL PRECIO DE LOS PRODUCTOS

	        $(".nuevoPrecioVestidoO").number(true, 2);

      	}

     })

});

/*=============================================
AGREGANDO VESTIDOS ORDEN DESDE EL BOTÓN PARA DISPOSITIVOS
=============================================*/
var numVestido = 0;
var valAjuste = 0;

$(".btnOrdenarVestidoVenta").click(function(){

	$(this).attr("disabled", true);

	numVestido ++;
	valAjuste ++;

	var datos = new FormData();
	datos.append("traerVestidos", "ok");

	$.ajax({

		url:"ajax/vestidos.ajax.php",
      	method: "POST",
      	data: datos,
      	cache: false,
      	contentType: false,
      	processData: false,
      	dataType:"json",
      	success:function(respuesta){

      	    $(".nuevoVestido").append(
	          	'<div class="row" style="padding:5px 15px">'+
				  	'<!-- Descripción del vestido y precio -->'+
		          	'<div class="col-xs-6" style="padding-right:0px">'+
		            	'<div class="input-group">'+
		            		'<span class="input-group-addon"><button type="button" class="btn btn-danger btn-xs quitarVestidoO" idVestido><i class="fa fa-times"></i></button></span>'+
		              		'<span class="input-group-addon"><button type="button" class="btn btn-success btn-xs" idVestido><i class="fa fa-shopping-basket"></i></button></span>'+		              		
		              		'<input type="text" class="form-control nuevoCodigoVestidoO" idVestido name="nuevoCodigoVestidoO" readonly required>'+
		              		'<input type="hidden" class="form-control nuevonombreVestidoO" idVestido name="nuevonombreVestidoO" readonly required>'+
		              		'<input type="hidden" class="form-control nuevoidAjuste" name="nuevoidAjuste" valAjuste='+valAjuste+' idVestido tipo="2" readonly required>'+
		              		'<select class="form-control nuevoProductoVestidoO" id="vestido'+numVestido+'" idVestido name="nuevoProductoVestidoO" required>'+
	              				'<option>Seleccione el producto</option>'+
	              			'</select>'+
		            	'</div>'+
		          	'</div>'+
		          	'<!-- Color y Talla-->'+
		          	'<div class="col-xs-4 style="padding-left:0px;">'+
		            	'<div class="input-group">'+
		              		'<input type="text" class="form-control nuevoColorTallaO" name="nuevoColorTallaO" readonly required>'+
		              		'<div class="input-group">'+
			              		'<span class="input-group-addon"><i class="ion ion-social-usd"></i></span>'+
			              		'<input type="text" class="form-control nuevoPrecioVestidoO" precioReal name="nuevoPrecioVestidoO" style="text-align:right;" readonly required>'+
			            	'</div>'+
		            	'</div>'+
		          	'</div>'+
		          	'<!-- Cantidad y Ajustes -->'+
		          	'<div class="col-xs-2" style="padding-left:0px">'+
		            	'<div class="input-group">'+		              		
		              		'<input type="number" class="form-control nuevaCantidadVestidoO" name="nuevaCantidadVestidoO" value="1" required>'+
		            	'</div>'+
		            	'<div class="input-group">'+
		            		'<span class="input-group-addon"><button class="btn btn-primary btn-xs agregarAjustes" idVestido><i class="fa fa-clipboard"></i></button></span>'+
		            	'</div>'+
		          	'</div>'+
		        '</div>'+
		        '<div class="row nuevoAjuste" id="listaAjuste'+valAjuste+'" idVestido="" style="padding:5px 15px">'+
		        '</div>'
		    );

	        // AGREGAR LOS VESTIDOS AL SELECT

	        respuesta.forEach(funcionForEach);

	        function funcionForEach(item, index){

	         	if(item.precio_compra > 0){

		         	$("#vestido"+numVestido).append(

						'<option idVestido="'+item.id+'" value="'+item.id+'">'+item.nombre+' ('+item.etiqueta+') Color: '+item.color+' - Talla: '+item.talla+'</option>'
		         	)

		        }

	        }	        

	        $(".nuevoPrecioVestidoO").number(true, 2);
	        $(".agregarAjustes").attr("disabled", true);

      	}

	})

})

/*=============================================
SELECCIONAR VESTIDOS ORDEN DESDE EL BOTÓN PARA DISPOSITIVOS
=============================================*/
$(".formularioVenta").on("change", "select.nuevoProductoVestidoO", function(){

	var idVestido = $(this).val();

	$(this).attr("disabled", true);
	$(".agregarAjustes").attr("disabled", false);
	$(".btnOrdenarVestidoVenta").attr("disabled", false);

	$("button.recuperarBoton4[idVestido='"+idVestido+"']").addClass('btn-default');
	$("button.recuperarBoton4[idVestido='"+idVestido+"']").removeClass('btn-success ordenarVestido');

	var nuevoProductoVestidoO = $(this).parent().parent().parent().children().children().children(".nuevoProductoVestidoO");
	var nuevonombreVestidoO = $(this).parent().parent().parent().children().children().children(".nuevonombreVestidoO");
	var quitarVestidoO = $(this).parent().parent().parent().children().children().children().children(".quitarVestidoO");
	var nuevoPrecioVestidoO = $(this).parent().parent().parent().children().children().children().children(".nuevoPrecioVestidoO");
	var nuevoCodigoVestidoO = $(this).parent().parent().parent().children().children().children(".nuevoCodigoVestidoO");
	var nuevaCantidadVestidoO = $(this).parent().parent().parent().children().children(".nuevaCantidadVestidoO");
	var nuevoColorTallaO = $(this).parent().parent().parent().children().children().children(".nuevoColorTallaO");	
	var nuevoidAjuste = $(this).parent().parent().parent().children().children().children(".nuevoidAjuste");

	var datos = new FormData();
    datos.append("infoVestido", idVestido);

	$.ajax({

     	url:"ajax/vestidos.ajax.php",
      	method: "POST",
      	data: datos,
      	cache: false,
      	contentType: false,
      	processData: false,
      	dataType:"json",
      	success:function(respuesta){

      		if($("#listaVestidosOrden").val()!=""){

				var resvestido = JSON.parse($("#listaVestidosOrden").val());

				for(var i = 0; i < resvestido.length; i++){

					if(resvestido[i]["id"]==respuesta["id"]){
						var repetido = true;
					}

				}

			}

			if(!repetido){

				$(nuevonombreVestidoO).val(respuesta["nombre"]);
				$(nuevonombreVestidoO).attr('type','text');
				$(nuevoProductoVestidoO).hide();
				$(nuevoProductoVestidoO).attr("idVestido", respuesta["id"]);
				$(quitarVestidoO).attr("idVestido", respuesta["id"]);
				$(nuevoCodigoVestidoO).val(respuesta["codigo_absi"]+' ('+respuesta["etiqueta"]+')');
	      	    $(nuevoPrecioVestidoO).val(respuesta["precio_venta"]);
	      	    $(nuevoPrecioVestidoO).attr("precioReal", respuesta["precio_venta"]);
	      	    $(nuevoColorTallaO).val(respuesta["color"]+' ('+respuesta["talla"]+')');
	      	    $(nuevoidAjuste).attr("idVestido", respuesta["id"]);

		        listarVestidosOrden();

			}else{

				$(nuevoProductoVestidoO).attr("disabled", false);
				$(".btnAgregarVestidoOrden").attr("disabled", true);

				swal({
			      	title: "Error",
			      	text: "Ya este Vestido fue Agregado para Orden, escoja otro Vestido de la lista",
			      	type: "error",
			      	confirmButtonText: "¡Cerrar!"
			    });

			}      	    

      	}

    })

})

/*=============================================
QUITAR VESTIDOS VENTA Y RECUPERAR BOTÓN
=============================================*/
var idQuitarVestidoV = [];

localStorage.removeItem("quitarVestidoV");

$(".formularioVenta").on("click", "button.quitarVestidoV", function(){

	var idVestido = $(this).attr("idVestido");
	var idTipo = $(this).attr("idTipo");	

	$(this).parent().parent().parent().parent().remove();	

	/*=============================================
	ALMACENAR EN EL LOCALSTORAGE EL ID DEL VESTIDO A QUITAR
	=============================================*/
	if(localStorage.getItem("quitarVestidoV") == null){

		idQuitarVestidoV = [];

	}else{

		idQuitarVestidoV.concat(localStorage.getItem("quitarVestidoV"))

	}

	idQuitarVestidoV.push({"idVestido":idVestido});

	localStorage.setItem("quitarVestidoV", JSON.stringify(idQuitarVestidoV));

	$(".btnAgregarVestidoVenta").attr("disabled", false)
	$("button.recuperarBoton3[idVestido='"+idVestido+"']").removeClass('btn-default');
	$("button.recuperarBoton3[idVestido='"+idVestido+"']").addClass('btn-primary agregarVestido');

	listarVestidosVenta();	

})

/*=============================================
QUITAR VESTIDOS ORDEN Y RECUPERAR BOTÓN
=============================================*/
var idQuitarVestidoO = [];

localStorage.removeItem("quitarVestidoO");

$(".formularioVenta").on("click", "button.quitarVestidoO", function(){

	var idVestido = $(this).attr("idVestido");
	var idTipo = $(this).attr("idTipo");	

	$(this).parent().parent().parent().parent().remove();	

	/*=============================================
	ALMACENAR EN EL LOCALSTORAGE EL ID DEL VESTIDO A QUITAR
	=============================================*/
	if(localStorage.getItem("quitarVestidoO") == null){

		idQuitarVestidoO = [];

	}else{

		idQuitarVestidoO.concat(localStorage.getItem("quitarVestidoO"))

	}

	idQuitarVestidoO.push({"idVestido":idVestido});

	localStorage.setItem("quitarVestidoO", JSON.stringify(idQuitarVestidoO));	

	$(".btnAgregarVestidoOrden").attr("disabled", false)
	$("button.recuperarBoton4[idVestido='"+idVestido+"']").removeClass('btn-default');
	$("button.recuperarBoton4[idVestido='"+idVestido+"']").addClass('btn-success ordenarVestido');

	listarVestidosOrden();

})

/*=============================================
AGREGANDO CARGOS EXTRAS DESDE EL BOTÓN 
=============================================*/
var numCargo = 0;

$(".btnAgregarCargos").click(function(){

	$(this).attr("disabled", true);

	numCargo ++;

	var datos = new FormData();
	datos.append("traerCargos", "ok");

	$.ajax({

		url:"ajax/cargos.ajax.php",
      	method: "POST",
      	data: datos,
      	cache: false,
      	contentType: false,
      	processData: false,
      	dataType:"json",
      	success:function(respuesta){

      	    $(".nuevoCargoExtra").append(
	          	'<div class="row" style="padding:5px 15px">'+
				  	'<!-- Descripción del Cargo -->'+
		          	'<div class="col-xs-8" style="padding-right:0px">'+
		            	'<div class="input-group">'+
		              		'<span class="input-group-addon"><button type="button" class="btn btn-danger btn-xs quitarCargo" idCargo><i class="fa fa-times"></i></button></span>'+
		              		'<select class="form-control nuevaDescripcionCargo" id="cargo'+numCargo+'" idCargo name="nuevoidCargo" required>'+
		              			'<option>Seleccione el Cargo Extra</option>'+
		              		'</select>'+
		              		'<textarea class="form-control nuevoTextoCargo" name="nuevoTextoCargo" placeholder="Ingresar Ajuste" rows="2"></textarea>'+
		            	'</div>'+
		          	'</div>'+
	          		'<!-- Precio del Cargo -->'+
	          		'<div class="col-xs-4" style="padding-left:0px">'+
	            		'<div class="input-group">'+
			              '<span class="input-group-addon"><i class="ion ion-social-usd"></i></span>'+
			              '<input type="text" class="form-control nuevoPrecioCargo" precioReal="" name="nuevoPrecioCargo" style="text-align:right;" readonly required>'+
	            		'</div>'+
	          		'</div>'+
		        '</div>'
		    );

	        // AGREGAR LOS CARGOS AL SELECT

	        respuesta.forEach(funcionForEach);

	        function funcionForEach(item, index){

	        	if(item.tipo == 1){

			       	$("#cargo"+numCargo).append(

						'<option idCargo="'+item.id+'" value="'+item.id+'">'+item.cargo+'</option>'

			       	)

			    }

	        }

	        $(".nuevoPrecioCargo").number(true, 2);

      	}

	})

})

/*=============================================
SELECCIONAR CARGOS 
=============================================*/
$(".formularioVenta").on("change", "select.nuevaDescripcionCargo", function(){	

	var idCargo = $(this).val();

	$(this).attr("disabled", true);
	$(".btnAgregarCargos").attr("disabled", false);

	var nuevaDescripcionCargo = $(this).parent().parent().parent().children().children().children(".nuevaDescripcionCargo");
	var nuevoPrecioCargo = $(this).parent().parent().parent().children().children().children(".nuevoPrecioCargo");

	var datos = new FormData();
    datos.append("idCargo", idCargo);

	$.ajax({

     	url:"ajax/cargos.ajax.php",
      	method: "POST",
      	data: datos,
      	cache: false,
      	contentType: false,
      	processData: false,
      	dataType:"json",
      	success:function(respuesta){

      		if($("#listaCargos").val()!=""){

				var rescargo = JSON.parse($("#listaCargos").val());

				for(var i = 0; i < rescargo.length; i++){

					if(rescargo[i]["id"]==respuesta["id"]){
						var repetido = true;
					}

				}

			}

			if(!repetido){

				$(nuevaDescripcionCargo).attr("idCargo", respuesta["id"]);
	      	    $(nuevoPrecioCargo).val(respuesta["costo"]);
	      	    $(nuevoPrecioCargo).attr("precioReal", respuesta["costo"]);	           

		        listarCargos();

			}else{

				$(nuevaDescripcionCargo).attr("disabled", false);
				$(".btnAgregarCargos").attr("disabled", true);

				swal({
			      	title: "Error",
			      	text: "Ya este Cargo fue Agregado, escoja otro Cargo de la lista",
			      	type: "error",
			      	confirmButtonText: "¡Cerrar!"
			    });

			}      	    

      	}

    })

})

/*=============================================
QUITAR CARGOS DE LA VENTA
=============================================*/
var idQuitarCargo = [];

localStorage.removeItem("quitarCargo");

$(".formularioVenta").on("click", "button.quitarCargo", function(){

	$(".btnAgregarCargos").attr("disabled", false);

	$(this).parent().parent().parent().parent().remove();

	var idCargo = $(this).attr("idCargo");

	/*=============================================
	ALMACENAR EN EL LOCALSTORAGE EL ID DEL PRODUCTO A QUITAR
	=============================================*/
	if(localStorage.getItem("quitarCargo") == null){

		idQuitarCargo = [];

	}else{

		idQuitarCargo.concat(localStorage.getItem("quitarCargo"))

	}

	idQuitarCargo.push({"idCargo":idCargo});

	localStorage.setItem("quitarCargo", JSON.stringify(idQuitarCargo));	

	listarCargos();

})

/*=============================================
CUANDO CAMBIA TEXTO AJUSTES CARGOS EXTRA
=============================================*/
$(".formularioVenta").on("change", "textarea.nuevoTextoCargo", function(){

	listarCargos();

})

/*=============================================
AGREGANDO AJUSTES VESTIDOS
=============================================*/
var numAjuste = 0;

$(".formularioVenta").on("click", "button.agregarAjustes", function(){

	numAjuste ++;

	$(this).attr("disabled", true);

	var nuevoidAjuste = $(this).parent().parent().parent().parent().children().children().children(".nuevoidAjuste");
	
	var valAjuste = $(nuevoidAjuste).attr("valAjuste");	
	var idVestido = $(nuevoidAjuste).attr("idVestido");	
	var tipo = $(nuevoidAjuste).attr("tipo");	

	var datos = new FormData();
	datos.append("traerCargos", "ok");

	$.ajax({

		url:"ajax/cargos.ajax.php",
      	method: "POST",
      	data: datos,
      	cache: false,
      	contentType: false,
      	processData: false,
      	dataType:"json",
      	success:function(respuesta){

      	    $("#listaAjuste"+valAjuste).append(

          	'<div class="row" style="padding:5px 60px">'+
			  	'<!-- Descripción del Ajuste -->'+
	          	'<div class="col-xs-7" style="padding-right:0px">'+
	            	'<div class="input-group">'+
	              		'<span class="input-group-addon"><button type="button" class="btn btn-danger btn-xs quitarAjuste" idAjuste><i class="fa fa-times"></i></button></span>'+
	              		'<select class="form-control nuevaDescripcionAjuste" id="ajuste'+numAjuste+'" idAjuste idVestido="'+idVestido+'" tipo="'+tipo+'" name="nuevaDescripcionAjuste" required>'+
	              			'<option>Seleccione el Ajuste</option>'+
	              		'</select>'+
	              		'<textarea class="form-control nuevoTextoAjuste" name="nuevoTextoAjuste" placeholder="Ingresar Ajuste" rows="2"></textarea>'+
	            	'</div>'+
	          	'</div>'+
          		'<!-- Precio del Ajuste -->'+
          		'<div class="col-xs-4" style="padding-left:0px">'+
            		'<div class="input-group">'+
		              '<span class="input-group-addon"><i class="ion ion-social-usd"></i></span>'+
		              '<input type="text" class="form-control nuevoPrecioAjuste" precioReal="" name="nuevoPrecioAjuste" style="text-align:right;" readonly required>'+
            		'</div>'+
          		'</div>'+
	        '</div>'
	        );

	        // AGREGAR LOS AJUSTES AL SELECT

	        respuesta.forEach(funcionForEach);

	        function funcionForEach(item, index){

	        	if(item.tipo == 2){

			       	$("#ajuste"+numAjuste).append(

						'<option idAjuste="'+item.id+'" value="'+item.id+'">'+item.cargo+'</option>'

			       	)

			    }

	        }

	        $(".nuevoPrecioAjuste").number(true, 2);

      	}

	})

})

/*=============================================
SELECCIONAR AJUSTES 
=============================================*/
$(".formularioVenta").on("change", "select.nuevaDescripcionAjuste", function(){	

	var idAjuste = $(this).val();
	var idVestido = $(this).attr("idVestido");	
	var tipo = $(this).attr("tipo");

	$(this).attr("disabled", true);
	$(".agregarAjustes").attr("disabled", false);

	var nuevaDescripcionAjuste = $(this).parent().parent().parent().children().children().children(".nuevaDescripcionAjuste");

	var nuevoPrecioAjuste = $(this).parent().parent().parent().children().children().children(".nuevoPrecioAjuste");

	var datos = new FormData();
    datos.append("idCargo", idAjuste);

	$.ajax({

     	url:"ajax/cargos.ajax.php",
      	method: "POST",
      	data: datos,
      	cache: false,
      	contentType: false,
      	processData: false,
      	dataType:"json",
      	success:function(respuesta){

      		if($("#listaAjustes").val()!=""){

				var resajuste = JSON.parse($("#listaAjustes").val());

				for(var i = 0; i < resajuste.length; i++){

					if(resajuste[i]["vestido"]==idVestido && 
					   resajuste[i]["tipo"]==tipo &&
					   resajuste[i]["id"]==respuesta["id"]){

						var repetido = true;
					}

				}

			}

			if(!repetido){

				$(nuevaDescripcionAjuste).attr("idAjuste", respuesta["id"]);
	      	    $(nuevoPrecioAjuste).val(respuesta["costo"]);
	      	    $(nuevoPrecioAjuste).attr("precioReal", respuesta["costo"]);	           

		        listarAjustes();

			}else{

				$(nuevaDescripcionAjuste).attr("disabled", false);
				$(".agregarAjustes").attr("disabled", true);

				swal({
			      	title: "Error",
			      	text: "Ya este Ajuste fue Agregado a este Vestido, escoja otro Ajuste de la lista",
			      	type: "error",
			      	confirmButtonText: "¡Cerrar!"
			    });

			}    	    

      	}

    })

})

/*=============================================
QUITAR AJUSTES DE LA VENTA
=============================================*/
var numAjuste = 0;
var idQuitarAjuste = [];

localStorage.removeItem("quitarAjuste");

$(".formularioVenta").on("click", "button.quitarAjuste", function(){

	numAjuste --;

	$(".agregarAjustes").attr("disabled", false);

	$(this).parent().parent().parent().parent().remove();

	var idAjuste = $(this).attr("idAjuste");

	/*=============================================
	ALMACENAR EN EL LOCALSTORAGE EL ID DEL AJUSTE A QUITAR
	=============================================*/
	if(localStorage.getItem("quitarAjuste") == null){

		idQuitarAjuste = [];

	}else{

		idQuitarAjuste.concat(localStorage.getItem("quitarAjuste"))

	}

	idQuitarAjuste.push({"idAjuste":idAjuste});

	localStorage.setItem("quitarCargo", JSON.stringify(idQuitarAjuste));	

	listarAjustes();

})

/*=============================================
CUANDO CAMBIA TEXTO AJUSTES AJUSTES
=============================================*/
$(".formularioVenta").on("change", "textarea.nuevoTextoAjuste", function(){

	listarAjustes();

})

/*=============================================
MODIFICAR LA CANTIDAD PRODUCTOS VENTA
=============================================*/
$(".formularioVenta").on("change", "input.nuevaCantidadProductoV", function(){

	var precio = $(this).parent().parent().children().children().children(".nuevoPrecioProductoV");

	var precioFinal = $(this).val() * precio.attr("precioReal");

	precio.val(precioFinal);

	var nuevoStock = Number($(this).attr("stock")) - $(this).val();

	$(this).attr("nuevoStock", nuevoStock);

	if(Number($(this).val()) > Number($(this).attr("stock"))){

		/*=============================================
		SI LA CANTIDAD ES SUPERIOR AL STOCK REGRESAR VALORES INICIALES
		=============================================*/

		$(this).val(1);

		var precioFinal = $(this).val() * precio.attr("precioReal");

		precio.val(precioFinal);

		swal({
	      	title: "La cantidad supera el Stock",
	      	text: "¡Sólo hay "+$(this).attr("stock")+" unidades! Debe Ordenar la diferencia",
	      	type: "error",
	      	confirmButtonText: "¡Cerrar!"
	    });

	    listarProductosVenta();

	    return;

	}

    listarProductosVenta();

})

/*=============================================
MODIFICAR LA CANTIDAD PRODUCTOS ORDEN
=============================================*/
$(".formularioVenta").on("change", "input.nuevaCantidadProductoO", function(){

	var precio = $(this).parent().parent().children().children().children(".nuevoPrecioProductoO");

	var precioFinal = $(this).val() * precio.attr("precioReal");

	precio.val(precioFinal);

	var nuevoStock = Number($(this).attr("stock")) - $(this).val();

	$(this).attr("nuevoStock", nuevoStock);	

    // AGRUPAR PRODUCTOS EN FORMATO JSON

    listarProductosOrden();

})

/*=============================================
MODIFICAR LA CANTIDAD VESTIDOS ORDEN
=============================================*/
$(".formularioVenta").on("change", "input.nuevaCantidadVestidoO", function(){

	var precio = $(this).parent().parent().parent().children().children().children().children(".nuevoPrecioVestidoO");

	var precioFinal = $(this).val() * precio.attr("precioReal");

	precio.val(precioFinal);

    // AGRUPAR PRODUCTOS EN FORMATO JSON

    listarVestidosOrden();

})

/*=============================================
FUNCION DE CALCULO GENERAL
=============================================*/
function CalculoTotales(){

	// SUMAR PRODUCTOS
	var productosV = TotalPrecios($(".nuevoPrecioProductoV"));
	var productosO = TotalPrecios($(".nuevoPrecioProductoO"));

	if(!productosV){productosV=0;}
	if(!productosO){productosO=0;}

	productosT = productosV + productosO;

	// SUMAR VESTIDOS
	var vestidosV = TotalPrecios($(".nuevoPrecioVestidoV"));
	var vestidosO = TotalPrecios($(".nuevoPrecioVestidoO"));

	if(!vestidosV){vestidosV=0;}
	if(!vestidosO){vestidosO=0;}

	vestidosT = vestidosV + vestidosO;

	// SUMAR AJUSTES
	var ajustes = TotalPrecios($(".nuevoPrecioAjuste"));

	if(!ajustes){ajustes=0;}	

	// SUMAR CARGOS
	var cargos = TotalPrecios($(".nuevoPrecioCargo"));

	if(!cargos){cargos=0;}

	// ACTUALIZAR VALOR EXTRAS
	ajustesT = ajustes + cargos
	$("#nuevoCargoExtra").val(ajustesT.toFixed(2));

	//OBTENER VALOR DESCUENTOS	
	descuentoP = $("#nuevoDescuentoPorc").val();
	descuentoM = $("#nuevoDescuentoMonto").val();

	// ACTUALIZAR VALOR SUBTOTAL
	sumaSubtotal = productosT + vestidosT + ajustesT;
	descuentoT = sumaSubtotal * descuentoP / 100;
	subTotal = sumaSubtotal - descuentoT - descuentoM;
	$("#nuevoSubtotal").val(subTotal.toFixed(2));

	//OBTENER VALOR IMPUESTO
	impuesto = Number($("#nuevoValorImpuesto").val());

	// ACTUALIZAR VALOR IMPUESTO
	impuestoT = subTotal - (subTotal / ((impuesto + 100) / 100));
	$("#nuevoImpuesto").val(impuestoT.toFixed(2));

	//OBTENER VALOR ENVIO
	envio = Number($("#nuevoEnvio").val());

	// ACTUALIZAR VALOR TOTAL
	total = subTotal + envio;
	$("#nuevoTotal").val(total.toFixed(2));

}

/*=============================================
SUMAR TODOS LOS PRECIOS
=============================================*/
function TotalPrecios(item){

	var arraySumaPrecio = [];

	var precioItem = item;

	for(var i = 0; i < precioItem.length; i++){

		 arraySumaPrecio.push(Number($(precioItem[i]).val()));

	}

	function sumaArrayPrecios(total, numero){

		return total + numero;

	}

	if(precioItem.length>0){
		var sumaTotalPrecio = arraySumaPrecio.reduce(sumaArrayPrecios);
	}	

	return sumaTotalPrecio

}

/*=============================================
CUANDO CAMBIA DESCUENTOS O VALOR ENVIO
=============================================*/
$("#nuevoDescuentoMonto, #nuevoDescuentoPorc, #nuevoEnvio").change(function(){

	CalculoTotales();

});

/*=============================================
SELECCIONAR MÉTODO DE PAGO
=============================================*/
$("#nuevoMetodoPago").change(function(){

	var metodo = $(this).val();

	if(metodo == 1){

		$(this).parent().parent().removeClass("col-xs-6");

		$(this).parent().parent().addClass("col-xs-4");

		$(this).parent().parent().parent().children(".cajasMetodoPago").html(
			'<div class="col-xs-4">'+
			 	'<div class="input-group">'+
			 		'<span class="input-group-addon"><i class="ion ion-social-usd"></i></span>'+
			 		'<input type="text" class="form-control" id="nuevoValorEfectivo" placeholder="000000" required>'+
			 	'</div>'+
			'</div>'+
			'<div class="col-xs-4" id="capturarCambioEfectivo" style="padding-left:0px">'+
			 	'<div class="input-group">'+
			 		'<span class="input-group-addon"><i class="ion ion-social-usd"></i></span>'+
			 		'<input type="number" class="form-control" id="nuevoCambioEfectivo" placeholder="000000" readonly required>'+
			 	'</div>'+
			'</div>'
		);

		// Agregar formato al precio

		$('#nuevoValorEfectivo').number( true, 2);
      	$('#nuevoCambioEfectivo').number( true, 2);

      	// Listar método en la entrada
      	listarMetodos()

	}else{

		$(this).parent().parent().removeClass('col-xs-4');

		$(this).parent().parent().addClass('col-xs-6');

		$(this).parent().parent().parent().children('.cajasMetodoPago').html(
		 	'<div class="col-xs-6" style="padding-left:0px">'+
                '<div class="input-group">'+
                  '<input type="number" min="0" class="form-control" id="nuevoCodigoTransaccion" placeholder="Código transacción"  required>'+
                  '<span class="input-group-addon"><i class="fa fa-lock"></i></span>'+
                '</div>'+
            '</div>'
        );

	}

})

/*=============================================
CAMBIO EN EFECTIVO
=============================================*/
$(".formularioVenta").on("change", "input#nuevoValorEfectivo", function(){

	var efectivo = $(this).val();

	var cambio =  Number(efectivo) - Number($('#nuevoTotal').val());

	var nuevoCambioEfectivo = $(this).parent().parent().parent().children('#capturarCambioEfectivo').children().children('#nuevoCambioEfectivo');

	nuevoCambioEfectivo.val(cambio);

})

/*=============================================
CAMBIO TRANSACCIÓN
=============================================*/
$(".formularioVenta").on("change", "input#nuevoCodigoTransaccion", function(){

	// Listar método en la entrada
     listarMetodos()

})

/*=============================================
LISTAR TODOS LOS PRODUCTOS VENTA
=============================================*/
function listarProductosVenta(){

	var listaProductosVenta = [];

	var producto = $(".nuevaDescripcionProductoV");

	var cantidad = $(".nuevaCantidadProductoV");

	var precio = $(".nuevoPrecioProductoV");

	for(var i = 0; i < producto.length; i++){

		if($(producto[i]).attr("idProducto") != ""){

			listaProductosVenta.push({ "id" : $(producto[i]).attr("idProducto"),
							           "cantidad" : $(cantidad[i]).val(),
							           "stock" : $(cantidad[i]).attr("nuevoStock"),
							           "precio" : $(precio[i]).attr("precioReal"),
							           "total" : $(precio[i]).val()})
		}

	}

	$("#listaProductosVenta").val(JSON.stringify(listaProductosVenta));

	CalculoTotales();

}

/*=============================================
LISTAR TODOS LOS PRODUCTOS ORDEN
=============================================*/
function listarProductosOrden(){

	var listaProductosOrden = [];

	var producto = $(".nuevaDescripcionProductoO");

	var cantidad = $(".nuevaCantidadProductoO");

	var precio = $(".nuevoPrecioProductoO");

	for(var i = 0; i < producto.length; i++){

		if($(producto[i]).attr("idProducto") != ""){

			listaProductosOrden.push({ "id" : $(producto[i]).attr("idProducto"),
							           "cantidad" : $(cantidad[i]).val(),
							           "stock" : $(cantidad[i]).attr("nuevoStock"),
							           "precio" : $(precio[i]).attr("precioReal"),
							           "total" : $(precio[i]).val()})
		}

	}

	$("#listaProductosOrden").val(JSON.stringify(listaProductosOrden));

	CalculoTotales();

}

/*=============================================
LISTAR TODOS LOS VESTIDOS VENTA
=============================================*/
function listarVestidosVenta(){

	var listaVestidosVenta = [];

	var vestido = $(".nuevoProductoVestidoV");

	var cantidad = $(".nuevaCantidadVestidoV");

	var precio = $(".nuevoPrecioVestidoV");

	for(var i = 0; i < vestido.length; i++){

		if($(vestido[i]).attr("idVestido") != ""){

			listaVestidosVenta.push({ "id" : $(vestido[i]).attr("idVestido"),
				                      "cantidad" : $(cantidad[i]).val(),
				                      "precio" : $(precio[i]).attr("precioReal"),
							          "total" : $(precio[i]).val()})
		}

	}

	$("#listaVestidosVenta").val(JSON.stringify(listaVestidosVenta));

	CalculoTotales();

}

/*=============================================
LISTAR TODOS LOS VESTIDOS ORDEN
=============================================*/
function listarVestidosOrden(){

	var listaVestidosOrden = [];

	var vestido = $(".nuevoProductoVestidoO");

	var cantidad = $(".nuevaCantidadVestidoO");

	var precio = $(".nuevoPrecioVestidoO");

	for(var i = 0; i < vestido.length; i++){

		if($(vestido[i]).attr("idVestido") != ""){

			listaVestidosOrden.push({ "id" : $(vestido[i]).attr("idVestido"),
				                      "cantidad" : $(cantidad[i]).val(),
				                      "precio" : $(precio[i]).attr("precioReal"),
							          "total" : $(precio[i]).val()})
		}

	}

	$("#listaVestidosOrden").val(JSON.stringify(listaVestidosOrden));

	CalculoTotales();

}

/*=============================================
LISTAR TODOS LOS CARGOS
=============================================*/
function listarCargos(){

	var listaCargos = [];

	var cargo = $(".nuevaDescripcionCargo");

	var precio = $(".nuevoPrecioCargo");

	var textoCargo = $(".nuevoTextoCargo");

	for(var i = 0; i < cargo.length; i++){

		if($(cargo[i]).attr("idCargo") != ""){

			listaCargos.push({ "id" : $(cargo[i]).attr("idCargo"),
							   "cargo" : $(cargo[i]).val(),
							   "precio" : $(precio[i]).val(),
							   "ajuste" : $(textoCargo[i]).val()})

		}

	}

	$("#listaCargos").val(JSON.stringify(listaCargos));

	CalculoTotales();

}

/*=============================================
LISTAR TODOS LOS AJUSTES
=============================================*/
function listarAjustes(){

	var listaAjustes = [];

	var ajuste = $(".nuevaDescripcionAjuste");

	var precio = $(".nuevoPrecioAjuste");

	var textoAjuste = $(".nuevoTextoAjuste");

	for(var i = 0; i < ajuste.length; i++){

		if($(ajuste[i]).attr("idAjuste") != ""){

			listaAjustes.push({ "vestido" : $(ajuste[i]).attr("idVestido"),
				                "id" : $(ajuste[i]).attr("idAjuste"),
							    "cargo" : $(ajuste[i]).val(),
							    "precio" : $(precio[i]).val(),
							    "tipo" : $(ajuste[i]).attr("tipo"),
							    "ajuste" : $(textoAjuste[i]).val()})

		}

	}

	$("#listaAjustes").val(JSON.stringify(listaAjustes));

	CalculoTotales();

}

/*=============================================
LISTAR MÉTODO DE PAGO
=============================================*/
function listarMetodos(){

	var listaMetodos = "";

	if($("#nuevoMetodoPago").val() == "Efectivo"){

		$("#nuevoCodTransaccion").val("");

	}else{

		$("#nuevoCodTransaccion").val($("#nuevoCodigoTransaccion").val());

	}

}

/*=============================================
BOTON EDITAR VENTA
=============================================*/
$(".tablas").on("click", ".btnEditarVenta", function(){

	var idVenta = $(this).attr("idVenta");

	window.location = "index.php?ruta=editar-venta&idVenta="+idVenta;

})

/*=============================================
FUNCIÓN PARA DESACTIVAR LOS BOTONES AGREGAR CUANDO EL PRODUCTO YA HABÍA SIDO SELECCIONADO EN LA CARPETA
=============================================*/
function quitarAgregarProductoVenta(){

	//Capturamos todos los id de productos que fueron elegidos en la venta
	var idProductos = $(".quitarProductoV");

	//Capturamos todos los botones de agregar que aparecen en la tabla
	var botonesTabla = $(".tablaVentaProductos tbody button.agregarProducto");

	//Recorremos en un ciclo para obtener los diferentes idProductos que fueron agregados a la venta
	for(var i = 0; i < idProductos.length; i++){

		//Capturamos los Id de los productos agregados a la venta
		var boton = $(idProductos[i]).attr("idProducto");

		//Hacemos un recorrido por la tabla que aparece para desactivar los botones de agregar
		for(var j = 0; j < botonesTabla.length; j ++){

			if($(botonesTabla[j]).attr("idProducto") == boton){

				$(botonesTabla[j]).removeClass("btn-primary agregarProducto");
				$(botonesTabla[j]).addClass("btn-default");

			}
		}

	}

}

/*=============================================
FUNCIÓN PARA DESACTIVAR LOS BOTONES ORDENAR CUANDO EL PRODUCTO YA HABÍA SIDO SELECCIONADO EN LA CARPETA
=============================================*/
function quitarAgregarProductoOrden(){

	//Capturamos todos los id de productos que fueron elegidos en la venta
	var idProductos = $(".quitarProductoO");

	//Capturamos todos los botones de agregar que aparecen en la tabla
	var botonesTabla = $(".tablaVentaProductos tbody button.ordenarProducto");

	//Recorremos en un ciclo para obtener los diferentes idProductos que fueron agregados a la venta
	for(var i = 0; i < idProductos.length; i++){

		//Capturamos los Id de los productos agregados a la venta
		var boton = $(idProductos[i]).attr("idProducto");

		//Hacemos un recorrido por la tabla que aparece para desactivar los botones de agregar
		for(var j = 0; j < botonesTabla.length; j ++){

			if($(botonesTabla[j]).attr("idProducto") == boton){

				$(botonesTabla[j]).removeClass("btn-success ordenarProducto");
				$(botonesTabla[j]).addClass("btn-default");

			}
		}

	}

}

/*=============================================
FUNCIÓN PARA DESACTIVAR LOS BOTONES AGREGAR CUANDO EL VESTIDO YA HABÍA SIDO SELECCIONADO EN LA CARPETA
=============================================*/
function quitarAgregarVestidoVenta(){

	//Capturamos todos los id de vestidos que fueron elegidos en la venta
	var idVestidos = $(".quitarVestidoV");

	//Capturamos todos los botones de agregar que aparecen en la tabla
	var botonesTabla = $(".tablaVentaVestidos tbody button.agregarVestido");

	//Recorremos en un ciclo para obtener los diferentes idProductos que fueron agregados a la venta
	for(var i = 0; i < idVestidos.length; i++){

		//Capturamos los Id de los productos agregados a la venta
		var boton = $(idVestidos[i]).attr("idVestido");

		//Hacemos un recorrido por la tabla que aparece para desactivar los botones de agregar
		for(var j = 0; j < botonesTabla.length; j ++){

			if($(botonesTabla[j]).attr("idVestido") == boton){

				$(botonesTabla[j]).removeClass("btn-primary agregarVestido");
				$(botonesTabla[j]).addClass("btn-default");

			}
		}

	}

}

/*=============================================
FUNCIÓN PARA DESACTIVAR LOS BOTONES ORDENAR CUANDO EL VESTIDO YA HABÍA SIDO SELECCIONADO EN LA CARPETA
=============================================*/
function quitarAgregarVestidoOrden(){

	//Capturamos todos los id de vestidos que fueron elegidos en la venta
	var idVestidos = $(".quitarVestidoO");

	//Capturamos todos los botones de agregar que aparecen en la tabla
	var botonesTabla = $(".tablaVentaVestidos tbody button.ordenarVestido");

	//Recorremos en un ciclo para obtener los diferentes idProductos que fueron agregados a la venta
	for(var i = 0; i < idVestidos.length; i++){

		//Capturamos los Id de los productos agregados a la venta
		var boton = $(idVestidos[i]).attr("idVestido");

		//Hacemos un recorrido por la tabla que aparece para desactivar los botones de agregar
		for(var j = 0; j < botonesTabla.length; j ++){

			if($(botonesTabla[j]).attr("idVestido") == boton){

				$(botonesTabla[j]).removeClass("btn-success ordenarVestido");
				$(botonesTabla[j]).addClass("btn-default");

			}
		}

	}

}

/*=============================================
FUNCIÓN PARA DESACTIVAR LOS BOTONES ORDENAR CUANDO EL VESTIDO YA HABÍA SIDO SELECCIONADO EN LA CARPETA
=============================================*/
function quitarAgregarVestidoOrden(){

	//Capturamos todos los id de vestidos que fueron elegidos en la venta
	var idVestidos = $(".quitarVestidoO");

	//Capturamos todos los botones de agregar que aparecen en la tabla
	var botonesTabla = $(".tablaVentaVestidos tbody button.ordenarVestido");

	//Recorremos en un ciclo para obtener los diferentes idProductos que fueron agregados a la venta
	for(var i = 0; i < idVestidos.length; i++){

		//Capturamos los Id de los productos agregados a la venta
		var boton = $(idVestidos[i]).attr("idVestido");

		//Hacemos un recorrido por la tabla que aparece para desactivar los botones de agregar
		for(var j = 0; j < botonesTabla.length; j ++){

			if($(botonesTabla[j]).attr("idVestido") == boton){

				$(botonesTabla[j]).removeClass("btn-success ordenarVestido");
				$(botonesTabla[j]).addClass("btn-default");

			}
		}

	}

}

/*=============================================
BORRAR VENTA
=============================================*/
$(".tablas").on("click", ".btnEliminarVenta", function(){

  	var idVenta = $(this).attr("idVenta");

  	swal({
        title: '¿Está seguro de borrar la venta?',
        text: "¡Si no lo está puede cancelar la accíón!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, borrar venta!'
      	}).then(function(result){
        if (result.value) {
            window.location = "index.php?ruta=ventas&idVenta="+idVenta;
        }
  	})

})

/*=============================================
IMPRIMIR FACTURA
=============================================*/
$(".tablas").on("click", ".btnImprimirFactura", function(){

	var codigoVenta = $(this).attr("codigoVenta");

	window.open("extensiones/tcpdf/pdf/factura.php?codigo="+codigoVenta, "_blank");

})

/*=============================================
RANGO DE FECHAS
=============================================*/
$('#daterange-btn').daterangepicker({
    ranges   : {
      	'Hoy'       : [moment(), moment()],
      	'Ayer'   : [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      	'Últimos 7 días' : [moment().subtract(6, 'days'), moment()],
      	'Últimos 30 días': [moment().subtract(29, 'days'), moment()],
      	'Este mes'  : [moment().startOf('month'), moment().endOf('month')],
      	'Último mes'  : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    },
    startDate: moment(),
    endDate  : moment()
  	},
  	
  	function (start, end) {
    	$('#daterange-btn span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));

	    var fechaInicial = start.format('YYYY-MM-DD');

	    var fechaFinal = end.format('YYYY-MM-DD');

	    var capturarRango = $("#daterange-btn span").html();

	   	localStorage.setItem("capturarRango", capturarRango);

	   	window.location = "index.php?ruta=ventas&fechaInicial="+fechaInicial+"&fechaFinal="+fechaFinal;

 	}

)

/*=============================================
CANCELAR RANGO DE FECHAS
=============================================*/
$(".daterangepicker.opensleft .range_inputs .cancelBtn").on("click", function(){

	localStorage.removeItem("capturarRango");
	localStorage.clear();
	window.location = "ventas";

})

/*=============================================
CAPTURAR HOY
=============================================*/
$(".daterangepicker.opensleft .ranges li").on("click", function(){

	var textoHoy = $(this).attr("data-range-key");

    if(textoHoy == "Hoy"){

     	var d = new Date();

      	var dia = d.getDate();
      	var mes = d.getMonth()+1;
      	var año = d.getFullYear();

      	dia = ("0"+dia).slice(-2);
      	mes = ("0"+mes).slice(-2);

      	var fechaInicial = año+"-"+mes+"-"+dia;
      	var fechaFinal = año+"-"+mes+"-"+dia;

      	localStorage.setItem("capturarRango", "Hoy");

     	window.location = "index.php?ruta=ventas&fechaInicial="+fechaInicial+"&fechaFinal="+fechaFinal;

  	}

})

/*=============================================
CADA VEZ QUE CARGUE LA TABLA CUANDO NAVEGAMOS EN ELLA EJECUTAR LA FUNCIÓN:
=============================================*/
$('.tablaVentaProductos, .tablaVentaVestidos').on( 'draw.dt', function(){

	eventotablas();

})

function eventotablas(){
    quitarAgregarProductoVenta();
    quitarAgregarProductoOrden();
    quitarAgregarVestidoVenta();
    quitarAgregarVestidoOrden();
    listarProductosVenta();
    listarProductosOrden();
    listarVestidosVenta();
    listarVestidosOrden();
    listarCargos();
    listarAjustes();
    listarMetodos();
}

window.onload = eventotablas();

/*=============================================
VALIDA QUE NO SE CARGUE LA VENTA SIN AL MENOS UN PRODUCTO O VESTIDO
=============================================*/
$("#btnLiquidar").click(function(){	

	$("#btnTipo").val("Liquidar");

});

$(".formularioVenta").on('submit', function(evt){

	if($("#btnTipo").val() == "Liquidar"){		

		if($("#nuevoMetodoPago").val() == ""){

			evt.preventDefault();

			swal({
		      	title: "Error",
		      	text: "Debe Ingresar un Método de Pago",
		      	type: "error",
		      	confirmButtonText: "¡Cerrar!"
		    });

		}else{

			if($('#nuevoCambioEfectivo').val() < 0){

				evt.preventDefault();

				swal({
			      	title: "Error",
			      	text: "Debe Ingresar un monto de Efectivo mayor o igual a la Venta",
			      	type: "error",
			      	confirmButtonText: "¡Cerrar!"
			    });

			}

		}

	}

	if($("#listaProductosVenta").val()=="[]" &&
	   $("#listaProductosOrden").val()=="[]" &&
	   $("#listaVestidosVenta").val()=="[]" &&
       $("#listaVestidosOrden").val()=="[]"){

		evt.preventDefault();

		swal({
	      	title: "Error",
	      	text: "Debe agregar al menos un Producto o Vestido a la Venta",
	      	type: "error",
	      	confirmButtonText: "¡Cerrar!"
	    });
	}	

});

/*=============================================
ACTIVA BOTON INFORMACION EVENTO
=============================================*/
$(".formularioVenta").on("change", "select#nuevoEvento", function(){

	if($(this).val()){

		$(".btnInfoEvento").attr("disabled", false);

	}else{

		$(".btnInfoEvento").attr("disabled", true);

	}

})

/*=============================================
LLENA MODAL INFORMACION EVENTO
=============================================*/
$(".btnInfoEvento").click(function(){	

	var idEvento = $("#nuevoEvento").val();

	var datos = new FormData();
	datos.append("idEvento", idEvento);

	$.ajax({

		url:"ajax/eventos.ajax.php",
      	method: "POST",
      	data: datos,
      	cache: false,
      	contentType: false,
      	processData: false,
      	dataType:"json",
      	success:function(respuesta){

      		var evento = respuesta['evento'];
      		var descripcion = respuesta['descripcion']

      		var datosCliente = new FormData();
		    datosCliente.append("idCliente",respuesta["id_cliente"]);

	      	$.ajax({

	        	url:"ajax/clientes.ajax.php",
	        	method: "POST",
	        	data: datosCliente,
	        	cache: false,
	        	contentType: false,
	        	processData: false,
	        	dataType:"json",
	        	success:function(respuesta){

	          		var cliente = respuesta["nombre"];

	          		var datosColores = new FormData();
		    		datosColores.append("colorEvento",idEvento);

	          		$.ajax({

			        	url:"ajax/eventos.ajax.php",
			        	method: "POST",
			        	data: datosColores,
			        	cache: false,
			        	contentType: false,
			        	processData: false,
			        	dataType:"json",
			        	success:function(respuesta){  

			        		var arrayColores = [];
			        		arrayColores = respuesta;

			        		var datosVestidos = new FormData();
				    		datosVestidos.append("vestidoEvento",idEvento);

			          		$.ajax({

					        	url:"ajax/eventos.ajax.php",
					        	method: "POST",
					        	data: datosVestidos,
					        	cache: false,
					        	contentType: false,
					        	processData: false,
					        	dataType:"json",
					        	success:function(respuesta){  

					          		var html = '<div class="form-group">'+
										          	'<label>Evento:</label>'+
										            '<div class="input-group">'+
											            '<p>'+
											            	evento+
										            	'</p>'+
										          	'</div>'+
										          	'<label>Descripción:</label>'+
										            '<div class="input-group">'+
											            '<p>'+
											            	descripcion+
										            	'</p>'+
										          	'</div>'+
										          	'<label>Cliente:</label>'+
										            '<div class="input-group">'+
											            '<p>'+
											            	cliente+
										            	'</p>'+
										          	'</div>'+
										          	'<div class="row">'+
										          		'<div class="col-xs-12 col-md-6">'+
										          			'<label>Colores:</label>'+
										            		'<div class="input-group">'+
											            		'<ul>';

													            	arrayColores.forEach(funcionForEach1);
															        function funcionForEach1(item, index){
																		html = html + '<li>'+item.color+'</li>';
															        }

							        		      html = html + '</ul>'+
							                     			'</div>'+
							                     		'</div>'+
							                     		'<div class="col-xs-12 col-md-6">'+
							                     			'<label>Vestidos:</label>'+
							                     			'<div class="input-group">'+
							                     				'<ul>';

															        respuesta.forEach(funcionForEach2);
															        function funcionForEach2(item, index){
																		html = html + '<li>'+item.nombre+'</li>';
															        }

							        			  html = html + '</ul>'+
							        						'</div>'+
							        					'</div>'+
							        				'</div>'+
							        			'</div>';

									$('.modal-body').html(html);
									$('#modalInfoEvento').modal('show'); 

					          	}

					      	})

			          	}

			      	})    

	          	}

	      	})      		

      	}

	})

});