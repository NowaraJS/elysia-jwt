# Changelog


## v1.2.0


### 🚀 Enhancements

- **🚀:** [Add issue templates for feature requests, bug reports, documentation, and help requests] ([0e8105a](https://github.com/Komiriko/template-package-npm/commit/0e8105a))
- **🚀:** Initialize bun package with basic structure and configurations ([7f032f7](https://github.com/Komiriko/template-package-npm/commit/7f032f7))

### 🧹 Refactors

- **🧹:** [Refactor TypeScript configuration files for clarity] ([0eb8f94](https://github.com/Komiriko/template-package-npm/commit/0eb8f94))
- **🧹:** [Refactor builder and index files for clarity] ([93abffa](https://github.com/Komiriko/template-package-npm/commit/93abffa))
- **🧹:** [disable minify, improve export,  update packages..] ([0d52b1e](https://github.com/Komiriko/template-package-npm/commit/0d52b1e))

### 📖 Documentation

- **📖:** [Add README.md for package template documentation] ([6cb23d9](https://github.com/Komiriko/template-package-npm/commit/6cb23d9))

### 📦 Build

- **📦:** [Reorganize scripts and update dependencies in package.json] ([05dff3e](https://github.com/Komiriko/template-package-npm/commit/05dff3e))
- **📦:** [Refactor TypeScript configuration and build process] - Updated TypeScript build configuration to use `tsconfig.build.json`. - Removed deprecated `tsconfig.dts.json` file. - Adjusted npm scripts to reference the new build configuration. - Enhanced clarity in `tsconfig.json` with improved comments. ([c862e31](https://github.com/Komiriko/template-package-npm/commit/c862e31))
- **📦:** [Update packages] ([8b38239](https://github.com/Komiriko/template-package-npm/commit/8b38239))

### 🦉 Chore

- **🦉:** [Replace GPL with MIT License in LICENSE file] ([1e5352f](https://github.com/Komiriko/template-package-npm/commit/1e5352f))
- **🦉:** [Add .gitignore and .npmignore files for project configuration] ([7cf1cbb](https://github.com/Komiriko/template-package-npm/commit/7cf1cbb))

### 🧪 Tests

- **🧪:** [Add unit tests for foo and PkgError classes] ([e89d1c7](https://github.com/Komiriko/template-package-npm/commit/e89d1c7))

### 🎨 Styles

- **🎨:** [Disable no-empty-object-type rule in ESLint config] ([75551bb](https://github.com/Komiriko/template-package-npm/commit/75551bb))
- **🎨:** [Change space indent to tab indent] ([ee0b318](https://github.com/Komiriko/template-package-npm/commit/ee0b318))

### 🤖 CI

- **🤖:** [Add GitHub Actions workflows for release management] ([74794f0](https://github.com/Komiriko/template-package-npm/commit/74794f0))
- **🤖:** [Refactor lint workflow for improved error handling] - Enhanced linting process to provide clearer output on lint errors. - Simplified the auto-fix mechanism and improved summary reporting. - Removed redundant checks and streamlined the commit process for lint fixes. ([149c8ef](https://github.com/Komiriko/template-package-npm/commit/149c8ef))
- **🤖:** [Add workflow_dispatch trigger to pull request checker] ([e7fb96d](https://github.com/Komiriko/template-package-npm/commit/e7fb96d))
- **🤖:** [Refactor CI workflows for simplicity and clarity] ([67de630](https://github.com/Komiriko/template-package-npm/commit/67de630))
- **🤖:** [Update CI workflows for improved permissions and structure] ## CI Changes - Added permissions to various workflows to specify access levels. - Refactored the `checker.yml` workflow name for clarity. - Introduced a new `deploy.yml` workflow for release and publish processes. - Removed outdated workflows `merge-dev.yml` and `merge-main.yml`. - Updated `integration-test.yml`, `lint.yml`, `unit-test.yml`, and `publish-npm.yml` to include permissions. ([3eef172](https://github.com/Komiriko/template-package-npm/commit/3eef172))
- **🤖:** [Add reusable rebase workflow for GitHub Actions] ## CI Changes - Introduced a new reusable workflow for rebasing branches. ## Description This commit adds a `rebase.yml` workflow that allows users to rebase branches easily by specifying the source and target branches. The workflow includes steps for checking out the branch and performing the rebase operation using Git commands. ([e7ccddb](https://github.com/Komiriko/template-package-npm/commit/e7ccddb))
- **🤖:** [Refactor GitHub Actions workflows for rebase handling] ## CI Changes - Removed the automatic rebase step from the create-github-release workflow. - Added a new input parameter `rebaseDevToMain` to the deploy workflow to control rebase behavior. - Introduced a conditional job to rebase the develop branch to main based on the new input. ## Description This commit refactors the GitHub Actions workflows to enhance control over the rebase process. The automatic rebase step has been removed from the release workflow, allowing for more flexible handling of branch updates. The deploy workflow now includes an input parameter that determines whether to rebase the develop branch to main, improving the overall workflow management. ([803fcfa](https://github.com/Komiriko/template-package-npm/commit/803fcfa))
- **🤖:** [Update rebase workflow to include secrets] ([b496294](https://github.com/Komiriko/template-package-npm/commit/b496294))

### ❤️ Contributors

- Komiroko <komiriko@pm.me>

