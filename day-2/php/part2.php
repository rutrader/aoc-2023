<?php

$inputFile = __DIR__ . '/../input.txt';

function calculate($inputFile) {
    $games = file($inputFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    $totalPower = 0;

    foreach ($games as $game) {
        $matches = [];
        if (preg_match('/Game (\d+): (.+)/', $game, $matches)) {
            $game = $matches[2];

            $rounds = explode(';', $game);
            $colors = [
                'red' => 0,
                'green' => 0,
                'blue' => 0,
            ];

            foreach ($rounds as $round) {
                $cubes = explode(',', $round);

                foreach ($cubes as $cube) {
                    preg_match('/(\d+)(.*)/', $cube, $matches);
                    $count = intval($matches[1]);
                    $color = trim($matches[2]);

                    $colors[$color] = max($colors[$color], $count);
                }
            }

            $power = $colors['red'] * $colors['green'] * $colors['blue'];
            $totalPower += $power;
        }
    }

    return $totalPower;
}

$totalPower = calculate($inputFile);

echo $totalPower . PHP_EOL;
