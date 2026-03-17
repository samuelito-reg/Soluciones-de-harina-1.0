<?php
/* ================================================
   SOLUCIONES DE HARINA — conexion.php
   ================================================ */
define('DB_HOST','localhost');
define('DB_USER','root');   // usuario XAMPP por defecto
define('DB_PASS','');       // contraseña XAMPP (vacía por defecto)
define('DB_NAME','bd_soluciones_harina');

function conectar(){
  $c=new mysqli(DB_HOST,DB_USER,DB_PASS,DB_NAME);
  if($c->connect_error){
    http_response_code(500);
    echo json_encode(['ok'=>false,'msg'=>'Error BD: '.$c->connect_error]);
    exit;
  }
  $c->set_charset('utf8mb4');
  return $c;
}
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if($_SERVER['REQUEST_METHOD']==='OPTIONS'){http_response_code(200);exit;}
?>
