# Codyze action

This action prints "Hello World" or "Hello" + the name of a person to greet to the log.
In the future, it will actually run Codyze

## Inputs

### `directory`

**Required** The directory to scan. Default `"src/main/java"`.

## Outputs

### `time`

The time we greeted you.

## Example usage

uses: Fraunhofer-AISEC/codyze@v1
with:
  directory: src/main/java
