<?php

$limits = [
	'red' => 12,
	'blue' => 14,
	'green' => 13
];

$result = [];

$games = file('../input.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

$pattern = '/(\d+ |blue|red|green)/';

$colors = [];

foreach($games as $index => $game) {
	$gameKey = $index+1;

	$colors[$index] = [];

	list($round, $cubes) = explode(": ", $game);

	preg_match_all('/\d+ (blue|red|green)/', $cubes, $matches);

	foreach($matches[0] as $value) {
		list($count, $color) = explode(" ", $value);

		if($limits[$color] >= $count) {
			$result[$gameKey] = true;
		} else {
			$result[$gameKey] = false;
			break;
		}
	}
}

echo "\n";

var_dump(array_sum(array_keys(array_filter($result, function($item) {
	return $item === true;
}))));

