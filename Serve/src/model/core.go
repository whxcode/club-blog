package model

import (
	"Serve/src/data"
	"encoding/json"
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

// 读取配置文件
func init() {
	configFile := "D:\\react-app\\ClubBlog\\Serve\\src\\config\\index.json"
	fs, err := os.Open(configFile)
	if err != nil {
		log.Fatalln("未能找到配置文件")
		os.Exit(1)
		return;
	}
	config := data.CreateConfig()
	json.NewDecoder(fs).Decode(config)
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
	if code == 3 {
		r.Msg = `mysql inner error:` + arg[0].(string)
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
