package data

import (
	"net/http"
	"strings"
)
/*
* 服务器
**/
type MyServe struct {
	W    http.ResponseWriter
	R    *http.Request
	post map[string]http.HandlerFunc
	get  map[string]http.HandlerFunc
}



func (m *MyServe) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	method := strings.ToUpper(r.Method)
	m.R = r
	m.W = w

	if method == "POST" {
		fn, ok := m.post[r.URL.Path]
		if ok {
			fn(w, r)
		} else {
			// 404
		}
	} else if method == "GET" {
		fn, ok := m.get[r.URL.Path]
		if ok {
			fn(w, r)
		} else {
			// 404
		}
	}

}
func (m *MyServe) AddPost(url string, fn http.HandlerFunc) {
	m.post[url] = fn
}
func (m *MyServe) AddGet(url string, fn http.HandlerFunc) {
	m.get[url] = fn
}

func CreateServe() *MyServe {
	return &MyServe{
		get:  map[string]http.HandlerFunc{},
		post: map[string]http.HandlerFunc{},
	}
}
