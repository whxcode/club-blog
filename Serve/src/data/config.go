package data

type Mysql struct {
	Host     string `json:"host"`
	Port     string `json:"port"`
	User     string `json:"user"`
	Password string `json:"password"`
	Data     string `json:"data"`
	Other    string `json:"other"`
}
type Assets struct {
	Public string `json:"public"`
	Host string `json:"host"`
}
type Server struct {
	Addr string `json:"addr"`

}
type Config struct {
	Mysql  *Mysql  `json:"mysql"`
	Assets *Assets `json:"assets"`
	Server *Server `json:"server"`
}

var config *Config = nil

func CreateConfig() *Config {
	if config != nil {
		return config
	}
	config = &Config{}
	return config
}
