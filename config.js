var config = {};

config.pg = {};
config.pg.user = process.env.PG_USER || 'user';
config.pg.password = process.env.PG_PASSWORD || 'password';
config.pg.ip = process.env.PG_IP || 'localhost';
config.pg.db_name = process.env.PG_DB_NAME || 'mydb';

config.hubdb = {};
config.hubdb.branch = process.env.HUBDB_BRANCH || 'db';
config.hubdb.username = process.env.HUBDB_USERNAME || 'mapbox';
config.hubdb.access_token = process.env.HUBDB_ACCESS_TOKEN || null;
config.hubdb.repo = process.env.HUBDB_REPO || 'stickshift';

config.port = 3002;

module.exports = config;