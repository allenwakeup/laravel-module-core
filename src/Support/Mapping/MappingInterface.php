<?php

namespace Goodcatch\Modules\Core\Support\Mapping;

interface MappingInterface
{

    public function has(int $left, int $right);

    public function find(int $leftId);
}