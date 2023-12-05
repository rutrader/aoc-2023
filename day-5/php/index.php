<?php

$data = file('../input.txt', FILE_IGNORE_NEW_LINES);

$seeds = [];
$map = [];
$i = 0;

foreach ($data as $item) {
    if (substr($item, 0, 5) === 'seeds') {
        $seeds = explode(' ', substr($item, 7));
    } elseif (strpos($item, 'map') !== false) {
        $i++;
    } elseif ($item !== '') {
        $map[$i][] = explode(' ', $item);
    }
}

$min = PHP_INT_MAX;
foreach ($seeds as $seed) {
    $min = min($min, calc($seed, $map, 1));
}
echo $min . "\n";

$min = PHP_INT_MAX;
for ($i = 0; $i < count($seeds); $i += 2) {
    $seed_range = [[$seeds[$i], $seeds[$i + 1]]];
    calc2($seed_range, $map, 1);
    foreach ($seed_range as $seed) {
        $min = min($min, $seed[0]);
    }
}

// Answer: 214922730
echo $min . "\n";

// Recursive function for Part 1
function calc($seed, $map, $i) {
    $pos = $seed;
    foreach ($map[$i] as $mapper) {
        if ($seed >= $mapper[1] && $seed < $mapper[1] + $mapper[2]) {
            $pos = $mapper[0] + ($seed - $mapper[1]);
        }
    }

    if ($i === 7) {
        return $pos;
    }

    return calc($pos, $map, $i + 1);
}

// Recursive function for Part 2
function calc2(&$seeds, $map, $i) {
    $new_seeds = [];
    $rest_seeds = [];
    
    foreach ($map[$i] as $mapper) {
        $rest_seeds = [];
        
        foreach ($seeds as $seed) {
            if ($mapper[1] <= $seed[0] && $mapper[1] + $mapper[2] >= $seed[0] + $seed[1]) {
                // When the mapper begins before and ends after
                $new_seeds[] = [$seed[0] - $mapper[1] + $mapper[0], $seed[1]];
            } elseif ($mapper[1] <= $seed[0] && $mapper[1] + $mapper[2] >= $seed[0] && $mapper[1] + $mapper[2] < $seed[0] + $seed[1]) {
                // When the mapper begins before and ends before
                $new_seeds[] = [$seed[0] - $mapper[1] + $mapper[0], ($mapper[1] + $mapper[2]) - $seed[0]];
                $rest_seeds[] = [$mapper[1] + $mapper[2], ($seed[0] + $seed[1]) - ($mapper[1] + $mapper[2])];
            } elseif ($mapper[1] > $seed[0] && $mapper[1] <= $seed[0] + $seed[1] && $mapper[1] + $mapper[2] >= $seed[0] + $seed[1]) {
                // When the mapper begins after and ends after
                $rest_seeds[] = [$seed[0], $mapper[1] - $seed[0]];
                $new_seeds[] = [$mapper[0], $seed[1] - ($mapper[1] - $seed[0])];
            } elseif ($mapper[1] > $seed[0] && $mapper[1] + $mapper[2] < $seed[0] + $seed[1]) {
                // When the mapper begins after and ends before
                $rest_seeds[] = [$seed[0], $mapper[1] - $seed[0]];
                $new_seeds[] = [$mapper[0], $mapper[2]];
                $rest_seeds[] = [$mapper[1] + $mapper[2], ($seed[0] + $seed[1]) - ($mapper[1] + $mapper[2])];
            } else {
                // When the mapper doesn't move the seeds
                $rest_seeds[] = $seed;
            }
        }
        
        $seeds = $rest_seeds;
    }

    $seeds = array_merge($new_seeds, $rest_seeds);

    if ($i == 7) {
        return;
    } else {
        calc2($seeds, $map, $i + 1);
    }
}

// Answer: 148041808