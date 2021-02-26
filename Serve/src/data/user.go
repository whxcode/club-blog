package data
/**
* 用户表
 */
type User struct {
	Id         int    `json:"id" db:"id"`
	UserName   string `json:"username" db:"username"`
	Email    string `json:"email" db:"email"`
	Password   string `json:"password" db:"password"`
	About string `json:"about" db:"about"`
	Avatar string `json:"avatar" db:"avatar"`
	CreateTime string `json:"createTime" db:"create_time"`
	UpdateTime string `json:"updateTime" db:"update_time"`
}

