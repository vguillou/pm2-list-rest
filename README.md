# pm2-list-rest

<a href="https://www.npmjs.com/package/pm2-list-rest"><img alt="npm" src="https://img.shields.io/npm/v/pm2-list-rest"></a>

_Module to expose `pm2 list` (process description list) as a REST API_

## Usage

#### Install or update

```pm2 install pm2-list-rest```

#### Call the REST API

```curl http://localhost:3999/pm2/list```

#### Options

- Change port (Default is `3999`)
  
  ```pm2 set pm2-list-rest:port 3999```

- Exclude processes by name (comma separated list. Default is `''`)
  
  ```pm2 set pm2-list-rest:exclude-processes 'pm2-list-rest, other-excluded-process'```

- Include a subset of `pm2_env` properties only (comma separated list. Default is `''`, which includes all properties)
  
  ```pm2 set pm2-list-rest:include-pm2-env-properties 'node_version, version, unstable_restarts'```

- Good defaults:

  ```sh
  pm2 set pm2-list-rest:exclude-processes 'pm2-list-rest'
  pm2 set pm2-list-rest:include-pm2-env-properties 'prev_restart_delay, exit_code, node_version, version, unstable_restarts, restart_time, created_at, pm_uptime, status,instances, exec_mode, pm_exec_path, max_memory_restart, merge_logs, autorestart, kill_retry_time, watch'
  ```

## Contribute

```sh
# Install dependencies
yarn install

# Install the module
pm2 install .

# Test it
curl http://localhost:3999/pm2/list

# Check module logs
pm2 logs pm2-list-rest

# Remove module
pm2 delete pm2-list-rest
```

## License

[WTFPL License](https://github.com/vguillou/pm2-list-rest/blob/master/LICENSE.md)
