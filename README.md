# Codyze action

This action prints "Hello World" or "Hello" + the name of a person to greet to the log.
In the future, it will actually run Codyze

## Inputs

### `directory`

**Required** The directory to scan. Default `"src/main/java"`.

### `markDirectory` 

The directory which contains the MARK files. It uses the built-in MARK files, if omitted.

### `version`

**Required** The version of Codyze to use.

## Outputs

### `time`

The time we greeted you.

## Example usage

```yaml
uses: Fraunhofer-AISEC/codyze@v2.1
with:
  directory: src/main/java
  markDirectory: src/main/mark
```
