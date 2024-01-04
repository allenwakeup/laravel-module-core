<?php

namespace Goodcatch\Modules\Core\Support\Mapping;

interface MappingInterface
{

    /**
     * has mapping that left model id to right model id
     * @param int $left
     * @param int $right
     * @return mixed
     */
    public function has(int $left, int $right);

    /**
     * has any one of mapping that left model id to right model id
     *
     * @param $left mixed single or multiple left model id
     * @param $right mixed single or multiple right model id
     * @return mixed
     */
    public function hasAny($left, $right);

    /**
     * get relations for model by model id
     *
     * @param int $leftId
     * @return mixed
     */
    public function find(int $leftId);
}