let config = {};

config.maxT = 45;
config.minT = -5;
config.deltaT = 1;

config.deltaP = 1;
config.minP = 150;
config.maxP = 1050;

// config.minTimeout = 1000 * 1;
// config.maxTimeout = 1000 * 5;
config.minTimeout = 1000;
config.maxTimeout = 5000;

config.maxH = 100;
config.minH = 5;
config.deltaH = 1;

config.maxM = 100;
config.minM = 5;
config.deltaM = 1;

config.maxQ = 100;
config.minQ = 10;
config.deltaQ = 1;



module.exports = config;
