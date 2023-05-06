# Tagger

A useful tool for tagging issues and pull_request

## Configure

- Example Configuration File

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

- Permission

```yml
permissions:
  pull-requests: write
  issues: write
  contents: read
```

> Note: If you don't specify a path, then it will automatically generate a configuration file, and the key and keyword of the configuration file are all tags

## Inputs

| Arguments         | Description                                    | Default                | Require |
| ----------------- | ---------------------------------------------- | ---------------------- | ------- |
| repo-token        | The GitHub token used to manage labels         | `github.token` | No      | 
| path              | The path to the configuration file             |                        | No      |
| default-tag | The label used when all labels do not match    | `triage-needed` | No      |
