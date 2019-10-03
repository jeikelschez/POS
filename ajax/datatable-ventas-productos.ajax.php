<?php

require_once "../controladores/productos.controlador.php";
require_once "../modelos/productos.modelo.php";


class TablaProductosVentas{

 	/*=============================================
 	 MOSTRAR LA TABLA DE PRODUCTOS
  	=============================================*/

	public function mostrarTablaProductosVentas(){

    	$valor = 1;

  		$productos = ControladorProductos::ctrMostrarProductoNoVestidos($valor);

  		if(count($productos) == 0){

  			echo '{"data": []}';

		  	return;
  		}

  		$datosJson = '{
		  "data": [';

		for($i = 0; $i < count($productos); $i++){

		  	/*=============================================
 	 		TRAEMOS LA IMAGEN
  			=============================================*/

		  	$imagen = "<img src='".$productos[$i]["imagen_absi"]."' width='40px'>";

		  	/*=============================================
 	 		STOCK
  			=============================================*/

  			if($productos[$i]["stock"] <= 10){

  				$stock = "<button class='btn btn-danger'>".$productos[$i]["stock"]."</button>";

  			}else if($productos[$i]["stock"] > 11 && $productos[$i]["stock"] <= 15){

  				$stock = "<button class='btn btn-warning'>".$productos[$i]["stock"]."</button>";

  			}else{

  				$stock = "<button class='btn btn-success'>".$productos[$i]["stock"]."</button>";

  			}

		  	/*=============================================
	         VALIDAMOS EL ESTATUS PARA ACTIVAR BOTON VENTA
	        =============================================*/

	        if($productos[$i]["stock"]>0){
	        	$bclassventa = "btn btn-primary agregarProducto recuperarBoton1";
	        }else{
				$bclassventa = "btn btn-default recuperarBoton1";
			} 

			/*=============================================
	         VALIDAMOS EL PRECIO COMPRA PARA ACTIVAR BOTON ORDEN
	        =============================================*/

			if($productos[$i]["precio_compra"]!=null && $productos[$i]["precio_compra"]!=0){
				$bclassorden = "btn btn-success ordenarProducto recuperarBoton2";
			}else{
				$bclassorden = "btn btn-default recuperarBoton2";
			}	

  			/*=============================================
 	 		TRAEMOS LAS ACCIONES
  			=============================================*/

		  	$botones = "<div class='btn-group'><button class='".$bclassventa."' idProducto='".$productos[$i]["id"]."'><i class='fa fa-cart-plus'></i></button><button class='".$bclassorden."' idProducto='".$productos[$i]["id"]."'><i class='fa fa-shopping-basket'></i></button></div>";

		  	$datosJson .='[
			      "'.($i+1).'",
			      "'.$imagen.'",
			      "'.$productos[$i]["codigo_absi"].'",
			      "'.$productos[$i]["nombre"].'",
			      "'.$stock.'",
			      "'.$botones.'"
			    ],';

		}

		$datosJson = substr($datosJson, 0, -1);

		$datosJson .=   ']

		}';

		echo $datosJson;

	}

}

/*=============================================
ACTIVAR TABLA DE PRODUCTOS
=============================================*/
$activarProductosVentas = new TablaProductosVentas();
$activarProductosVentas -> mostrarTablaProductosVentas();