<?php

namespace app\common\bean;

class Page
{

    /**
     * 当前页
     */
    private $curPage;

    /**
     * 下页
     */
    private $nextPage;

    /**
     * 上页
     */
    private $prePage;

    /**
     * 每页显示的最大记录数
     */
    private $maxSize;

    /**
     * 总页数
     */
    private $pageCnt;

    /**
     * 查询的记录数
     */
    private $recordCnt;

    /**
     * 获取当前页
     * @return mixed
     */
    public function getCurPage()
    {
        return $this->curPage;
    }

    /**
     * 获取下一页
     * @return mixed
     */
    public function getNextPage()
    {
        return $this->nextPage;
    }


    /**
     * 获取上一页
     * @return mixed
     */
    public function getPrePage()
    {
        return $this->prePage;
    }


    /**
     * 获取每页显示的最大记录数
     * @return mixed
     */
    public function getMaxSize()
    {
        return $this->maxSize;
    }

    /**
     * 设置每页显示的最大记录数
     * @param $maxSize
     */
    public function setMaxSize($maxSize)
    {
        $this->maxSize = $maxSize;
    }

    /**
     * 获取总页数
     * @return mixed
     */
    public function getPageCnt()
    {
        return $this->pageCnt;
    }

    /**
     * 设置总页数
     * @param $pageCnt
     */
    public function setPageCnt($pageCnt)
    {
        $this->pageCnt = $pageCnt;
    }

    /**
     * 获取查询到的记录数
     * @return mixed
     */
    public function getRecordCnt()
    {
        return $this->recordCnt;
    }

    /**
     * 设置查询到的记录数
     * @param $recordCnt
     */
    public function setRecordCnt($recordCnt)
    {
        $this->recordCnt = $recordCnt;
    }

    /**
     * 初始化分页数据
     * @param $curPage
     * @param $maxSize
     * @param $recordCnt
     */
    public function init($curPage, $maxSize, $recordCnt)
    {
        $this->curPage = $curPage;
        $this->maxSize = $maxSize;
        $this->recordCnt = $recordCnt;

        // 计算总页数
        $this->pageCnt = $this->getMaxPageNum($recordCnt, $maxSize);

        // 计算上页 下页
        $this->update($curPage);
    }


    /**
     * 获取最大页面数量
     * @param $recordCnt 总记录数量
     * @param $maxSize 每页显示的最大记录数量
     * @return int
     */
    public function getMaxPageNum($recordCnt, $maxSize)
    {
        return (int)($recordCnt / $maxSize + ($recordCnt % $maxSize == 0 ? 0 : 1));
    }

    /**
     * 获取记录开始位置
     * @return int
     */
    public function getBeginIndex()
    {
        return (int)(($this->curPage - 1) * $this->maxSize);
    }

    /**
     * 计算上页、下页
     * @param $curPage
     */
    private function update($curPage)
    {
        // 计算上页
        if ($curPage > 1) {
            $this->prePage = $curPage - 1;
        } else {
            $this->prePage = 1;
        }

        // 计算下页
        if ($curPage < $this->pageCnt) {
            $this->nextPage = $curPage + 1;
        } else {
            $this->nextPage = $this->pageCnt;
        }
    }
}

