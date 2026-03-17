<?php
require_once 'conexion.php';
if($_SERVER['REQUEST_METHOD']!=='POST'){echo json_encode(['ok'=>false,'msg'=>'Método no permitido']);exit;}
$d=json_decode(file_get_contents('php://input'),true);
$nombre=trim($d['nombre']??'');
$apell=trim($d['apellido']??'');
$email=trim($d['email']??'');
$tel=trim($d['telefono']??'');
$cargo=trim($d['cargo_aspirado']??'');
$exp=trim($d['experiencia']??'');
if(!$nombre||!$apell||!$email||!$cargo){echo json_encode(['ok'=>false,'msg'=>'Nombre, apellido, email y cargo son obligatorios']);exit;}
if(!filter_var($email,FILTER_VALIDATE_EMAIL)){echo json_encode(['ok'=>false,'msg'=>'Email inválido']);exit;}
$c=conectar();
$s=$c->prepare("INSERT INTO postulaciones(nombre,apellido,email,telefono,cargo_aspirado,experiencia) VALUES(?,?,?,?,?,?)");
$s->bind_param('ssssss',$nombre,$apell,$email,$tel,$cargo,$exp);
if($s->execute()){echo json_encode(['ok'=>true,'msg'=>'¡Postulación enviada! Te contactamos pronto 🎉']);}
else{echo json_encode(['ok'=>false,'msg'=>'Error: '.$s->error]);}
$s->close();$c->close();
?>
