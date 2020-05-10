var consoleLogUtility = {
	colors: { //Text color
		good: "\033[0;32m",
		bad: "\033[0;31m",
		info: "\033[0;37m",
		object: "\033[0;33m",
		array: "\033[0;33m",
		default: "\033[0;39m"
	},
	//length of Object(Array) printed direct in console log. Length over that create short sumup of content 
	defaultLengthForDirectPrint: 100,
	//extraDescription is a value shown as a first
	extraDescription: false,
	outputStringType: "\033[0;39m",
	consoleLog: function(mainContent, contentColor){ //main function 
		//define from extraDescription or leave empty string for description before mainContent
		var description = "";
		console.log(consoleLogUtility.outputStringType);
		if (consoleLogUtility.outputStringType === consoleLogUtility.colors.default && contentColor)
		{
			consoleLogUtility.outputStringType = consoleLogUtility.colors[contentColor];
		}
		if (consoleLogUtility.extraDescription && typeof consoleLogUtility.extraDescription === "string")
		{
			description = consoleLogUtility.outputStringType+consoleLogUtility.extraDescription + "\t";
		}
		//output ready console log 
		return console.log(consoleLogUtility.outputStringType + consoleLogUtility.getDateTime()+": " + description + mainContent + consoleLogUtility.colors.default);	
	},
	//recognize extra arguments called to exported function
	recognizeExtraArgument: (inputArgument) => {
		//if arg is a number set it for new lenght for direct print objects
		if (inputArgument && typeof inputArgument === "number" && !isNaN(inputArgument) &&  parseInt(inputArgument)>0)
		{
			consoleLogUtility.defaultLengthForDirectPrint = inputArgument;
			return true;
		}
		//if is a string check for possibility it's a one of defined colors for console.log
		else if (inputArgument && typeof inputArgument === "string" && consoleLogUtility.colors[inputArgument])
		{//while that's true print content in defined color
			consoleLogUtility.outputStringType = consoleLogUtility.colors[inputArgument];
			return true;
		}
		else if (inputArgument && typeof inputArgument === "string" && !consoleLogUtility.colors[inputArgument])
		{//when it's not a number and not a color treat it as extraDescription 
			consoleLogUtility.extraDescription = inputArgument;
			return true;				
		}
		else
		{//inputArgument don't fit to any pattern, didn't use it
			return false;
		}
	},
	arrayToString: (inputArray) => {//do operation on array
		setColor = () => { //set output color for 'array' if isn't defined different as inputArgument
			if (consoleLogUtility.outputStringType !== consoleLogUtility.colors.default)
			{
				return consoleLogUtility.outputStringType;
			}
			else
			{
				consoleLogUtility.outputStringType = consoleLogUtility.colors.array;
				return consoleLogUtility.colors.array;
			}
		}
		let color = setColor();
		//{aboutArray} content all information about processing Array
		let aboutArray = {};
		aboutArray.array = inputArray; //array itself
		aboutArray.arrayLength = aboutArray.array.length; //length
		if (aboutArray.arrayLength <= consoleLogUtility.defaultLengthForDirectPrint)
		{//when Array isn't longer than defaultLengthForDirectPrint fancy print it in console
			returnArrayValues = () => {
				let outputString = "\n"+ color + "[";
					for (var i = 0; i <= aboutArray.arrayLength-1; i++) {				
						outputString = outputString + "\n\t"+ color + "[" + i + "]: " + consoleLogUtility.colors.info + aboutArray.array[i];
					}
				outputString = outputString + "\n"+color+"]";
				return outputString;
			}
			let outputString = "\n"+color + "Array Length: " + aboutArray.arrayLength + returnArrayValues();
			return outputString;
		}
		else
		{	//when []length is over defaultLengthForDirectPrint collect more info about array
			aboutArray.firstValue = aboutArray.array[0];
			aboutArray.lastValue = aboutArray.array[aboutArray.array.length-1];
			aboutArray.typesInside = aboutArray.array.map((value, index)=>{
				return typeof value;
			});
			aboutArray.countTypesRatio = (inputArray) => {//count each type of values for summary
				let typesRatioObject = {array: 0, boolean: 0, date: 0, function: 0, NaN: 0, null: 0, number: 0, object: 0, string: 0, undefined: 0};
				for (var i = aboutArray.arrayLength - 1; i >= 0; i--) {
					if (inputArray[i] === "object")
					{
						if (Array.isArray(aboutArray.array[i]) === true)
						{
							++typesRatioObject.array;
						}
						else if (aboutArray.array[i] === null)
						{
							++typesRatioObject.null;
						}
						else if (aboutArray.array[i] instanceof Date)
						{
							++typesRatioObject.date;
						}
						else
						{							
							++typesRatioObject.object;
						}
					}
					else if (inputArray[i] === "number")
					{
						if (isNaN(aboutArray.array[i]))
						{
							++typesRatioObject.NaN;
						}
						else
						{
							++typesRatioObject[inputArray[i]];
						}
					}
					else
					{
						++typesRatioObject[inputArray[i]];
					}									
				}
				return typesRatioObject;
			}
		};
		aboutArray.typesRatio = aboutArray.countTypesRatio(aboutArray.typesInside);
		aboutArray.createOutputString = (typesRatio) =>
		{//do OutputString from collected information about []
			createTypesReview = (typesRatio) => {
				let contentRatioString = "\n"+color + " Content Ratio:";
				for (let [key, value] of Object.entries(typesRatio)) {
					if (value !== 0)
					{
		  			contentRatioString = contentRatioString + "\n"+color + "\t"+key+": " +value;
		  		}
				}			
				return contentRatioString;
			}
			//create brief review from collected data
			let arrayBrief = "\n"+color+ "arrayLength: " + aboutArray.arrayLength 
			+ "\n"+color+ " [0]: " + aboutArray.firstValue 
			+ "\n"+color+ "  . " 
			+ "\n"+color+ "  . " 
			+ "\n"+color+ "  . " 
			+ "\n"+color+ "["+ (aboutArray.arrayLength-1) + "]: " + aboutArray.lastValue
			let typesReview = createTypesReview(typesRatio);
			let outputString = arrayBrief	+ typesReview;
			return outputString;
		};
		//finnal string 
		let outputString = aboutArray.createOutputString(aboutArray.typesRatio);
		return outputString;
	},
	objectToString: (inputObject) => { //do operations on object
		setColor = () => { //set output color for 'object' if isn't defined different as inputArgument
			if (consoleLogUtility.outputStringType !== consoleLogUtility.colors.default)
			{
				return consoleLogUtility.outputStringType;
			}
			else
			{
				consoleLogUtility.outputStringType = consoleLogUtility.colors.object;
				return consoleLogUtility.outputStringType;
			}
		}
		let color = setColor();
		let aboutObject = {}; //{aboutObject} content all information about processing Object
		aboutObject.object = inputObject; //object itself
		aboutObject.countObjectLength = (inputObject) => {
		//do math to get object length
			let counter = 0;
			for (let [key, value] of Object.entries(inputObject)) {
	  		++counter;
			}
			return counter;
		};
		//define length and decide if it's more than default lenght for direct print in console or collect more data for breif
		aboutObject.objectLength = aboutObject.countObjectLength(aboutObject.object);
		if (aboutObject.objectLength <= consoleLogUtility.defaultLengthForDirectPrint)
		{//fancy print key & values
			returnObjectValues = () => {
				let outputString = "\n"+ color + "{";
				for (let [key, value] of Object.entries(aboutObject.object)) {					
					outputString = outputString + "\n\t"+ color + key + ": " + consoleLogUtility.colors.info + value + ","
				}
				outputString = outputString + "\n"+color+"}";
				return outputString;

			}
			let outputString = "\n"+color + "Object Length: " + aboutObject.objectLength + returnObjectValues();
			return outputString;
		}//collect more data about object
		else
		{		
			aboutObject.countTypesRatio = (inputObject) => {//count contentTypeRatio {inputObject} : [keyArray], [typesArray]
				let typesRatioObject = {array: 0, boolean: 0, date: 0, function: 0, NaN: 0, null: 0, number: 0, object: 0, string: 0, undefined: 0}
				for (var i = aboutObject.objectLength - 1; i >= 0; i--) {
					if (inputObject.typesArray[i] === "object")
					{//if type is object use keyArray to check what object it is
						if (Array.isArray(aboutObject.object[inputObject.keyArray[i]]) === true)
						{
							++typesRatioObject.array;
						}
						else if(aboutObject.object[inputObject.keyArray[i]] === null)
						{
							++typesRatioObject.null;
						}
						else if(aboutObject.object[inputObject.keyArray[i]] instanceof Date)
						{
							++typesRatioObject.date;
						}
						else
						{
							++typesRatioObject.object;
						}
					}
					else if (inputObject.typesArray[i] === "number")
					{//if type is number use keyArray to check isn't it NaN
						if (isNaN(aboutObject.object[inputObject.keyArray[i]]))
						{
							++typesRatioObject.NaN;
						}
						else
						{//if number increment number value
							++typesRatioObject[inputObject.typesArray[i]];
						}
					}
					else
					{//for rest types of values
						++typesRatioObject[inputObject.typesArray[i]];
					}			
				}
				return typesRatioObject;
			};
			aboutObject.checkContentTypes = (inputObject) => {//do math for contentTypes
				let counter = 0;
				let contentType = {};
				contentType.keyArray = []; //key is required if get object (array/date/null/object) or number/NaN
				contentType.typesArray = []; //types
				for (let [key, value] of Object.entries(inputObject)) {
					contentType.typesArray[counter] = typeof value;
					contentType.keyArray[counter] = key;
					++counter;
				}
				return contentType;
			};
			//aboutObject.typesInside = aboutObject.checkContentTypes(aboutObject.object);
			aboutObject.typesRatio = aboutObject.countTypesRatio(aboutObject.checkContentTypes(aboutObject.object));
			aboutObject.createOutputString = (typesRatio) =>
			{//do OutputString from collected information about {}
				createTypesReview = (typesRatio) => {
					let contentRatioString = "\n"+color + " Content Ratio:";
					for (let [key, value] of Object.entries(typesRatio)) {
						if (value !== 0)
						{
							contentRatioString = contentRatioString + "\n"+color + "\t"+key+": " +value;
						}
					}
					return contentRatioString;
				}
				//create review from collected data
				let lenght = "\n"+color+ "Object Length: " + aboutObject.objectLength;
				let typesReview = createTypesReview(typesRatio);
				let outputString = lenght	+ typesReview;
				return outputString;
			};
			//create finnal string 
			let outputString = aboutObject.createOutputString(aboutObject.typesRatio);
			return outputString;
		}
	},
	getDateTime: () => 
	{//create string with now date/time to show before content
		var date = new Date();
		var hour = date.getHours();
		hour = (hour < 10 ? "0" : "") + hour;

		var min  = date.getMinutes();
		min = (min < 10 ? "0" : "") + min;

		var sec  = date.getSeconds();
		sec = (sec < 10 ? "0" : "") + sec;

		var year = date.getFullYear();

		var month = date.getMonth() + 1;
		month = (month < 10 ? "0" : "") + month;

		var day  = date.getDate();
		day = (day < 10 ? "0" : "") + day;

		return year + "/" + month + "/" + day + " " + hour + ":" + min + ":" + sec;
	}
};

exports.consoleSub = (valueToConsoleLog, maxLengthForDirectPrintObjectsAndArrays, descriptionOfValue) =>
{
	//if no extra  arguments set all to default
	consoleLogUtility = { ...consoleLogUtility,
		defaultLengthForDirectPrint: 100,
		extraDescription: false,
		outputStringType: "\033[0;39m",
	}
	if (maxLengthForDirectPrintObjectsAndArrays)
	{//do recognition
		consoleLogUtility.recognizeExtraArgument(maxLengthForDirectPrintObjectsAndArrays);
	}
	if (descriptionOfValue)
	{//do recognition
		consoleLogUtility.recognizeExtraArgument(descriptionOfValue);
	}
	
	let type = typeof valueToConsoleLog;
	if (type === "string") 
	{
		//console.log for a string
		consoleLogUtility.consoleLog(valueToConsoleLog, "info");
	}
	else if (type === "object")
	{
		if(Array.isArray(valueToConsoleLog) === true)
		{	//value is Array console.log for []	
			consoleLogUtility.consoleLog(consoleLogUtility.arrayToString(valueToConsoleLog), 'array');
		}
		else if (valueToConsoleLog === null)
		{	//value is null console.log for null	
			consoleLogUtility.consoleLog(valueToConsoleLog, "info");
		}
		else if (valueToConsoleLog instanceof Date)
		{	//value is Date console.log for Date	
			consoleLogUtility.consoleLog(valueToConsoleLog, "info");
		}
		else
		{	//value is Object console.log for {}
			consoleLogUtility.consoleLog(consoleLogUtility.objectToString(valueToConsoleLog), 'object');
		}
	}
	else if (type === "number")
	{
		if (isNaN(valueToConsoleLog))
		{//value is NaN console.log for NaN	
			consoleLogUtility.consoleLog("NaN", "bad");
		}
		else
		{//value is Number console.log for Number	
			consoleLogUtility.consoleLog(valueToConsoleLog, "info");
		}
	}
	else if (type === "boolean")
	{ //value is Boolean console.log for Boolean	
		consoleLogUtility.consoleLog(valueToConsoleLog, "info");
	}
	else if (type === "function")
	{	//value is function console.log for function	
		consoleLogUtility.consoleLog("Input value is a function.", "info");
	}
	else if (type === "undefined")
	{	//value is undefined console.log for undefined	
		consoleLogUtility.consoleLog(type, "bad");
	}
	else if (type === "symbol")
	{ //value is symbol console.log for symbol
		consoleLogUtility.consoleLog("Input value is a Symbol", "info");
	}
	else
	{//I don't know what it could be	
		consoleLogUtility.consoleLog("Type of the value input to consoleSub is unrecognizable. Operation break to avoid errors.", "bad");
	}
}