<div class="content-wrapper">

  <section class="content-header">

    <h1>

      Administrar Ventas

    </h1>

    <ol class="breadcrumb">

      <li><a href="inicio"><i class="fa fa-dashboard"></i> Inicio</a></li>

      <li class="active">Administrar Ventas</li>

    </ol>

  </section>

  <section class="content">

    <div class="box">

      <div class="box-header with-border">

        <a href="crear-venta">

          <button class="btn btn-success">

            Agregar Venta

          </button>

        </a>

        <button type="button" class="btn btn-default pull-right" id="daterange-btn">

          <span>
            <i class="fa fa-calendar"></i> Rango de fecha
          </span>

          <i class="fa fa-caret-down"></i>

        </button>

      </div>

      <div class="box-body">

        <table class="table table-bordered table-striped dt-responsive tablas" width="100%">

          <thead>

            <tr>

              <th style="width:10px">#</th>
              <th>Código Factura</th>
              <th>Cliente</th>
              <th>Vendedor</th>
              <th>Forma de pago</th>
              <th>Subtotal</th>
              <th>Total</th>
              <th>Estatus</th>
              <th>Fecha</th>
              <th>Acciones</th>

            </tr>

          </thead>

          <tbody>

            <?php

            if(isset($_GET["fechaInicial"])){

              $fechaInicial = $_GET["fechaInicial"];
              $fechaFinal = $_GET["fechaFinal"];

            }else{

              $fechaInicial = null;
              $fechaFinal = null;

            }

            $respuesta = ControladorVentas::ctrRangoFechasVentas($fechaInicial, $fechaFinal);

            foreach ($respuesta as $key => $value) {

              $itemCliente = "id";
              $valorCliente = $value["id_cliente"];

              $respuestaCliente = ControladorClientes::ctrMostrarClientes($itemCliente, $valorCliente);

              $itemUsuario = "id";
              $valorUsuario = $value["id_vendedor"];

              $respuestaUsuario = ControladorUsuarios::ctrMostrarUsuarios($itemUsuario, $valorUsuario);

              if($value["metodo_pago"] == 1){

                $metodo = "Efectivo";

              }else if($value["metodo_pago"] == 2){

                $metodo = "Tarjeta Crédito";

              }else if($value["metodo_pago"] == 3){

                $metodo = "Tarjeta Débito";
                
              }

              if($value["estatus"] == 1){

                $estatus = "Liquidada";

              }else if($value["estatus"] == 2){

                $estatus = "Generada";

              }else{

                $estatus = "Otro";
                
              }

              echo '<tr>
                      <td>'.($key+1).'</td>
                      <td>'.$value["codigo"].'</td>
                      <td>'.$respuestaCliente["nombre"].'</td>
                      <td>'.$respuestaUsuario["nombre"].'</td>
                      <td>'.$metodo.'</td>
                      <td>$ '.number_format($value["subtotal"],2).'</td>
                      <td>$ '.number_format($value["total"],2).'</td>
                      <td>'.$estatus.'</td>
                      <td>'.$value["fecha_transaccion"].'</td>
                      <td>
                        <div class="btn-group">
                          <button class="btn btn-info btnImprimirFactura" codigoVenta="'.$value["codigo"].'"><i class="fa fa-print"></i></button>
                          <button class="btn btn-warning btnEditarVenta" idVenta="'.$value["id"].'"><i class="fa fa-pencil"></i></button>
                          <button class="btn btn-danger btnEliminarVenta" idVenta="'.$value["id"].'"><i class="fa fa-times"></i></button>
                        </div>
                      </td>
                    </tr>';
            }

            ?>

          </tbody>

        </table>

        <?php

        $eliminarVenta = new ControladorVentas();
        $eliminarVenta -> ctrEliminarVenta();

        ?>

      </div>

    </div>

  </section>

</div>