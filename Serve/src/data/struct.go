package data

/**
* 公用列表
 */
type CommonList struct {
	PageNo     int         `json:"pageNo"`
	PageSize   int         `json:"pageSize"`
	TotalPage  int         `json:"totalPage"`
	TotalCount int         `json:"totalCount"`
	Data       interface{} `json:"data"`
}

/**
* 公用列表
 */
type CommonListWrap struct {
	Result *CommonList `json:"result"`
}
