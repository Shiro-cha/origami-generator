# Joella Generator ;)

## Overview
CLI Template Joella Generator is a command-line tool that automates the creation of directory structures and files based on JSON or YAML configuration files. This helps developers standardize project structures efficiently.

## Features
- ✅ **Generate**: Create a directory structure from a JSON/YAML template.
- 🛠️ **Planned Features**:
  - Validation of configuration files.
  - Dry-run mode for previewing structure.
  - Environment variable support.
  - Advanced templating with placeholders.

## Installation
```sh
bun install -g C
```

## Usage
```sh
Joella Generator generate -c config.json 
```

### Example JSON Config
```json
{
  "root": "my_project",
  "structure": {
    "src": {
      "index.ts": "console.log('Hello, world!');"
    },
    "README.md": "# My Project"
  }
}
```

### Example YAML Config
```yaml
root: my_project
structure:
  src:
    index.ts: "console.log('Hello, world!');"
  README.md: "# My Project"
```

## Contributing
Contributions are welcome! Submit issues and pull requests on GitHub.

## License
MIT License.

