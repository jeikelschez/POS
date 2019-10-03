<div class="content-wrapper">

  <section class="content-header">

    <h1>

      Crear Venta

    </h1>

    <ol class="breadcrumb">

      <li><a href="inicio"><i class="fa fa-dashboard"></i> Inicio</a></li>

      <li class="active">Crear Venta</li>

    </ol>

  </section>

  <section class="content">

    <div class="row">

      <!--=====================================
      LA TABLA DE PRODUCTOS
      ======================================-->

      <div class="col-lg-7 hidden-md hidden-sm hidden-xs">

        <div class="box box-absi">

          <div class="box-header with-border">

            <h3 class="box-title">Listado de Productos</h3>

          </div>

          <div class="box-body">

            <table class="table table-bordered dt-responsive tablaVentaProductos" width="100%">

              <thead>

                <tr>
                  <th style="width: 5px">#</th>
                  <th>Imagen</th>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Stock</th>
                  <th>Acciones</th>
                </tr>

              </thead>

            </table>

          </div>

          <div class="box-header with-border">

            <h3 class="box-title">Listado de Vesidos</h3>

          </div>

          <div class="box-body">

            <table class="table table-bordered dt-responsive tablaVentaVestidos" width="100%">

              <thead>

                <tr>
                  <th style="width: 5px">#</th>
                  <th>Imagen</th>
                  <th>Producto</th>
                  <th>Etiqueta</th>
                  <th>Color</th>
                  <th>Talla</th>
                  <th>Acciones</th>
                </tr>

              </thead>

            </table>

          </div>

        </div>

      </div>

      <!--=====================================
      EL FORMULARIO
      ======================================-->

      <div class="col-lg-5 col-xs-12">

        <div class="box box-absi">

          <div class="box-header with-border"></div>

          <form role="form" method="post" class="formularioVenta">

            <div class="box-body">

              <div class="box">

                <!--=====================================
                ENTRADA DEL VENDEDOR
                ======================================-->

                <div class="form-group">

                  <label>Vendedor:</label>

                  <div class="input-group">

                    <span class="input-group-addon"><i class="fa fa-user"></i></span>

                    <input type="text" class="form-control" id="nuevoVendedor" value="<?php echo $_SESSION["nombre"]; ?>" readonly>

                    <input type="hidden" name="idVendedor" value="<?php echo $_SESSION["id"]; ?>">

                  </div>

                </div>

                <!--=====================================
                ENTRADA DEL CÓDIGO
                ======================================-->

                <div class="form-group">

                  <label>Código:</label>

                  <div class="input-group">

                    <span class="input-group-addon"><i class="fa fa-key"></i></span>

                    <?php

                    $item = null;
                    $valor = null;

                    $ventas = ControladorVentas::ctrMostrarVentas($item, $valor);

                    if(!$ventas){

                      echo '<input type="text" class="form-control" id="nuevoCodigo" name="nuevoCodigo" value="10001" readonly>';

                    }else{

                      foreach ($ventas as $key => $value) {

                      }

                      $codigo = $value["codigo"] + 1;

                      echo '<input type="text" class="form-control" id="nuevoCodigo" name="nuevoCodigo" value="'.$codigo.'" readonly>';

                    }

                    ?>

                  </div>

                </div>

                <!--=====================================
                ENTRADA DEL CLIENTE
                ======================================-->

                <div class="form-group">

                  <label>Cliente:</label>

                  <div class="input-group">

                    <span class="input-group-addon"><i class="fa fa-users"></i></span>

                    <select class="form-control" id="nuevoSCliente" name="nuevoSCliente" required>

                    <option value="">Seleccionar Cliente</option>

                    <?php

                      $item = null;
                      $valor = null;

                      $clientes = ControladorClientes::ctrMostrarClientes($item, $valor);

                       foreach ($clientes as $key => $value) {

                         echo '<option value="'.$value["id"].'">'.$value["nombre"].'</option>';

                       }

                    ?>

                    </select>

                    <span class="input-group-addon"><button type="button" class="btn btn-default btn-xs" data-toggle="modal" data-target="#modalAgregarCliente" data-dismiss="modal">Agregar cliente</button></span>

                  </div>

                </div>

                <!--=====================================
                ENTRADA DEL EVENTO
                ======================================-->

                <div class="form-group">                  

                  <label>Evento:</label>

                  <div class="input-group">

                    <span class="input-group-addon"><i class="fa fa-users"></i></span>

                    <select class="form-control" id="nuevoEvento" name="nuevoEvento">

                      <option value="">Seleccionar Evento</option>

                      <?php

                        $item = null;
                        $valor = null;

                        $eventos = ControladorEventos::ctrMostrarEventos($item, $valor);

                         foreach ($eventos as $key => $value) {

                           echo '<option value="'.$value["id"].'">'.$value["evento"].'</option>';

                         }

                      ?>

                    </select>

                    <span class="input-group-addon"><button type="button" class="btn btn-info btn-xs btnInfoEvento" disabled><i class="fa fa-sticky-note"></i></button></span>

                  </div>

                </div>

                <!--=====================================
                ENTRADA FECHA ENTREGA
                ======================================-->

                <div class="form-group">    

                  <label>Fecha Entrega:</label>

                  <div class="input-group">

                    <span class="input-group-addon"><i class="fa fa-calendar"></i></span>

                    <input type="date" class="form-control" name="nuevaFechaEntrega" value="<?php echo date('Y-m-d'); ?>" required>

                    <input type="hidden" class="form-control" name="nuevaFechaTrans" id="nuevaFechaTrans" value="<?php echo date('Y-m-d'); ?>" required>

                  </div>

                </div>

                <!--=====================================
                ENTRADA PARA AGREGAR Y ORDENAR PRODUCTO
                ======================================-->

                <div class="form-group row nuevoProducto">

                </div>

                <input type="hidden" id="listaProductosVenta" name="listaProductosVenta">

                <input type="hidden" id="listaProductosOrden" name="listaProductosOrden">


                <!--=====================================
                BOTONES PARA AGREGAR Y ORDENAR PRODUCTO
                ======================================-->

                <button type="button" class="btn btn-default hidden-lg btnAgregarProducto">Agregar Producto</button>

                <button type="button" class="btn btn-default hidden-lg btnOrdenarProducto">Ordenar Producto</button>


                <hr>

                 <!--=====================================
                ENTRADA PARA AGREGAR Y ORDENAR VESTIDOS
                ======================================-->

                <div class="form-group row nuevoVestido">

                </div>

                <input type="hidden" id="listaVestidosVenta" name="listaVestidosVenta">

                <input type="hidden" id="listaVestidosOrden" name="listaVestidosOrden">

                <input type="hidden" id="listaAjustes" name="listaAjustes">

                <!--=====================================
                BOTONES PARA AGREGAR Y ORDENAR VESTIDO
                ======================================-->

                <button type="button" class="btn btn-default hidden-lg btnAgregarVestidoVenta">Agregar Vestido</button>

                <button type="button" class="btn btn-default hidden-lg btnOrdenarVestidoVenta">Ordenar Vestido</button>

                <hr>

                <!--=====================================
                ENTRADA PARA AGREGAR CARGOS EXTRAS
                ======================================-->

                <div class="form-group row nuevoCargoExtra">

                </div>

                <input type="hidden" id="listaCargos" name="listaCargos">

                <!--=====================================
                BOTÓN PARA AGREGAR CARGOS EXTRAS
                ======================================-->

                <button type="button" class="btn btn-default btnAgregarCargos">Agregar Cargos Extras</button>

                <hr>

                <div class="form-group row">

                  <div class="col-xs-12 col-sm-8"></div>

                  <!--=====================================
                  ENTRADA EXTRAS
                  ======================================-->

                  <div class="col-xs-12 col-sm-4">

                    <label>Extras:</label>

                    <div class="input-group">

                      <span class="input-group-addon"><i class="ion ion-social-usd"></i></span>

                      <input type="number" class="form-control" min="0" id="nuevoCargoExtra" name="nuevoCargoExtra" value="0" required readonly>

                    </div>

                  </div>

                </div>

                <div class="form-group row">

                  <div class="col-xs-12 col-sm-4"></div>

                  <!--=====================================
                  ENTRADA DESCUENTO PORCENTAJE
                  ======================================-->

                  <div class="col-xs-12 col-sm-4">

                    <label>Descuento %:</label>

                    <div class="input-group">

                      <input type="number" class="form-control" min="0" id="nuevoDescuentoPorc" name="nuevoDescuentoPorc" value="0" required>

                      <span class="input-group-addon"><i class="fa fa-percent"></i></span>

                    </div>

                  </div>

                  <!--=====================================
                  ENTRADA DESCUENTO MONTO
                  ======================================-->

                  <div class="col-xs-12 col-sm-4">

                    <label>Descuento $:</label>

                    <div class="input-group">

                      <span class="input-group-addon"><i class="ion ion-social-usd"></i></span>

                      <input type="number" class="form-control" min="0" id="nuevoDescuentoMonto" name="nuevoDescuentoMonto" value="0" required>

                    </div>

                  </div>                  

                </div>

                <div class="form-group row">

                  <div class="col-xs-12 col-sm-8"></div>

                  <!--=====================================
                  ENTRADA SUBTOTAL
                  ======================================-->

                  <div class="col-xs-12 col-sm-4">

                    <label>Subtotal:</label>

                    <div class="input-group">

                      <span class="input-group-addon"><i class="ion ion-social-usd"></i></span>

                      <input type="text" class="form-control" id="nuevoSubtotal" name="nuevoSubtotal" placeholder="00000" readonly required>

                    </div>

                  </div>

                </div>

                <div class="form-group row">

                  <div class="col-xs-12 col-sm-8"></div>

                  <!--=====================================
                  ENTRADA IMPUESTO
                  ======================================-->

                  <div class="col-xs-12 col-sm-4">

                    <?php

                      //SE DEBE HACER RUTINA PARA BUSCAR PARAMETRO
                      $impuesto = 8;

                    ?>

                    <label>Impuesto:</label>

                    <div class="input-group">

                      <input type="number" class="form-control" min="0" id="nuevoImpuesto" name="nuevoImpuesto" value="0" required readonly>

                      <input type="hidden" name="nuevoValorImpuesto" id="nuevoValorImpuesto" value="<?php echo $impuesto; ?>">

                      <span class="input-group-addon"><strong><?php echo $impuesto; ?></strong><i class="fa fa-percent"></i></span>

                    </div>

                  </div>

                </div>

                <div class="form-group row">

                  <div class="col-xs-12 col-sm-8"></div>

                  <!--=====================================
                  ENTRADA ENVIO
                  ======================================-->

                  <div class="col-xs-12 col-sm-4">

                    <label>Envío:</label>

                    <div class="input-group">

                      <span class="input-group-addon"><i class="ion ion-social-usd"></i></span>

                      <input type="number" class="form-control" min="0" id="nuevoEnvio" name="nuevoEnvio" value="0" required>

                    </div>

                  </div>

                </div>

                <div class="form-group row">

                  <div class="col-xs-12 col-sm-8"></div>

                  <!--=====================================
                  ENTRADA TOTAL
                  ======================================-->

                  <div class="col-xs-12 col-sm-4">

                    <label>Total:</label>

                    <div class="input-group">

                      <span class="input-group-addon"><i class="ion ion-social-usd"></i></span>

                      <input type="text" class="form-control" id="nuevoTotal" name="nuevoTotal" total="" placeholder="00000" readonly required>

                    </div>

                  </div>

                </div>

                <hr>

                <!--=====================================
                ENTRADA MÉTODO DE PAGO
                ======================================-->

                <div class="form-group row">

                  <div class="col-xs-6" style="padding-right:0px">

                     <div class="input-group">

                      <select class="form-control" id="nuevoMetodoPago" name="nuevoMetodoPago">
                        <option value="">Seleccione método de pago</option>
                        <option value="1">Efectivo</option>
                        <option value="2">Tarjeta Crédito</option>
                        <option value="3">Tarjeta Débito</option>
                      </select>

                    </div>

                  </div>

                  <div class="cajasMetodoPago"></div>

                  <input type="hidden" id="nuevoCodTransaccion" name="nuevoCodTransaccion">

                </div>

                <br>

              </div>

          </div>

          <div class="box-footer">

            <div class=" pull-right">

              <input type="submit" class="btn btn-primary" name="btnGenerar" id="btnGenerar" value ="Generar">
              <input type="submit" class="btn btn-absi" name="btnLiquidar" id="btnLiquidar" value ="Liquidar">
              <input type="hidden" id="btnTipo" name="btnTipo">

          </div>

        </form>

        <?php

          $guardarVenta = new ControladorVentas();
          $guardarVenta -> ctrCrearVenta();

        ?>

        </div>

      </div>



    </div>

  </section>

</div>

<!--=====================================
MODAL AGREGAR CLIENTE
======================================-->

<div id="modalAgregarCliente" class="modal fade" role="dialog">

  <div class="modal-dialog">

    <div class="modal-content">

      <form role="form" method="post">

        <!--=====================================
        CABEZA DEL MODAL
        ======================================-->

        <div class="modal-header" style="background:rgba(255,117,179,1); color:white">

          <button type="button" class="close" data-dismiss="modal">&times;</button>

          <h4 class="modal-title">Agregar cliente</h4>

        </div>

        <!--=====================================
        CUERPO DEL MODAL
        ======================================-->

        <div class="modal-body">

          <div class="box-body">

            <!-- ENTRADA PARA EL NOMBRE -->

            <div class="form-group">

              <div class="input-group">

                <span class="input-group-addon"><i class="fa fa-user"></i></span>

                <input type="text" class="form-control input-lg" name="nuevoCliente" placeholder="Ingresar nombre" required>

              </div>

            </div>

            <!-- ENTRADA PARA EL DOCUMENTO ID -->

            <div class="form-group">

              <div class="input-group">

                <span class="input-group-addon"><i class="fa fa-key"></i></span>

                <input type="number" min="0" class="form-control input-lg" name="nuevoDocumentoId" placeholder="Ingresar documento" required>

              </div>

            </div>

            <!-- ENTRADA PARA EL EMAIL -->

            <div class="form-group">

              <div class="input-group">

                <span class="input-group-addon"><i class="fa fa-envelope"></i></span>

                <input type="email" class="form-control input-lg" name="nuevoEmail" placeholder="Ingresar email" required>

              </div>

            </div>

            <!-- ENTRADA PARA EL TELÉFONO 1 -->

            <div class="form-group">

              <label>Teléfono 1:</label>

              <div class="input-group">

                <span class="input-group-addon"><i class="fa fa-phone"></i></span>

                <input type="text" class="form-control input-lg" name="nuevoTelefono1" placeholder="Ingresar teléfono 1" data-inputmask="'mask':'(99) 9999-9999'" data-mask required>

              </div>

            </div>

            <!-- ENTRADA PARA EL TELÉFONO 2 -->

            <div class="form-group">

              <label>Teléfono 2:</label>

              <div class="input-group">

                <span class="input-group-addon"><i class="fa fa-phone"></i></span>

                <input type="text" class="form-control input-lg" name="nuevoTelefono2" placeholder="Ingresar teléfono 2" data-inputmask="'mask':'(99) 9999-9999'" data-mask>

              </div>

            </div>

            <!-- ENTRADA PARA LA DIRECCIÓN -->

            <div class="form-group">

              <div class="input-group">

                <span class="input-group-addon"><i class="fa fa-map-marker"></i></span>

                <input type="text" class="form-control input-lg" name="nuevaDireccion" placeholder="Ingresar dirección" required>

              </div>

            </div>

             <!-- ENTRADA PARA LA FECHA DE NACIMIENTO -->

            <div class="form-group">

              <div class="input-group">

                <span class="input-group-addon"><i class="fa fa-calendar"></i></span>

                <input type="text" class="form-control input-lg" name="nuevaFechaNacimiento" placeholder="Ingresar fecha nacimiento" data-inputmask="'alias': 'yyyy/mm/dd'" data-mask required>

              </div>

            </div>

          </div>

        </div>

        <!--=====================================
        PIE DEL MODAL
        ======================================-->

        <div class="modal-footer">

          <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Salir</button>

          <button type="submit" class="btn btn-absi">Guardar cliente</button>

        </div>

      </form>

      <?php

        $crearCliente = new ControladorClientes();
        $crearCliente -> ctrCrearCliente();

      ?>

    </div>

  </div>

</div>

<!--=====================================
MODAL INFORMACION EVENTO
======================================-->

<div id="modalInfoEvento" class="modal fade" role="dialog">

  <div class="modal-dialog">

    <div class="modal-content">

      <!--=====================================
      CABEZA DEL MODAL
      ======================================-->

      <div class="modal-header" style="background:rgba(255,117,179,1); color:white">

        <button type="button" class="close" data-dismiss="modal">&times;</button>

        <h4 class="modal-title">Referencias Evento</h4>

      </div>

      <!--=====================================
      CUERPO DEL MODAL
      ======================================-->

      <div class="modal-body">

      </div>

      <!--=====================================
      PIE DEL MODAL
      ======================================-->

      <div class="modal-footer">

        <button type="button" data-dismiss="modal" class="btn btn-absi">Salir</button>

      </div>

    </div>

  </div>

</div>