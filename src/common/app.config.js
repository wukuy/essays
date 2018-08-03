const dev = {
	host: 'http://localhost:4000'
};
const prod = {
	host: 'http://api.wukuy.cn'
};

let config;
if (process.env.NODE_ENV === 'development') {
	config = dev;
} else if (process.env.NODE_ENV === 'production') {
	config = prod;
}

export default config;
