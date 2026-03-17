<?php
require_once 'conexion.php';
if($_SERVER['REQUEST_METHOD']!=='POST'){echo json_encode(['ok'=>false,'msg'=>'Método no permitido']);exit;}
$d=json_decode(file_get_contents('php://input'),true);
$tipo=trim($d['tipo']??'');
$nombre=trim($d['nombre_cliente']??'');
$email=trim($d['email_cliente']??'');
$telefono=trim($d['telefono_cliente']??'');
$factura=trim($d['numero_factura']??'');
$desc=trim($d['descripcion']??'');
if(!$tipo||!$nombre||!$email||!$desc){echo json_encode(['ok'=>false,'msg'=>'Tipo, nombre, email y descripción son obligatorios']);exit;}
if(!in_array($tipo,['producto','servicio','facturacion','entrega','otro'])){echo json_encode(['ok'=>false,'msg'=>'Tipo inválido']);exit;}
if(!filter_var($email,FILTER_VALIDATE_EMAIL)){echo json_encode(['ok'=>false,'msg'=>'Email inválido']);exit;}
$rad='RC-'.date('Ym').'-'.strtoupper(substr(md5(uniqid()),0,6));
$c=conectar();
$s=$c->prepare("INSERT INTO reclamos(numero_radicado,tipo,nombre_cliente,email_cliente,telefono_cliente,numero_factura,descripcion) VALUES(?,?,?,?,?,?,?)");
$s->bind_param('sssssss',$rad,$tipo,$nombre,$email,$telefono,$factura,$desc);
if($s->execute()){echo json_encode(['ok'=>true,'msg'=>'¡Reclamo radicado! ✅','numero_radicado'=>$rad]);}
else{echo json_encode(['ok'=>false,'msg'=>'Error: '.$s->error]);}
$s->close();$c->close();
?>
