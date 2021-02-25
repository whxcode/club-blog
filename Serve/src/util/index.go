package util

import (
	"net/http"
)

var Public = "D:\\react-app\\ClubBlog\\Serve\\src\\public" // 静态文件存储路径
var PublicImage = Public + "\\img\\"

func GetQuestValue(value *http.Request, args ...string) map[string]string {
	m := map[string]string{}
	for _, k := range args {
		m[k] = value.PostFormValue(k)
	}
	return m
}
