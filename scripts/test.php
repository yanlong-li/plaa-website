<?php
$str  = str_split('35303431373332353932373039333139333133', 2);
$data = '';
foreach ($str as $item) {
    if(strlen($item)<2){
        continue;
    }
    $data .= hex2bin($item);
}


var_dump($data);