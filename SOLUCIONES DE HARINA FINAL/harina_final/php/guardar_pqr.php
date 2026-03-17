<?php
require_once 'conexion.php';
if($_SERVER['REQUEST_METHOD']!=='POST'){echo json_encode(['ok'=>false,'msg'=>'Método no permitido']);exit;}
$d=json_decode(file_get_contents('php://input'),true);
$tipo=trim($d['tipo_pqr']??'');
$nombre=trim($d['nombre_solicitante']??'');
$email=trim($d['email_solicitante']??'');
$tel=trim($d['telefono']??'');
$ced=trim($d['cedula']??'');
$desc=trim($d['descripcion']??'');
if(!$tipo||!$nombre||!$email||!$ced||!$desc){echo json_encode(['ok'=>false,'msg'=>'Todos los campos obligatorios son requeridos']);exit;}
if(!in_array($tipo,['peticion','queja','recurso'])){echo json_encode(['ok'=>false,'msg'=>'Tipo PQR inválido']);exit;}
if(!filter_var($email,FILTER_VALIDATE_EMAIL)){echo json_encode(['ok'=>false,'msg'=>'Email inválido']);exit;}
$num='PQR-'.date('Ym').'-'.strtoupper(substr(md5(uniqid()),0,6));
$fl=date('Y-m-d',strtotime('+15 days'));
$c=conectar();
$s=$c->prepare("INSERT INTO pqr(numero_pqr,tipo,nombre_solicitante,email_solicitante,telefono,cedula,descripcion,fecha_limite) VALUES(?,?,?,?,?,?,?,?)");
$s->bind_param('ssssssss',$num,$tipo,$nombre,$email,$tel,$ced,$desc,$fl);
if($s->execute()){echo json_encode(['ok'=>true,'msg'=>'¡PQR radicada! 📋','numero_pqr'=>$num,'fecha_limite'=>$fl]);}
else{echo json_encode(['ok'=>false,'msg'=>'Error: '.$s->error]);}
$s->close();$c->close();
?>
