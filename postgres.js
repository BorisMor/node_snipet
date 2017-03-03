var pg = require('pg');

class dbPostgres {

    // Настройки присоединения к базе данных
    get _config() {
        return {
            user: 'postgres', //env var: PGUSER 
            database: 'postgres', //env var: PGDATABASE 
            password: 'postgres', //env var: PGPASSWORD 
            host: 'localhost', // Server hosting the postgres database 
            port: 5432, //env var: PGPORT 
            max: 10, // max number of clients in the pool 
            idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed 
        };
    }

    /**
     * Получить pool
     */
    get _promisePool() {
        var self = this;
        return new Promise(function(resolve, reject) {
            var pool = new pg.Pool(self._config);
            pool.on('error', function(err, client) {
                reject(error, 'pool');
            });
            resolve(pool);
        });
    }

    query(sql, sqlParam) {
        var self = this;
        var sqlParam = (typeof sqlParam == "undefined") ? [] : sqlParam;

        return new Promise(function(resolve, reject) {
            self._promisePool.then(function(pool) {
                pool.connect(function(error, client, done) {
                    if (error) {
                        reject(error, 'connect');
                        return;
                    }

                    client.query(sql, sqlParam, function(error, result) {
                        done();

                        if (error) {
                            reject(error, 'query');
                        } else {
                            resolve(result);
                        }
                    });
                });
            }, function(error) {
                reject(error, 'pool');
            })
        });
    }
}

var db = new dbPostgres();
db.query('select t.id from test').then(function(result) {
    console.log(result.rows);
}, function(error, whereErr) {
    console.log(whereErr, error.message);
});