package model

import (
	"Serve/src/data"
	"encoding/json"
	"flag"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	"log"
	"math"
	"net/http"
	"os"
	"strconv"
	"strings"
)

var Db *sqlx.DB = nil
var MyServe *data.MyServe

//
var _configFile = flag.String("c","","请输入配置文件")
// 读取配置文件
func init() {
		flag.Parse()
	var configFile = ""
	if(*_configFile == "") {
		configFile = "D:\\react-app\\ClubBlog\\Serve\\src\\config\\index.json"
	} else {
		configFile = *_configFile
	}


	// fmt.Println("path:",configFile)
	fs, err := os.Open(configFile)
	if err != nil {
		log.Fatalln("未能找到配置文件")
		os.Exit(1)
		return;
	}
	config := data.CreateConfig()
	json.NewDecoder(fs).Decode(config)
	// b,_ := json.MarshalIndent(config,""," ")
	// fmt.Println(string(b))

	dsn := strings.Join([]string{config.Mysql.User, ":", config.Mysql.Password, "@tcp", "(",
		config.Mysql.Host, ":", config.Mysql.Port, ")", "/", config.Mysql.Data, config.Mysql.Other,
	}, "")
	dbs, err := sqlx.Connect("mysql", dsn)
	if err != nil {
		log.Fatalln(err)
	}
	Db = dbs
}

/*
* code
 */
var codeMap = map[int]string{
	0: "成功",
	1: "为能找到该用户",
	2: "不能删除该角色",
	3: "sql error",
	4: "用户已存在",
}

type Response struct {
	Code int         `json:"code"`
	Msg  interface{} `json:"msg"`
	Data interface{} `json:"data"`
}

func CommonList(w http.ResponseWriter, r *http.Request, record interface{}, sql string, count string, argFn ...func(data interface{}) interface{}) {
	pageNo, _ := strconv.Atoi(r.PostFormValue("pageNo"))
	pageSize, _ := strconv.Atoi(r.PostFormValue("pageSize"))
	Select(record, sql+` limit ?,?`, func() {
		row, _ := Db.Query(count)
		totalCount := 0
		for row.Next() {
			row.Scan(&totalCount)
		}

		go func() {
			row.Close()
		}()

		for _, v := range argFn {
			record = v(record)
		}

		d := &data.CommonList{
			PageNo:     pageNo,
			PageSize:   pageSize,
			Data:       record,
			TotalCount: totalCount,
			TotalPage:  int(math.Ceil(float64(totalCount) / float64(pageSize))),
		}
		list := &data.CommonListWrap{
			Result: d,
		}
		Send(w, 0, &list)
	}, (pageNo-1)*pageSize, pageSize)

}

func Send(w http.ResponseWriter, code int, arg ...interface{}) {
	r := &Response{
		Code: code,
		Data: arg[0],
		Msg:  codeMap[code],
	}
	if len(arg) > 1 {
		r.Msg = arg[1]
	}

	json.NewEncoder(w).Encode(r)
}

func Select(receiver interface{}, sql string, fn func(), args ...interface{}) error {
	err := Db.Select(receiver, sql, args...)
	if err != nil {
		Send(MyServe.W, 3, err.Error())
	} else {
		fn()
	}
	return err
}
