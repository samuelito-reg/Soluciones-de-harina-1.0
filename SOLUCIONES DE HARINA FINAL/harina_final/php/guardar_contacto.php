<?php
require_once 'conexion.php';
if($_SERVER['REQUEST_METHOD']!=='POST'){echo json_encode(['ok'=>false,'msg'=>'Método no permitido']);exit;}
$d=json_decode(file_get_contents('php://input'),true);
$nombre=trim($d['nombre']??'');
$email=trim($d['email']??'');
$telefono=trim($d['telefono']??'');
$asunto=trim($d['asunto']??'');
$mensaje=trim($d['mensaje']??'');
if(!$nombre||!$email||!$mensaje){echo json_encode(['ok'=>false,'msg'=>'Nombre, email y mensaje son obligatorios']);exit;}
if(!filter_var($email,FILTER_VALIDATE_EMAIL)){echo json_encode(['ok'=>false,'msg'=>'Email inválido']);exit;}
$c=conectar();
$s=$c->prepare("INSERT INTO mensajes_contacto(nombre,email,telefono,asunto,mensaje) VALUES(?,?,?,?,?)");
$s->bind_param('sssss',$nombre,$email,$telefono,$asunto,$mensaje);
if($s->execute()){echo json_encode(['ok'=>true,'msg'=>'¡Mensaje enviado! Te respondemos en 24h 📬']);}
else{echo json_encode(['ok'=>false,'msg'=>'Error: '.$s->error]);}
$s->close();$c->close();
?>
