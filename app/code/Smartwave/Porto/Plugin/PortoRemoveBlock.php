<?php

namespace Smartwave\Porto\Plugin;

use Magento\Framework\Event\Observer;
use Magento\Framework\Event\ObserverInterface;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Store\Model\ScopeInterface;

class PortoRemoveBlock implements ObserverInterface
{
  protected $_scopeConfig;

  public function __construct
  (
      ScopeConfigInterface $scopeConfig
  )
  {
      $this->_scopeConfig = $scopeConfig;
  }

  public function execute(Observer $observer)
  {
    /** @var \Magento\Framework\View\Layout $layout */
    $layout = $observer->getLayout();
    $blockSidebarMenu = $layout->getBlock('sidebar.menu');
    $blockRelated = $layout->getBlock('catalog.product.related');
    if ($blockRelated) {
      $removeRelated = $this->_scopeConfig->getValue('porto_settings/product/move_related', ScopeInterface::SCOPE_STORE);
      if ($removeRelated) {
        $layout->unsetElement('catalog.product.related');
      }
    }
    if($blockSidebarMenu) {
      $header = $this->_scopeConfig->getValue('porto_settings/header/header_type', ScopeInterface::SCOPE_STORE);
      $leftmenu_enable = $this->_scopeConfig->getValue('porto_settings/header/leftmenu_enable', ScopeInterface::SCOPE_STORE);
      if($header != '25' || $leftmenu_enable == '0'){
        $layout->unsetElement('sidebar.menu');
      }
    }
  }
}
