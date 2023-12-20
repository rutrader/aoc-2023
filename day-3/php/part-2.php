<?php

$data = file(__DIR__.'/../input.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

$numbers = [];
$gears = [];

foreach ($data as $row => $line) {
    preg_match_all('/\d+/', $line, $matches, PREG_OFFSET_CAPTURE);
    foreach ($matches[0] as $number) {
        $numbers[] = ['row' => $row, 'col' => $number[1], 'value' => $number[0]];
    }
}

$width = strlen($data[0]);
$height = count($data);
$gears = [];

foreach ($numbers as $number) {
    $counted = false;

    $start = max(0, $number['col'] - 1);
    $end = min($width, $number['col'] + strlen($number['value']) + 1);
    $length = $end - $start;

    for ($row = max(0, $number['row'] - 1); $row <= min($height - 1, $number['row'] + 1); $row++) {
        $substr = substr($data[$row], $start, $length);

        preg_match_all('/\*/', $substr, $gearMatches, PREG_OFFSET_CAPTURE);
        foreach ($gearMatches[0] as $gear) {
            $index = $row . '_' . ($start + $gear[1]);
            $gears[$index][] = $number['value'];
        }
    }
}

$gearRatios = 0;
foreach ($gears as $key => $gearNumbers) {
    if (count($gearNumbers) == 2) {
        $gearRatios += array_product($gearNumbers);
    }
}

echo $gearRatios . PHP_EOL;

