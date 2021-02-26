package controller

import (
	"Serve/src/data"
	"Serve/src/model"
	"net/http"
)

func Login(w http.ResponseWriter, r *http.Request) {
	 username := r.PostFormValue("username")
	 password := r.PostFormValue("password")

	sql := `select * from users where username = ? and password = ?`
	users := &[]*data.User{}
	err := model.Db.Select(users, sql, username, password)
	// 找到用户直接返回
	if len(*users) != 0 {
		model.Send(w, 0, (*users)[0])
		return
	}

	newUser := &data.User{
		UserName: username,
		Email:    username,
		Password: password,
		About:    "很懒，什么都没有说",
		Avatar:   "",
	}

	insertUser := "insert into users(username,email,password,about,avatar) values(?,?,?,?,?)"
	_, err = model.Db.Query(insertUser, newUser.UserName, newUser.Email, newUser.Password, newUser.About, newUser.Avatar)
	if err != nil {
		model.Send(w, 3, err)
		return
	}
	// 新增用户并返回
	model.Send(w, 0, newUser)
}
