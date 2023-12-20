<?php

namespace Goodcatch\Modules\Core\Rules;

use Illuminate\Contracts\Validation\Rule;

class Database implements Rule
{


    /**
     * Determine if the validation rule passes.
     *
     * @param string $attribute
     * @param mixed $value
     * @return bool
     */
    public function passes ($attribute, $value)
    {
        return ! array_key_exists ($value, config ('database.connections'));
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message ()
    {
        return '数据库连接信息已存在于配置文件中';
    }
}
