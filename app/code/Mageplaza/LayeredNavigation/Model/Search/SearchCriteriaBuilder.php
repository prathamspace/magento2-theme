<?php
/**
 * Mageplaza
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Mageplaza.com license that is
 * available through the world-wide-web at this URL:
 * https://www.mageplaza.com/LICENSE.txt
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade this extension to newer
 * version in the future.
 *
 * @category    Mageplaza
 * @package     Mageplaza_LayeredNavigation
 * @copyright   Copyright (c) Mageplaza (https://www.mageplaza.com/)
 * @license     https://www.mageplaza.com/LICENSE.txt
 */

namespace Mageplaza\LayeredNavigation\Model\Search;

use Magento\Framework\Api\Search\SearchCriteria;
use Magento\Framework\Api\Search\SearchCriteriaBuilder as SourceSearchCriteriaBuilder;

/**
 * Builder for SearchCriteria Service Data Object
 */
class SearchCriteriaBuilder extends SourceSearchCriteriaBuilder
{
    /**
     * @var array
     */
    private $filters = [];

    /**
     * Builds the SearchCriteria Data Object
     *
     * @return SearchCriteria
     */
    public function create()
    {
        foreach ($this->filters as $filter) {
            $this->data[SearchCriteria::FILTER_GROUPS][] = $this->filterGroupBuilder->setFilters([])
                ->addFilter($filter)
                ->create();
        }

        return parent::create();
    }

    /**
     * Create a filter group based on the filter array provided and add to the filter groups
     *
     * @param \Magento\Framework\Api\Filter $filter
     * @return \Magento\Framework\Api\Search\SearchCriteriaBuilder
     */
    public function addFilter(\Magento\Framework\Api\Filter $filter)
    {
        $this->filters[] = $filter;
        return $this;
    }

    /**
     * @param $attributeCode
     *
     * @return $this
     */
    public function removeFilter($attributeCode)
    {
        foreach ($this->filters as $key => $filter) {
            if ($filter->getField() == $attributeCode) {
                unset($this->filters[$key]);
                break;
            }
        }

        return $this;
    }

    /**
     * @param $categoryIds
     *
     * @return $this
     */
    public function setCategoryFilter($categoryIds)
    {
        foreach ($this->filters as $key => $filter) {
            if ($filter->getField() === 'category_ids') {
                $filter->setValue($categoryIds);
                break;
            }
        }

        return $this;
    }

    /**
     * @return SearchCriteriaBuilder
     */
    public function cloneObject()
    {
        $cloneObject = clone $this;

        return $cloneObject;
    }

    /**
     * Return the Data type class name
     *
     * @return string
     */
    protected function _getDataObjectType()
    {
        return SearchCriteria::class;
    }
}
