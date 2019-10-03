<?php

require_once "conexion.php";

class ModeloVentas{

	/*=============================================
	MOSTRAR VENTAS
	=============================================*/

	static public function mdlMostrarVentas($tabla, $item, $valor){

		if($item != null){

			$stmt = Conexion::conectar()->prepare("SELECT * FROM $tabla WHERE $item = :$item ORDER BY id ASC");

			$stmt -> bindParam(":".$item, $valor, PDO::PARAM_STR);

			$stmt -> execute();

			return $stmt -> fetch();

		}else{

			$stmt = Conexion::conectar()->prepare("SELECT * FROM $tabla ORDER BY id ASC");

			$stmt -> execute();

			return $stmt -> fetchAll();

		}

		$stmt -> close();

		$stmt = null;

	}

	/*=============================================
	REGISTRO DE VENTA
	=============================================*/

	static public function mdlIngresarVenta($tabla, $datos){

		/*=============================================
		CAPTURAR NEXT_ID TABLA VENTAS
		=============================================*/

		$stmt_id = Conexion::conectar()->prepare("SELECT AUTO_INCREMENT as id											FROM information_schema.TABLES
							    				   WHERE TABLE_NAME = '$tabla'");

		$stmt_id->execute();
		$array = $stmt_id->fetch();
		$id = $array["id"];		

		/*=============================================
		INSERTAMOS EL LA VENTA
		=============================================*/

		$stmt = Conexion::conectar()->prepare("INSERT INTO $tabla(codigo, id_cliente, id_vendedor, id_evento, fecha_transaccion, fecha_entrega, estatus, extras, descuentop, descuentom, subtotal, impuesto, envio, total, metodo_pago, cod_transaccion) VALUES (:codigo, :id_cliente, :id_vendedor, :id_evento, :fecha_transaccion, :fecha_entrega, :estatus, :extras, :descuentop, :descuentom, :subtotal, :impuesto, :envio, :total, :metodo_pago, :cod_transaccion)");

		echo '<script type="text/javascript">alert("'.$datos["metodo_pago"].'");</script>';

		$stmt->bindParam(":codigo", $datos["codigo"], PDO::PARAM_INT);
		$stmt->bindParam(":id_cliente", $datos["id_cliente"], PDO::PARAM_INT);
		$stmt->bindParam(":id_vendedor", $datos["id_vendedor"], PDO::PARAM_INT);
		$stmt->bindParam(":id_evento", $datos["id_evento"], PDO::PARAM_INT);
		$stmt->bindParam(":fecha_transaccion", $datos["fecha_transaccion"], PDO::PARAM_STR);
		$stmt->bindParam(":fecha_entrega", $datos["fecha_entrega"], PDO::PARAM_STR);
		$stmt->bindParam(":estatus", $datos["estatus"], PDO::PARAM_INT);
		$stmt->bindParam(":extras", $datos["extras"], PDO::PARAM_STR);
		$stmt->bindParam(":descuentop", $datos["descuentop"], PDO::PARAM_STR);
		$stmt->bindParam(":descuentom", $datos["descuentom"], PDO::PARAM_STR);
		$stmt->bindParam(":subtotal", $datos["subtotal"], PDO::PARAM_STR);
		$stmt->bindParam(":impuesto", $datos["impuesto"], PDO::PARAM_STR);
		$stmt->bindParam(":envio", $datos["envio"], PDO::PARAM_STR);
		$stmt->bindParam(":total", $datos["total"], PDO::PARAM_STR);
		$stmt->bindParam(":metodo_pago", $datos["metodo_pago"], PDO::PARAM_INT);
		$stmt->bindParam(":cod_transaccion", $datos["cod_transaccion"], PDO::PARAM_STR);

		if($stmt->execute()){

			/*=============================================
			INSERTAMOS LOS PRODUCTOS VENTA
			=============================================*/

			if(count($datos["productosVenta"]) > 0){

				$stmt_pv = Conexion::conectar()->prepare("INSERT INTO productos_transaccion(id_transaccion, id_producto, cantidad, precio, tipo) VALUES (:id_transaccion, :id_producto, :cantidad, :precio, 1)");

				foreach ($datos["productosVenta"] as $key => $value) {

					$stmt_pv->bindParam(":id_transaccion", $id, PDO::PARAM_INT);
					$stmt_pv->bindParam(":id_producto", $value["id"], PDO::PARAM_INT);
					$stmt_pv->bindParam(":cantidad", $value["cantidad"], PDO::PARAM_STR);
					$stmt_pv->bindParam(":precio", $value["precio"], PDO::PARAM_STR);

					if($stmt_pv->execute()){

						$res = "ok";

					}else{

						return "error";
					}	

				}

			}else{

				$res = "ok";

			}	

			/*=============================================
			INSERTAMOS LOS PRODUCTOS ORDEN
			=============================================*/

			if(count($datos["productosOrden"]) > 0){

				$stmt_po = Conexion::conectar()->prepare("INSERT INTO productos_transaccion(id_transaccion, id_producto, cantidad, precio, tipo) VALUES (:id_transaccion, :id_producto, :cantidad, :precio, 2)");

				foreach ($datos["productosOrden"] as $key => $value) {

					$stmt_po->bindParam(":id_transaccion", $id, PDO::PARAM_INT);
					$stmt_po->bindParam(":id_producto", $value["id"], PDO::PARAM_INT);
					$stmt_po->bindParam(":cantidad", $value["cantidad"], PDO::PARAM_STR);
					$stmt_po->bindParam(":precio", $value["precio"], PDO::PARAM_STR);

					if($stmt_po->execute()){

						$res = "ok";

					}else{

						return "error";
					}	

				}

			}else{

				$res = "ok";

			}	

			/*=============================================
			INSERTAMOS LOS VESTIDOS VENTA
			=============================================*/

			if(count($datos["vestidosVenta"]) > 0){

				$stmt_vv = Conexion::conectar()->prepare("INSERT INTO vestidos_transaccion(id_transaccion, id_vestido, cantidad, precio, tipo) VALUES (:id_transaccion, :id_vestido, :cantidad, :precio, 1)");

				foreach ($datos["vestidosVenta"] as $key => $value){

					/*=============================================
					CAPTURAR NEXT_ID TABLA VESTIDOS_TRANSACCION
					=============================================*/

					$tabla = "vestidos_transaccion";

					$stmt_id2 = Conexion::conectar()->prepare("SELECT AUTO_INCREMENT as id										FROM information_schema.TABLES
										    				   WHERE TABLE_NAME = '$tabla'");

					$stmt_id2->execute();
					$array = $stmt_id2->fetch();
					$id_vt1 = $array["id"];	
					$id_vestido = $value["id"];	

					$stmt_vv->bindParam(":id_transaccion", $id, PDO::PARAM_INT);
					$stmt_vv->bindParam(":id_vestido", $value["id"], PDO::PARAM_INT);
					$stmt_vv->bindParam(":cantidad", $value["cantidad"], PDO::PARAM_STR);
					$stmt_vv->bindParam(":precio", $value["precio"], PDO::PARAM_STR);

					if($stmt_vv->execute()){

						if(count($datos["ajustes"]) > 0){

							foreach ($datos["ajustes"] as $key => $value){

								if($id_vestido==$value["vestido"]||$value["tipo"]==1){

									$stmt_av = Conexion::conectar()->prepare("INSERT INTO ajustes_vestido(id_detalle, id_cargo, precio, ajustes) VALUES (:id_detalle, :id_cargo, :precio, :ajustes)");

									$stmt_av->bindParam(":id_detalle", $id, PDO::PARAM_INT);
									$stmt_av->bindParam(":id_cargo", $value["cargo"], PDO::PARAM_INT);
									$stmt_av->bindParam(":precio", $value["precio"], PDO::PARAM_STR);
									$stmt_av->bindParam(":ajustes", $value["ajuste"], PDO::PARAM_STR);

									if($stmt_av->execute()){

										$res = "ok";

									}else{

										return "error";
									}	

								}								

							}

						}else{

							$res = "ok";

						}

					}else{

						return "error";
					}	

				}

			}else{

				$res = "ok";

			}	

			/*=============================================
			INSERTAMOS LOS VESTIDOS ORDEN
			=============================================*/

			if(count($datos["vestidosOrden"]) > 0){

				$stmt_vo = Conexion::conectar()->prepare("INSERT INTO vestidos_transaccion(id_transaccion, id_vestido, cantidad, precio, tipo) VALUES (:id_transaccion, :id_vestido, :cantidad, :precio, 2)");

				foreach ($datos["vestidosOrden"] as $key => $value) {

					$stmt_vo->bindParam(":id_transaccion", $id, PDO::PARAM_INT);
					$stmt_vo->bindParam(":id_vestido", $value["id"], PDO::PARAM_INT);
					$stmt_vo->bindParam(":cantidad", $value["cantidad"], PDO::PARAM_STR);
					$stmt_vo->bindParam(":precio", $value["precio"], PDO::PARAM_STR);

					if($stmt_vo->execute()){

						if(count($datos["ajustes"]) > 0){

							foreach ($datos["ajustes"] as $key => $value){

								if($id_vestido==$value["vestido"]||$value["tipo"]==2){

									$stmt_av = Conexion::conectar()->prepare("INSERT INTO ajustes_vestido(id_detalle, id_cargo, precio, ajustes) VALUES (:id_detalle, :id_cargo, :precio, :ajustes)");

									$stmt_av->bindParam(":id_detalle", $id, PDO::PARAM_INT);
									$stmt_av->bindParam(":id_cargo", $value["cargo"], PDO::PARAM_INT);
									$stmt_av->bindParam(":precio", $value["precio"], PDO::PARAM_STR);
									$stmt_av->bindParam(":ajustes", $value["ajuste"], PDO::PARAM_STR);

									if($stmt_av->execute()){

										$res = "ok";

									}else{

										return "error";
									}	

								}								

							}

						}else{

							$res = "ok";

						}

					}else{

						return "error";
						
					}	

				}

			}else{

				$res = "ok";

			}	

			/*=============================================
			INSERTAMOS LOS CARGOS GENERALES
			=============================================*/

			if(count($datos["cargos"]) > 0){

				$stmt_cg = Conexion::conectar()->prepare("INSERT INTO cargos_transaccion(id_transaccion, id_cargo, precio, ajustes) VALUES (:id_transaccion, :id_cargo, :precio, :ajustes)");

				foreach ($datos["cargos"] as $key => $value) {

					$stmt_cg->bindParam(":id_transaccion", $id, PDO::PARAM_INT);
					$stmt_cg->bindParam(":id_cargo", $value["cargo"], PDO::PARAM_INT);
					$stmt_cg->bindParam(":precio", $value["precio"], PDO::PARAM_STR);
					$stmt_cg->bindParam(":ajustes", $value["ajuste"], PDO::PARAM_STR);

					if($stmt_cg->execute()){

						$res = "ok";

					}else{

						return "error";
					}	

				}

			}else{

				$res = "ok";

			}	

			return $res;

		}else{

			return "error";

		}

		$stmt->close();
		$stmt = null;

	}

	/*=============================================
	EDITAR VENTA
	=============================================*/

	static public function mdlEditarVenta($tabla, $datos){

		$stmt = Conexion::conectar()->prepare("UPDATE $tabla SET  id_cliente = :id_cliente, id_vendedor = :id_vendedor, productos = :productos, impuesto = :impuesto, neto = :neto, total= :total, metodo_pago = :metodo_pago WHERE codigo = :codigo");

		$stmt->bindParam(":codigo", $datos["codigo"], PDO::PARAM_INT);
		$stmt->bindParam(":id_cliente", $datos["id_cliente"], PDO::PARAM_INT);
		$stmt->bindParam(":id_vendedor", $datos["id_vendedor"], PDO::PARAM_INT);
		$stmt->bindParam(":productos", $datos["productos"], PDO::PARAM_STR);
		$stmt->bindParam(":impuesto", $datos["impuesto"], PDO::PARAM_STR);
		$stmt->bindParam(":neto", $datos["neto"], PDO::PARAM_STR);
		$stmt->bindParam(":total", $datos["total"], PDO::PARAM_STR);
		$stmt->bindParam(":metodo_pago", $datos["metodo_pago"], PDO::PARAM_STR);

		if($stmt->execute()){

			return "ok";

		}else{

			return "error";

		}

		$stmt->close();
		$stmt = null;

	}

	/*=============================================
	ELIMINAR VENTA
	=============================================*/

	static public function mdlEliminarVenta($tabla, $datos){

		$stmt = Conexion::conectar()->prepare("DELETE FROM $tabla WHERE id = :id");

		$stmt -> bindParam(":id", $datos, PDO::PARAM_INT);

		if($stmt -> execute()){

			return "ok";

		}else{

			return "error";

		}

		$stmt -> close();

		$stmt = null;

	}

	/*=============================================
	RANGO FECHAS
	=============================================*/

	static public function mdlRangoFechasVentas($tabla, $fechaInicial, $fechaFinal){

		if($fechaInicial == null){

			$stmt = Conexion::conectar()->prepare("SELECT * FROM $tabla ORDER BY id ASC");

			$stmt -> execute();

			return $stmt -> fetchAll();


		}else if($fechaInicial == $fechaFinal){

			$stmt = Conexion::conectar()->prepare("SELECT * FROM $tabla WHERE  fecha like '%$fechaFinal%'");

			$stmt -> bindParam(":fecha", $fechaFinal, PDO::PARAM_STR);

			$stmt -> execute();

			return $stmt -> fetchAll();

			$stmt -> close();

			$stmt = null;

		}else{

			// date_default_timezone_set('America/Mexico_City');
			//
			// $pib =new DateTime();
			// $fechaActual = new DateTime();
			// $fechaActual ->add(new DateInterval("P1D"));
			// $fechaActualMasUno = $fechaActual->format("Y-m-d");
			//
			// $fechaFinal2 = new DateTime($fechaFinal);
			// $fechaFinal2 ->add(new DateInterval("P1D"));
			// $fechaFinalMasUno = $fechaFinal2->format("Y-m-d");
			//
			// // var_dump($pib);
			// // var_dump($fechaActual);
			// // var_dump($fechaActualMasUno);
			// // var_dump($fechaFinal2);
			// // var_dump($fechaFinalMasUno);
			$stmt = Conexion::conectar()->prepare("SELECT * FROM $tabla WHERE fecha BETWEEN '$fechaInicial' AND '$fechaFinal'");

			// if($fechaFinalMasUno == $fechaActualMasUno){
			//
			// 	$stmt = Conexion::conectar()->prepare("SELECT * FROM $tabla WHERE fecha BETWEEN '$fechaInicial' AND '$fechaFinalMasUno'");
			//
			// }else{
			//
			//
			//
			//
			// }

			$stmt -> execute();

			return $stmt -> fetchAll();

			$stmt -> close();

			$stmt = null;

		}

	}

}