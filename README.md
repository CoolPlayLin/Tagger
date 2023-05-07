# Tagger

A useful tool for tagging issues and pull_request

## Configure

### Sample

_Both yaml and JSON configuration files are supported_

- JSON

```json
[
  {
    "tag": "bug",
    "keywords": ["bug"]
  },
  {
    "tag": "enhancement",
    "keywords": ["documentation"]
  },
  {
    "tag": "help wanted",
    "keywords": ["help wanted"]
  }
]
```

- YAML

```yaml
- tag: bug
  keywords:
    - bug
- tag: enhancement
  keywords:
    - documentation
- tag: help wanted
  keywords:
    - help wanted
```

### Permissions

_You should write the relevant permission configuration of the workflow to provide sufficient permissions for actions_

- Actions

```yml
permissions:
  pull-requests: write
  issues: write
  contents: read
```

- Personal Token

```yaml
repo-token: ${{ secrets.PAT }}
```

> Note: If you don't specify a path, then it will automatically generate a configuration file, and the key and keyword of the configuration file are all tags

## Inputs

| Arguments   | Description                                 | Default         | Require |
| ----------- | ------------------------------------------- | --------------- | ------- |
| repo-token  | The GitHub token used to manage labels      | `github.token`  | No      |
| path        | The path to the configuration file          |                 | No      |
| default-tag | The label used when all labels do not match | `triage-needed` | No      |
