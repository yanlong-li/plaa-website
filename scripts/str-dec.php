<?php
$str = '\237\130\164\237\148\132\235\161\156\236\130\172';

$str = ltrim($str,'\\');

$list = explode('\\',$str);

$newstr = '';
foreach ($list as $item){
    $newstr.=chr($item);
}

echo $newstr;