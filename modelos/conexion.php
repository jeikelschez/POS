<?php

class Conexion{

	static public function conectar(){

		$link = new PDO("mysql:host=192.185.131.189;dbname=abundiss_pos-pruebas",
                      "abundiss_develop",
  						        "Desarrollador1@",
  						        array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
  		                      PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")
  						        );
  		return $link;

	}

}
