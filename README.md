# hof-build
Performs build workflow for hof apps in prod and development

## Usage

Run a build by running `hof-build` from the command line in your project directory.

```
hof-build [task]
```

If no task is specified then all tasks will run.

It is recommended to alias `hof-build` to an npm script in your package.json.

## Tasks

* `browserify` - compiles client-side js with browserify
* `sass` - compiles sass
* `images` - copies images from ./assets/images directory to ./public/images
* `translate` - compiles translation files

## Watch

You can additionally run a `watch` task to start a server instance, which will automatically restart based on changes to files. This will also re-perform the tasks above when relevant files change.

By default files inside `node_modules` directories and dotfiles will not trigger a restart. If you want to include these files then you can set `--watch-node-modules` and `--watch-dotfiles` flags respectively.

### Local environment variables

You can load local environment variables from a file by passing an `--env` flag to `hof-build watch` and creating a `.env` file in your project root that defines your local variables as follows:

```
MY_LOCAL_ENVVAR=foo
MY_OTHER_ENVVAR=bar
```

_Note: `export` is not required, and values should not be quoted._

To load variables from a file other than `.env` you should pass the location of the file as a value on the `--env` flag.

```
hof-build watch --env .envdev
```

## Configuration

The default settings will match those for an app generated using [`hof-generator`](https://npmjs.com/hof-generator).

If a `hof.settings.json` file is found in the application root, then the `build` section of the settings file will be used to override [the default configuration](./config/defaults.js).

Alternatively you can define a path to a local config file by passing a `--config` option

```
hof-build --config /path/to/my/config.js
```

Any task can be disabled by setting its configuration to `false` (or any falsy value).

```js
module.exports = {
  browserify: false
};
```

### Configuration options

Each task has a common configuration format with the following options:

* `src` - defines the input file or files for the build task
* `out` - defines the output location of the built code where relevant
* `match` - defines the pattern for files to watch to trigger a rebuild of this task
* `restart` - defines if this task should result in a server restart

Additionally the server instance created by `watch` can be configured by setting `server` config. Available options are:

* `cmd` - defines the command used to start the server
* `extensions` - defines the file extensions which will be watched to trigger a restart
