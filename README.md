
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
This is what you want to print in console.
```


* maxLengthForDirectPrintObjectsAndArrays = Number/String;
```
When valueToConsoleLog is [] or {} this value define max length
above which content is shown in form of brief review

 min = 1,
 max = according to your common sense
 By default this value is set for 100.

```

* descriptionOfValue = Number/String
```
This is what console print before your valueToConsoleLog. e.g

2020/05/09 01:52:24: descriptionOfValue   valueToConsoleLog
```

Code recognize types and use predefined way of display
```
  ['good', 'bad', 'info', 'array', 'object', 'default']
  
  info : for most cases, white text
  bad : NaN & undefined values, red text
  good : greed text
  array/object : review and keys in yellow, values in white
  default: default console text color
 ```
Color can be use as one of a values maxLengthForDirectPrintObjectsAndArrays, descriptionOfValue.
Values maxLengthForDirectPrintObjectsAndArrays, descriptionOfValue are commutative.

 
## Examples

```
cs('your String', 'bad');
print in console your String in red
```
```
cs(NaN, 'good', "This is ") 
output in green: 
2020/05/10 02:42:17: This is   NaN 
```

```
cs(yourArray, 'info', "This is Array") 
output in white: 

2020/05/10 02:08:17: This is Array
Array Length: 7
[
  [0]: false
  [1]: 1,2,3,4
  [2]: Sun May 10 2020 02:08:17 GMT+0200 (GMT+02:00)
  [3]: iimmdpmencxwhprnibit
  [4]: null
  [5]: NaN
  [6]: 88
]
```

MaxLengthForDirectPrintObjectsAndArrays, descriptionOfValue are commutative.

cs(yourObject, 10, 'your description');
cs(yourObject, 'your description', 10);
```
output:
2020/05/10 02:08:17: your description
Object Length: 24
 Content Ratio:
        array: 5
        boolean: 3
        date: 2
        function: 1
        NaN: 2
        null: 2
        number: 1
        string: 7
        undefined: 1
```

### More examples

* Default operation on object:
```
cs(yourObject);
```
* Print in red
```
cs(yourObject, 'bad');
```
* If longer than  10 show review of content
```
cs(yourObject, 10);
```
* Add description
```
cs(yourObject, 'your description');
```
* Review of content for object longer than 10 and extra description
```
cs(yourObject, 10, 'your description');
cs(yourObject, 'your description', 10);
```
* Add description and print in red
```
cs(yourObject, 'bad', 'your description');
cs(yourObject, 'your description', 'bad');
```
* Review of content for object longer than 10 and print in red
```
cs(yourObject, 'bad', 10);
cs(yourObject, 10, 'bad');

```


## Author

* **Damian Laskowski** - [ddlaskowski](https://github.com/ddlaskowski)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

