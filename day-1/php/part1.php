<?php

$linesArray = file('../input.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

$sum = [];

foreach ($linesArray as $line) {
    $filteredNumber = filter_var($line, FILTER_SANITIZE_NUMBER_INT);
    $sum [] = $filteredNumber[0] . $filteredNumber[strlen($filteredNumber) - 1];
}

echo array_sum($sum);

// answer: 55477