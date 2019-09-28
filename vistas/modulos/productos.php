<div class="content-wrapper">

    <section class="content-header">

      <h1>
        Productos
      </h1>

      <ol class="breadcrumb">
        <li><a href="inicio"><i class="fa fa-dashboard"></i>Inicio</a></li>
        <li class="active">Administrar Productos</li>
      </ol>

    </section>

    <!-- Main content -->
    <section class="content">

      <!-- Default box -->
      <div class="box">
        <div class="box-header with-border">

          <button class="btn btn-success" data-toggle="modal" data-target="#modalAgregarProducto" >

            Agregar Producto
          </button>
        </div>

        <div class="box-body">

          <table class="table table-bordered dt-responsive tablaProductos" width="100%">

            <thead>

              <tr>
                <th style="width:10px">#</th>
                <th>Imagen</th>
                <th>Código</th>
                <th>Código Fabrica</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Stock</th>
                <th>Precio Venta</th>
                <th>Acciones</th>
              </tr>

            </thead>

            <tbody></tbody>

          </table>

        </div>
        <!-- /.box-body -->

      </div>
      <!-- /.box -->

    </section>
    <!-- /.content -->

  </div>
  <!-- /.content-wrapper -->

  <!--=====================================
  MODAL AGREGAR PRODUCTO
  ======================================-->

  <div id="modalAgregarProducto" class="modal fade" role="dialog">

  <div class="modal-dialog">

    <div class="modal-content">

      <form role="form" method="post" enctype="multipart/form-data" class="formularioProducto">

        <!--=====================================
        CABEZA DEL MODAL
        ======================================-->

        <div class="modal-header" style="background:#00a65a; color:white">

          <button type="button" class="close" data-dismiss="modal">&times;</button>

          <h4 class="modal-title">Agregar producto</h4>

        </div>

        <!--=====================================
        CUERPO DEL MODAL
        ======================================-->

        <div class="modal-body">

          <div class="box-body">

            <!-- ENTRADA PARA SELECCIONAR CATEGORÍA -->

            <div class="form-group">

              <label>Categoría:</label>

              <div class="input-group">

                <span class="input-group-addon"><i class="fa fa-th"></i></span>

                <select class="form-control input-lg" id="nuevaCategoria" name="nuevaCategoria" required>

                  <option value="">Selecionar Categoría</option>

                  <?php

                  $item = null;
                  $valor = null;

                  $categorias = ControladorCategorias::ctrMostrarCategorias($item, $valor);

                  foreach ($categorias as $key => $value) {

                    echo '<option value="'.$value["id"].'">'.$value["categoria"].'</option>';
                  }

                  ?>

                </select>
                <input type="hidden" class="form-control input-lg" id="nuevaIdCategoria" name="nuevaIdCategoria" value="">

              </div>

            </div>

            <!-- ENTRADA PARA EL CÓDIGO -->

            <div class="form-group">

              <label>Código:</label>

              <div class="input-group">

                <span class="input-group-addon"><i class="fa fa-code"></i></span>

                <input type="text" class="form-control input-lg" id="nuevoCodigo" name="nuevoCodigo" placeholder="Código" required>

              </div>

            </div>

            <!-- ENTRADA PARA EL CÓDIGO FABRICA -->

            <div class="form-group">

              <label>Código Fábrica:</label>

              <div class="input-group">

                <span class="input-group-addon"><i class="fa fa-code"></i></span>

                <input type="text" class="form-control input-lg" id="nuevoCodigoFab" name="nuevoCodigoFab" placeholder="Ingresar Código Fábrica">

              </div>

            </div>            

            <!-- ENTRADA PARA EL NOMBRE -->

            <div class="form-group">

              <label>Nombre:</label>

              <div class="input-group">

                <span class="input-group-addon"><i class="fa fa-product-hunt"></i></span>

                <input type="text" class="form-control input-lg" id="nuevoNombre"name="nuevoNombre" placeholder="Ingresar Nombre" required>

              </div>

            </div>  

            <div class="form-group row">

              <!-- ENTRADA PARA STOCK -->

              <div class="col-xs-12 col-sm-6">

                <label>Stock:</label>

                <div class="input-group">

                  <span class="input-group-addon"><i class="fa fa-check"></i></span>

                  <input type="number" class="form-control input-lg" name="nuevoStock" id="nuevoStock" min="0" placeholder="Stock" value="0" required>

                </div>

              </div>  

              <!-- ENTRADA PARA PRECIO COMPRA -->

              <div class="col-xs-12 col-sm-6">

                <label>Precio de Compra:</label>

                <div class="input-group">

                  <span class="input-group-addon"><i class="fa fa-arrow-up"></i></span>

                  <input type="number" class="form-control input-lg" id="nuevoPrecioCompra" name="nuevoPrecioCompra" min="0" step="any" placeholder="Precio de Compra">

                </div>

              </div>              

            </div>

            <div class="form-group row">

              <!-- ENTRADA PARA PRECIO VENTA -->

              <div class="col-xs-12 col-sm-6">

                <label>Precio de Venta:</label>

                <div class="input-group">

                  <span class="input-group-addon"><i class="fa fa-arrow-down"></i></span>

                  <input type="number" class="form-control input-lg" id="nuevoPrecioVenta" name="nuevoPrecioVenta" min="0" step="any" placeholder="Precio de Venta" required>

                </div>

              </div>  

              <!-- ENTRADA PARA PORCENTAJE -->

              <div class="col-xs-12 col-sm-6">

                <div class="input-group">

                    <label>

                      <input type="checkbox" class="minimal porcentaje" checked>
                            Utilizar porcentaje

                    </label>

                </div>

                <div class="input-group">

                  <input type="number" class="form-control input-lg nuevoPorcentaje" min="0" value="40" required>

                  <span class="input-group-addon"><i class="fa fa-percent"></i></span>

                </div>

              </div> 

            </div> 

            <div class="form-group row">

              <!-- ENTRADA PARA SUBIR FOTO-->

              <div class="col-xs-12 col-sm-6">

                <div class="panel">SUBIR IMAGEN</div>

                <input type="file" class="nuevaImagen" name="nuevaImagen">

                <p class="help-block">Peso máximo de la imagen 2MB</p>

                <img src="vistas/img/productos/default/anonymous.png" class="img-thumbnail previsualizar" width="100px">

              </div>

            </div>

          </div>

        </div>

        <!--=====================================
        PIE DEL MODAL
        ======================================-->

        <div class="modal-footer">

          <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Salir</button>

          <button type="submit" class="btn btn-success">Guardar producto</button>

        </div>

      </form>

      <?php

        $crearProducto = new ControladorProductos();
        $crearProducto -> ctrCrearProducto();

      ?>

    </div>

  </div>

</div>

<!--=====================================
MODAL EDITAR PRODUCTO
======================================-->

<div id="modalEditarProducto" class="modal fade" role="dialog">

  <div class="modal-dialog">

    <div class="modal-content">

      <form role="form" method="post" enctype="multipart/form-data">

        <!--=====================================
        CABEZA DEL MODAL
        ======================================-->

        <div class="modal-header" style="background:#3c8dbc; color:white">

          <button type="button" class="close" data-dismiss="modal">&times;</button>

          <h4 class="modal-title">Editar producto</h4>

        </div>

        <!--=====================================
        CUERPO DEL MODAL
        ======================================-->

        <div class="modal-body">

          <div class="box-body">

            <input type="hidden"  name="editaridProducto" id="editaridProducto" required>

            <!-- ENTRADA PARA SELECCIONAR CATEGORÍA -->

            <div class="form-group">

              <label>Categoría:</label>

              <div class="input-group">

                <span class="input-group-addon"><i class="fa fa-clipboard"></i></span>

                <select class="form-control input-lg" name="editarCategoria" readonly required>

                  <option id="editarCategoria"></option>               

                </select>

              </div>

            </div>

            <!-- ENTRADA PARA EL CÓDIGO -->

            <div class="form-group">

              <label>Código:</label>

              <div class="input-group">

                <span class="input-group-addon"><i class="fa fa-code"></i></span>

                <input type="text" class="form-control input-lg" id="editarCodigo" name="editarCodigo" placeholder="Código" readonly required>

              </div>

            </div>

            <!-- ENTRADA PARA EL CÓDIGO FABRICA -->

            <div class="form-group">

              <label>Código Fábrica:</label>

              <div class="input-group">

                <span class="input-group-addon"><i class="fa fa-code"></i></span>

                <input type="text" class="form-control input-lg" id="editarCodigoFab" name="editarCodigoFab" placeholder="Ingresar Código Fábrica">

              </div>

            </div>            

            <!-- ENTRADA PARA EL NOMBRE -->

            <div class="form-group">

              <label>Nombre:</label>

              <div class="input-group">

                <span class="input-group-addon"><i class="fa fa-product-hunt"></i></span>

                <input type="text" class="form-control input-lg" id="editarNombre" name="editarNombre" placeholder="Ingresar Nombre" required>

              </div>

            </div>   

            <div class="form-group row">

              <!-- ENTRADA PARA STOCK -->

              <div class="col-xs-12 col-sm-6">

                <label>Stock:</label>

                <div class="input-group">

                  <span class="input-group-addon"><i class="fa fa-check"></i></span>

                  <input type="number" class="form-control input-lg" id="editarStock" name="editarStock" min="0" placeholder="Stock" required>

                </div>

              </div>  

              <!-- ENTRADA PARA PRECIO COMPRA -->

              <div class="col-xs-12 col-sm-6">

                <label>Precio de Compra:</label>

                <div class="input-group">

                  <span class="input-group-addon"><i class="fa fa-arrow-up"></i></span>

                  <input type="number" class="form-control input-lg" id="editarPrecioCompra" name="editarPrecioCompra" min="0" step="any" placeholder="Precio de Compra">

                </div>

              </div>              

            </div>

            <div class="form-group row">

              <!-- ENTRADA PARA PRECIO VENTA -->

              <div class="col-xs-12 col-sm-6">

                <label>Precio de Venta:</label>

                <div class="input-group">

                  <span class="input-group-addon"><i class="fa fa-arrow-down"></i></span>

                  <input type="number" class="form-control input-lg" id="editarPrecioVenta" name="editarPrecioVenta" min="0" step="any" placeholder="Precio de Venta" required>

                </div>

              </div>   

              <!-- ENTRADA PARA PORCENTAJE -->            

              <div class="col-xs-12 col-sm-6">

                <div class="input-group">

                    <label>

                      <input type="checkbox" class="minimal porcentaje" checked>
                            Utilizar porcentaje

                    </label>

                </div>

                <div class="input-group">

                  <input type="number" class="form-control input-lg editarPorcentaje" min="0" value="40" required>

                  <span class="input-group-addon"><i class="fa fa-percent"></i></span>

                </div>

              </div> 

            </div> 

            <div class="form-group row">

              <!-- ENTRADA PARA SUBIR FOTO-->

              <div class="col-xs-12 col-sm-6">

                <div class="panel">SUBIR IMAGEN</div>

                <input type="file" class="editarImagen" name="editarImagen">

                <p class="help-block">Peso máximo de la imagen 2MB</p>

                <img src="vistas/img/productos/default/anonymous.png" class="img-thumbnail previsualizar" width="100px">

                <input type="hidden" name="imagenActual" id="imagenActual">

              </div>              

            </div>

          </div>

        </div>

        <!--=====================================
        PIE DEL MODAL
        ======================================-->

        <div class="modal-footer">

          <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Salir</button>

          <button type="submit" class="btn btn-primary">Guardar cambios</button>

        </div>

      </form>

        <?php

          $editarProducto = new ControladorProductos();
          $editarProducto -> ctrEditarProducto();

        ?>

    </div>

  </div>

</div>

<?php

  $eliminarProducto = new ControladorProductos();
  $eliminarProducto -> ctrEliminarProducto();

?>
