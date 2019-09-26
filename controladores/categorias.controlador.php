<?php

class ControladorCategorias{

    /*=============================================
	CREAR CATEGORIAS
	=============================================*/

    static public function ctrCrearCategoria(){

      	if(isset($_POST["nuevaCategoria"])){

	      	if(preg_match('/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ ]+$/', $_POST["nuevaCategoria"])){

		        $tabla = "categorias";
		        $item = "categoria";
		        $valor = $_POST["nuevaCategoria"];

		        $duplicado = ModeloCategorias::mdlMostrarCategorias($tabla, $item, $valor);

    			if(!$duplicado){

			        $datos = $_POST["nuevaCategoria"];
			        $respuesta = ModeloCategorias::mdlIngresarCategoria($tabla, $datos);

			        if($respuesta == "ok"){

			            echo'<script>

				            swal({
				                type: "success",
				                title: "La Categoría ha sido guardada correctamente",
				                showConfirmButton: true,
				                confirmButtonText: "Cerrar"
				                }).then(function(result){
				                    if (result.value) {
				                    	window.location = "categorias";
				                    }
				            })

			            </script>';

			        }

		        }else{

          			echo'<script>

			          	swal({
				            title: "Error de Datos",
				            text: "¡Esta Categoría ya existe en la base de datos!",
				            type: "error",
				            confirmButtonText: "¡Cerrar!"
				        });

			          	$("#nuevaCategoria").val("");

			        </script>';

		        }

	      	}else{

		        echo'<script>

		          	swal({
			            type: "error",
			            title: "¡La Categoría no puede ir vacía o llevar caracteres especiales!",
			            showConfirmButton: true,
			            confirmButtonText: "Cerrar"
			            }).then(function(result){
			            if (result.value) {
			            	window.location = "categorias";
		                }
			        })
			        
		        </script>';

		    }
    	}
  	}

    /*=============================================
	MOSTRAR CATEGORIAS
	=============================================*/

	static public function ctrMostrarCategorias($item, $valor){

		$tabla = "categorias";

		$respuesta = ModeloCategorias::mdlMostrarCategorias($tabla, $item, $valor);

		return $respuesta;

	}

    /*=============================================
	EDITAR CATEGORIA
	=============================================*/

	static public function ctrEditarCategoria(){

		if(isset($_POST["editarCategoria"])){

			if(preg_match('/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ ]+$/', $_POST["editarCategoria"])){

				$tabla = "categorias";

				$item = "categoria";
		        $valor = $_POST["editarCategoria"];
		        $old = $_POST["editarOld"];

		        if($valor!=$old){
		        	$duplicado = ModeloCategorias::mdlMostrarCategorias($tabla, $item, $valor);
		        }		        

    			if(!$duplicado){

					$datos = array("categoria"=>$_POST["editarCategoria"],
								   "id"=>$_POST["idCategoria"]);

					$respuesta = ModeloCategorias::mdlEditarCategoria($tabla, $datos);

					if($respuesta == "ok"){

						echo'<script>

							swal({
								type: "success",
								title: "La Categoría ha sido cambiada correctamente",
								showConfirmButton: true,
								confirmButtonText: "Cerrar"
								}).then(function(result){
									if (result.value) {
										window.location = "categorias";
									}
							})

						</script>';

					}

				}else{

          			echo'<script>

			          	swal({
				            title: "Error de Datos",
				            text: "¡Esta Categoría ya existe en la base de datos!",
				            type: "error",
				            confirmButtonText: "¡Cerrar!"
				        });

			          	$("#editarCategoria").val("");

			        </script>';

			    }  

			}else{

				echo'<script>

					swal({
						type: "error",
						title: "¡La Categoría no puede ir vacía o llevar caracteres especiales!",
						showConfirmButton: true,
						confirmButtonText: "Cerrar"
						}).then(function(result){
							if (result.value) {
								window.location = "categorias";
							}
					})

			  	</script>';

			}
		}
	}

    /*=============================================
	BORRAR CATEGORIA
	=============================================*/

	static public function ctrBorrarCategoria(){

		if(isset($_GET["idCategoria"])){

			$tabla ="categorias";

			$datos = $_GET["idCategoria"];

			$respuesta = ModeloCategorias::mdlBorrarCategoria($tabla, $datos);

			if($respuesta == "ok"){

				echo'<script>

					swal({
						type: "success",
						title: "La Categoría ha sido borrada correctamente",
						showConfirmButton: true,
						confirmButtonText: "Cerrar"
						}).then(function(result){
							if (result.value) {
								window.location = "categorias";
							}
					})

				</script>';

			}else{
				
				echo'<script>

					swal({
						type: "error",
						title: "Error al borrar la Categoría, verifique que no esté asociada a una Subcategoría",
						showConfirmButton: true,
						confirmButtonText: "Cerrar"
						}).then(function(result){
							if (result.value) {
								window.location = "categorias";
							}
					})

				</script>';
			}
		}
	}
}
