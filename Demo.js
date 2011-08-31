var Demo = (function() {
	
	var Stemmer = thegoldenmule.Stemmer;
	
	var _that = this,
		_stemmer = new Stemmer(),
		_inputText,
		_outputText;
	
	_that.init = function() {
		// get text inputs
		_inputText = document.getElementById("inputText");
		_outputText = document.getElementById("outputText");
		
		// listen to submit
		var submit = document.getElementById("submitButton");
		if (submit.addEventListener) {
			submit.addEventListener("click", submitHandler, false);
			document.addEventListener("keypress", keypressHandler, false);
		} else {
			submit.attachEvent("onclick", submitHandler);
			document.addEventListener("onkeypress", keypressHandler);
		}
	};
	
	function submitHandler(event) {
		if (_inputText.value.length > 0) {
			_outputText.value = _stemmer.stem(_inputText.value);
		}
	}
	
	function keypressHandler(event) {
		if (13 == event.which) {
			submitHandler(event);
		}
	}
		
	return _that;
})();