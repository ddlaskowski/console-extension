
# Node.js console-substitute

Console.log() substitute for Node.js a module. Useful as a part of REST API from early development to manage released project.

## Getting Started

```
const consoleSubstitute = require('./console-substitute.js');
const cs = consoleSubstitute.consoleSub;

cs(valueToConsoleLog, maxLengthForDirectPrintObjectsAndArrays, descriptionOfValue);
```

where

* valueToConsoleLog = all types; 
```
Code recognize types and use predefined way of display
```

* maxLengthForDirectPrintObjectsAndArrays = Number or String;

* descriptionOfValue = Number or String;

for maxLengthForDirectPrintObjectsAndArrays




## Examples

```
valueToConsoleLog = someArray; 
maxLengthForDirectPrintObjectsAndArrays = 300;
descriptionOfValue;

output: 
2020/05/09 02:35:34:
arrayLength: 1825
 [0]: Sat May 09 2020 02:35:33 GMT+0200 (GMT+02:00)
  .
  .
  .
[1824]: 1,2,3,4
 Content Ratio:
        array: 271
        boolean: 286
        date: 138
        function: 140
        NaN: 144
        null: 140
        object: 130
        string: 424
        undefined: 152
```


## Author

* **Damian Laskowski** - [ddlaskowski](https://github.com/ddlaskowski)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

