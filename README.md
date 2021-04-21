# Codyze action

This repository contains a GitHub Action that runs Codyze. It can be used to check your code either against the pre-defined MARK policies that are part of Codyze or against a custom set of MARK policies.

## Inputs

### `directory`

**Required** The directory to scan. Default `"src/main/java"`.

### `markDirectory` 

The directory which contains the MARK files. It uses the built-in MARK files, if omitted.

### `version`

**Required** The version of Codyze to use. Defaults to the latest release of Codyze.

## Outputs

### `time`

The time we greeted you.

## Example usage

```yaml
uses: Fraunhofer-AISEC/codyze@v2.2
with:
  directory: src/main/java
  markDirectory: src/main/mark
```
