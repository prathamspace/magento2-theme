<?php
namespace Mageplaza\LayeredNavigation\Model\Config\Settings\General;

class Mode implements \Magento\Framework\Option\ArrayInterface
{
    public function toOptionArray()
    {
        return [
            ['value' => '1', 'label' => __('By Button')],
            ['value' => '2', 'label' => __('By Mouse Scrolling')]
        ];
    } 

    public function toArray()
    {
        return [
            '1' => __('By Button'),
            '2' => __('By Mouse Scrolling')
        ];
    }
}
