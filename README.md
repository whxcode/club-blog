## club-blog 个人博客
```angular2html
时间 2021/02/22 - 至今
ui 设计图是从国外找的免费素材
使用 React + hooks + typescript。
```
## [预览地址](http://mb.1flove.com:9003) http://mb.1flove.com:9003/
### 
```angular2html
1、git clone https://github.com/whxcode/club-blog.git
2、yarn or npm i
3、run serve
```

## web 端
    1、登录页面的已对接后端对接
    2、其他静态页面已经开发的差不多了，可能会存在小瑕疵 后期优化.
##  服务端 /Serve 目录
    使用 go 语言编写服务端相关业务
    1、已经用户登录接口
        默认用户第一次登录会直接创建该用户
        如果账号有冲突会提示 ’账号已存在或者密码不对‘，因为没有注册功能。
    2、在编译成可执行文件后运行程序需要指定 配置文件(json 格式)
        具体配置可以参考 /Serve/src/config/index.json 文件
        
        运行程序
            ./execute -c config-path
