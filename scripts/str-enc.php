<?php
$str = '키프로사';

//$str = ltrim($str,'\\');

//$list = explode('\\',$str);
$list   = str_split($str, 1);
$newstr = '';
foreach ($list as $item) {
    $newstr .= '\\' . ord($item);
}

echo $newstr;