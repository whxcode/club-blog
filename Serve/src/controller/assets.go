package controller

import (
	"log"
	"net/http"
)

/**
* 运行静态资源文件
 */
func RunAssetsServe(path string, host string) {
	go func() {
		err := http.ListenAndServe(host, http.FileServer(http.Dir(path)))
		if err != nil {
			log.Fatalln(err)
		}
	}()
}
