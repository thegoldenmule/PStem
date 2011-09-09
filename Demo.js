var Demo = (function() {
	
	var Stemmer = thegoldenmule.Stemmer;
	
	var _that = this,
		_stemmer = Stemmer,
		_inputText,
		_outputDiv;
	
	_that.init = function() {
		// get text inputs
		_inputText = document.getElementById("inputText");
		_outputDiv = document.getElementById("results");
		
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
		stem(_inputText.value);
	}
	
	function keypressHandler(event) {
		if (13 == event.which) {
			stem(_inputText.value);
		}
	}
	
	function stem(phrase) {
		if (phrase.length > 0) {
			var words = phrase.split(" ");
			var stemmedWords = _stemmer.stem(words[0]);
			_outputDiv.innerHTML = stemmedWords.join(" > ");
		}
	}
		
	return _that;
})();