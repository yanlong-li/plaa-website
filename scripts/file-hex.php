<?php

$str = file_get_contents("netmission0.bai");

$data = array_map('bin2hex', str_split($str));

file_put_contents('out.txt', $data);
