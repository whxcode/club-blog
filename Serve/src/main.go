package main

import (
	"Serve/src/controller"
	"Serve/src/data"
	"Serve/src/model"
	_ "database/sql"
	_ "github.com/go-sql-driver/mysql"
	"log"
	"net/http"
)

func main() {

	handler := data.CreateServe()
	config := data.CreateConfig()
	model.MyServe = handler
	serve := &http.Server{
		Addr: config.Server.Addr,
		Handler: handler,
	}


	handler.AddPost("/login",controller.Login)

	// 上传文件
	handler.AddPost("/uploadFile", controller.UploadFile)

	// 运行静态资源文件
	controller.RunAssetsServe(config.Assets.Public, config.Assets.Host)
	err := serve.ListenAndServe()
	if err != nil {
		log.Fatalln(err)
	}
}
