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

})

/*=============================================
AGREGANDO PRODUCTOS A LA VENTA DESDE LA TABLA
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

      	    var nombre = respuesta["nombre"];
          	var stock = respuesta["stock"];
          	var precio = respuesta["precio_venta"];

          	/*=============================================
          	EVITAR AGREGAR PRODUTO CUANDO EL STOCK ESTÁ EN CERO
          	=============================================*/

          	if(stock == 0){

      			swal({
			      title: "No hay stock disponible",
			      type: "error",
			      confirmButtonText: "¡Cerrar!"
			    });

			    $("button[idProducto='"+idProducto+"']").addClass("btn-primary agregarProducto");

			    return;

          	}

          	$(".nuevoProducto").append(
          		'<div class="row" style="padding:5px 15px">'+
			  		'<!-- Descripción del producto -->'+
	          		'<div class="col-xs-6" style="padding-right:0px">'+
	            		'<div class="input-group">'+
			              	'<span class="input-group-addon"><button type="button" class="btn btn-danger btn-xs quitarProducto" idProducto="'+idProducto+'"><i class="fa fa-times"></i></button></span>'+
			              	'<input type="text" class="form-control nuevaDescripcionProducto" idProducto="'+idProducto+'" name="agregarProducto" value="'+nombre+'" readonly required>'+
	            		'</div>'+
	          		'</div>'+
	          		'<!-- Cantidad del producto -->'+
	          		'<div class="col-xs-3">'+
	             		'<input type="number" class="form-control nuevaCantidadProducto" name="nuevaCantidadProducto" min="1" value="1" stock="'+stock+'" nuevoStock="'+Number(stock-1)+'" required>'+
	          		'</div>' +
	          		'<!-- Precio del producto -->'+
	          		'<div class="col-xs-3 ingresoPrecio" style="padding-left:0px">'+
	            		'<div class="input-group">'+
	              			'<span class="input-group-addon"><i class="ion ion-social-usd"></i></span>'+
	              			'<input type="text" class="form-control nuevoPrecioProducto" precioReal="'+precio+'" name="nuevoPrecioProducto" value="'+precio+'" readonly required>'+
	            		'</div>'+
	          		'</div>'+
	        	'</div>'
	        );

	        // PONER FORMATO AL PRECIO DE LOS PRODUCTOS

	        $(".nuevoPrecioProducto").number(true, 2);

      	}

     })

})

/*=============================================
AGREGANDO PRODUCTOS DESDE EL BOTÓN PARA DISPOSITIVOS
=============================================*/

var numProducto = 0;

$(".btnAgregarProducto").click(function(){

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
		          	'<div class="col-xs-6" style="padding-right:0px">'+
		            	'<div class="input-group">'+
		              		'<span class="input-group-addon"><button type="button" class="btn btn-danger btn-xs quitarProducto" idProducto><i class="fa fa-times"></i></button></span>'+
		              		'<select class="form-control nuevaDescripcionProducto" id="producto'+numProducto+'" idProducto name="nuevaDescripcionProducto" required>'+
		              			'<option>Seleccione el producto</option>'+
		              		'</select>'+
		            	'</div>'+
		          	'</div>'+
		          	'<!-- Cantidad del producto -->'+
		          	'<div class="col-xs-3 ingresoCantidad">'+
		             	'<input type="number" class="form-control nuevaCantidadProducto" name="nuevaCantidadProducto" min="1" value="1" stock nuevoStock required>'+
		          	'</div>' +
		          	'<!-- Precio del producto -->'+
		          	'<div class="col-xs-3 ingresoPrecio" style="padding-left:0px">'+
		            	'<div class="input-group">'+
		              		'<span class="input-group-addon"><i class="ion ion-social-usd"></i></span>'+
		              		'<input type="text" class="form-control nuevoPrecioProducto" precioReal="" name="nuevoPrecioProducto" readonly required>'+
		            	'</div>'+
		          	'</div>'+
		        '</div>'
		    );


	        // AGREGAR LOS PRODUCTOS AL SELECT

	        respuesta.forEach(funcionForEach);

	        function funcionForEach(item, index){

	         	if(item.stock != 0){

		         	$("#producto"+numProducto).append(

						'<option idProducto="'+item.id+'" value="'+item.nombre+'">'+item.nombre+'</option>'
		         	)

		        }

	        }

	        listarProductos();

	        // PONER FORMATO AL PRECIO DE LOS PRODUCTOS

	        $(".nuevoPrecioProducto").number(true, 2);

      	}

	})

})

/*=============================================
SELECCIONAR PRODUCTO VENTA DESDE EL BOTÓN PARA DISPOSITIVOS
=============================================*/
$(".formularioVenta").on("change", "select.nuevaDescripcionProducto", function(){

	var idProducto = $(this).val();

	$(this).attr("disabled", true);
	$(".btnAgregarProducto").attr("disabled", false);

	$("button.recuperarBoton[idProducto='"+idProducto+"']").addClass('btn-default');
	$("button.recuperarBoto1[idProducto='"+idProducto+"']").removeClass('btn-primary agregarProducto');

	var nuevaDescripcionProducto = $(this).parent().parent().parent().children().children().children(".nuevaDescripcionProducto");
	var quitarProducto = $(this).parent().parent().parent().children().children().children().children(".quitarProducto");
	var nuevoPrecioProducto = $(this).parent().parent().parent().children().children().children(".nuevoPrecioProducto");
	var nuevaCantidadProducto = $(this).parent().parent().parent().children().children(".nuevaCantidadProducto");

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

      		if($("#listaProductos").val()!=""){

				var resproducto = JSON.parse($("#listaProductos").val());

				for(var i = 0; i < resproducto.length; i++){

					if(resproducto[i]["id"]==respuesta["id"]){
						var repetido = true;
					}

				}

			}

			if(!repetido){

				$(nuevaDescripcionProducto).attr("idProducto", respuesta["id"]);
				$(quitarProducto).attr("idProducto", respuesta["id"]);
	      	    $(nuevaCantidadProducto).attr("stock", respuesta["stock"]);
	      	    $(nuevaCantidadProducto).attr("nuevoStock", Number(respuesta["stock"])-1);
	      	    $(nuevoPrecioProducto).val(respuesta["precio_venta"]);
	      	    $(nuevoPrecioProducto).attr("precioReal", respuesta["precio_venta"]);

		        listarProductos();

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
QUITAR PRODUCTOS VENTA Y RECUPERAR BOTÓN
=============================================*/
var idQuitarProducto = [];

localStorage.removeItem("quitarProducto");

$(".formularioVenta").on("click", "button.quitarProducto", function(){	

	var idProducto = $(this).attr("idProducto");

	$(".btnAgregarProducto").attr("disabled", false);
	$("button.recuperarBoton[idProducto='"+idProducto+"']").removeClass('btn-default');
	$("button.recuperarBoton[idProducto='"+idProducto+"']").addClass('btn-primary agregarProducto');

	$(this).parent().parent().parent().parent().remove();

	/*=============================================
	ALMACENAR EN EL LOCALSTORAGE EL ID DEL PRODUCTO A QUITAR
	=============================================*/
	if(localStorage.getItem("quitarProducto") == null){

		idQuitarProducto = [];

	}else{

		idQuitarProducto.concat(localStorage.getItem("quitarProducto"))

	}

	idQuitarProducto.push({"idProducto":idProducto});

	localStorage.setItem("quitarProducto", JSON.stringify(idQuitarProducto));

	listarProductos();

})

/*=============================================
MODIFICAR LA CANTIDAD PRODUCTOS VENTA
=============================================*/
$(".formularioVenta").on("change", "input.nuevaCantidadProducto", function(){

	var precio = $(this).parent().parent().children().children().children(".nuevoPrecioProducto");

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

	    listarProductos();

	    return;

	}

    listarProductos();

})

/*=============================================
FUNCION DE CALCULO GENERAL
=============================================*/
function CalculoTotales(){

	// SUMAR PRODUCTOS
	var productos = TotalPrecios($(".nuevoPrecioProducto"));

	if(!productos){productos=0;}

	productosT = productos;

	//OBTENER VALOR DESCUENTOS	
	descuentoP = $("#nuevoDescuentoPorc").val();
	descuentoM = $("#nuevoDescuentoMonto").val();

	// ACTUALIZAR VALOR SUBTOTAL
	sumaSubtotal = productos;
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
function listarProductos(){

	var listaProductos = [];

	var producto = $(".nuevaDescripcionProducto");

	var cantidad = $(".nuevaCantidadProducto");

	var precio = $(".nuevoPrecioProducto");

	for(var i = 0; i < producto.length; i++){

		if($(producto[i]).attr("idProducto") != ""){

			listaProductos.push({ "id" : $(producto[i]).attr("idProducto"),
							           "cantidad" : $(cantidad[i]).val(),
							           "stock" : $(cantidad[i]).attr("nuevoStock"),
							           "precio" : $(precio[i]).attr("precioReal"),
							           "total" : $(precio[i]).val()})
		}

	}

	$("#listaProductos").val(JSON.stringify(listaProductos));

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
function quitarAgregarProducto(){

	//Capturamos todos los id de productos que fueron elegidos en la venta
	var idProductos = $(".quitarProducto");

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
$('.tablaVentaProductos').on( 'draw.dt', function(){

	eventotablas();

})

function eventotablas(){
    quitarAgregarProducto();
    listarProductos();
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

	if($("#listaProductos").val()=="[]"){

		evt.preventDefault();

		swal({
	      	title: "Error",
	      	text: "Debe agregar al menos un Producto a la Venta",
	      	type: "error",
	      	confirmButtonText: "¡Cerrar!"
	    });
	}	

});