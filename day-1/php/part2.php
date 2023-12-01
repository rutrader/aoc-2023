<?php

$map = [
    'zero' => 0,
    'one' => 1,
    'two' => 2,
    'three' => 3,
    'four' => 4,
    'five' => 5,
    'six' => 6,
    'seven' => 7,
    'eight' => 8,
    'nine' => 9
];

function buildPattern($array)
{
    return '/(?=(\d|' . join('|', array_keys($array)) . '))/';
}

$linesArray = file('../input.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

$sum = 0;

foreach($linesArray as $line) {
    preg_match_all(buildPattern($map), $line, $matches);

    $first = $matches[1][0];
    $last = $matches[1][count($matches[1])-1];

    $firstAsDigit = intval(isset($map[$first]) ? $map[$first] : $first);
    $lastAsDigit = intval(isset($map[$last]) ? $map[$last] : $last);

    $sum += intval($firstAsDigit . $lastAsDigit);
}

echo $sum . PHP_EOL;