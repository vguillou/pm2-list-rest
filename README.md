# pm2-list-rest

<a href="https://www.npmjs.com/package/pm2-list-rest"><img alt="npm" src="https://img.shields.io/npm/v/pm2-list-rest"></a>

_Module to expose `pm2 list` (process description list) as a REST API_

## Usage

#### Install or update

```pm2 install pm2-list-rest```


#### Change port (3999 by default)

```pm2 set pm2-list-rest:port 3999```

#### Call the REST API

```curl http://localhost:3999/pm2/list```

## Contribute

```sh
# Install dependencies
npm install

# Install the module
pm2 install .

# Test it
curl http://localhost:3999/pm2/list

# Check module logs
pm2 logs pm2-test

# Remove module
pm2 delete pm2-test
```

## License

[WTFPL License](https://github.com/vguillou/pm2-list-rest/blob/master/LICENSE.md)
