<?php

$content = file_get_contents(__DIR__ . '/mime.types');
$lines   = array_filter(explode("\n", $content));
$list    = [];
foreach ($lines as $line) {
    $types = array_filter(explode(" ", trim($line, ';')));

    $mimeType = array_shift($types);

    foreach ($types as $type) {
        $list[strtolower($type)] = $mimeType;
    }
}

return $list;
