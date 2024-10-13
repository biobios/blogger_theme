# blogger_theme

## Overview
`blogger_theme` is a repository that provides a custom theme for Blogger blogs. It includes build scripts that support both multi-language localization and multi-file inclusion, making it easier to maintain and customize.

## Usage

1. Download the latest version of the theme from the [Releases page](https://github.com/biobios/blogger_theme/releases).
2. **Backup your current theme** before applying the new theme to ensure you can revert back if necessary.
3. Apply the downloaded theme to your Blogger site through the Blogger theme editor.

## Customization

Run the following command to build the theme:

```bash
make build
```

### Multi-file support

You can split your theme into smaller, modular files. In the `main.xml` file, use the following syntax to include other files:

```xml
<include file="filename" />
```

This will recursively replace the `<include>` directive with the contents of the specified file under `./src` : e.g., `./src/filename`.

### Multi-language support

For localization, use the syntax `i18n.key` in your theme files. These placeholders will be replaced with corresponding values based on the selected language file from the `./localization_def` folder.

#### Example: `./localization_def/japanese.properties`

```properties
key=値
reply=返信
comment=コメント
```

To add new language support, create a new .properties file in the `./localization_def` directory with appropriate translations for the keys.

Run the following command to list all keys used in the code:
    
```bash
make i18n_keys
```

## Contributing
- Pull requests (PRs) that propose design changes may not be accepted, as I want to design the theme to be my personal preference.
- However, PRs for new features, bug fixes, and additional localization are highly encouraged. Feel free to contribute!