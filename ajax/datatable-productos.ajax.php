<?php

require_once "../controladores/productos.controlador.php";
require_once "../modelos/productos.modelo.php";

require_once "../controladores/categorias.controlador.php";
require_once "../modelos/categorias.modelo.php";

class TablaProductos{

  /*=============================================
   MOSTRAR LA TABLA DE PRODUCTOS
    =============================================*/

  public function mostrarTablaProductos(){

    $item = null;
    $valor = null;

    $productos = ControladorProductos::ctrMostrarProductos($item, $valor);

    $datosJson = '{
      "data": [';

      for($i = 0; $i < count($productos); $i++){

        /*=============================================
         TRAEMOS LA IMAGEN
        =============================================*/

        $imagen = "<img src='".$productos[$i]["imagen"]."' width='40px'>";        

        /*=============================================
         TRAEMOS LA CATEGORÍA
        =============================================*/

        $item = "id";
        $valor = $productos[$i]["id_categoria"];

        $categorias = ControladorCategorias::ctrMostrarCategorias($item, $valor);

        /*=============================================
         CALCULAMOS EL STOCK DEPENDIENDO DE LA CATEGORIA
        =============================================*/

        $cantidad = $productos[$i]["stock"];

        /*=============================================
         PINTAMOS DE COLORES EL STOCK
        =============================================*/

        if($cantidad <= 10){

          $stock = "<button class='btn btn-danger'>".$cantidad."</button>";

        }else if($cantidad > 11 && $cantidad <= 15){

          $stock = "<button class='btn btn-warning'>".$cantidad."</button>";

        }else{

          $stock = "<button class='btn btn-success'>".$cantidad."</button>";

        }

        /*=============================================
         TRAEMOS LAS ACCIONES
        =============================================*/

        $botones =  "<div class='btn-group'><button class='btn btn-warning btnEditarProducto' idProducto='".$productos[$i]["id"]."' data-toggle='modal' data-target='#modalEditarProducto'><i class='fa fa-pencil'></i></button><button class='btn btn-danger btnEliminarProducto' idProducto='".$productos[$i]["id"]."' codigo='".$productos[$i]["codigo"]."' imagen='".$productos[$i]["imagen"]."'><i class='fa fa-times'></i></button></div>";

        $datosJson .='[
          "'.($i+1).'",
          "'.$imagen.'",
          "'.$productos[$i]["codigo"].'",
          "'.$productos[$i]["codigo_fabrica"].'",
          "'.$productos[$i]["nombre"].'",
          "'.$categorias["categoria"].'",
          "'.$stock.'",
          "'.number_format($productos[$i]["precio_venta"],2,',','.').'",
          "'.$botones.'"
          ],';

      }

      if(count($productos)>0){
        $datosJson = substr($datosJson, 0, -1);
      }      

      $datosJson .=   ']

    }';

    echo $datosJson;

  }

}

/*=============================================
ACTIVAR TABLA DE PRODUCTOS
=============================================*/
$activarProductos = new TablaProductos();
$activarProductos -> mostrarTablaProductos();
