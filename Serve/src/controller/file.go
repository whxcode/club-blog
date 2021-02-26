package controller

import (
	"Serve/src/data"
	"Serve/src/model"
	"bufio"
	"net/http"
	"os"
	"path"
	"strconv"
	"time"
)

type File struct {
	Url      string `json:"url"`
	FileName string `json:"file_name"`
	Size     int64  `json:"size"`
	Ext      string `json:"ext"`
}

func UploadFile(w http.ResponseWriter, r *http.Request) {
	config := data.CreateConfig()
	r.ParseMultipartForm(1024 << 24)
	file, head, _ := r.FormFile("file")
	ext := path.Ext(head.Filename)
	i := time.Now().UnixNano()
	ii := strconv.FormatInt(i, 10)
	url := config.Assets.Public + "/img" + ii + ext
	fs, _ := os.Create(url)
	bufio.NewReader(file).WriteTo(fs)
	defer fs.Close()
	defer file.Close()
	model.Send(w, 0, &File{
		Url:      `http://127.0.0.1:8009/img/` + ii + ext,
		Ext:      ext,
		Size:     head.Size,
		FileName: head.Filename,
	})
}