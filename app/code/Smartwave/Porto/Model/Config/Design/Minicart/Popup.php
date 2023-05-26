<?php
namespace Smartwave\Porto\Model\Config\Design\Minicart;

class Popup implements \Magento\Framework\Option\ArrayInterface
{
    public function toOptionArray()
    {
        return [
            ['value' => '1', 'label' => __('Default')],
            ['value' => '2', 'label' => __('Canvas Popup')]
        ];
    }

    public function toArray()
    {
        return [
            '1' => __('Default'),
            '2' => __('Canvas Popup')
        ];
    }
}
