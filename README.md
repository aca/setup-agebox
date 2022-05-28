# setup-agebox

Sets up https://github.com/slok/agebox, for use in github action workflow.

## Usage
```
steps:
    - uses: actions/checkout@v3
    - uses: aca/setup-agebox@v1
    - run: agebox --version
```
