var Demo = (function() {
	
	var Stemmer = thegoldenmule.Stemmer,
		VocabTest = thegoldenmule.VocabTest;
	
	var _that = this,
		_inputText,
		_outputDiv,
		_testOutputDiv;
	
	_that.init = function() {
		// get text inputs
		_inputText = document.getElementById("inputText");
		_outputDiv = document.getElementById("results");
		_testOutputDiv = document.getElementById("testOutput");
		
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
	
	_that.runTest = function() {
		var testResults = VocabTest.run();
		_testOutputDiv.innerHTML = "Passed : " + testResults.pass + " / " + testResults.total + " words.";
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
			var stemmedWords = Stemmer.stem(words[0]);
			var finalStem = stemmedWords.pop();
			_outputDiv.innerHTML = stemmedWords.join(" > ");
			_outputDiv.innerHTML += "<p class=stem>" + finalStem + "</p>";
		}
		
		_inputText.value = "";
	}
		
	return _that;
})();