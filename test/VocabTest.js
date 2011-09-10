if (!thegoldenmule) var thegoldenmule = {};

thegoldenmule.VocabTest = (function() {
	var Stemmer = thegoldenmule.Stemmer;
	
	var _that = this,
		_stemmer = Stemmer,
		_outputDiv;
	
	_that.run = function() {
		_outputDiv = document.getElementById("testdisplay");
		_outputDiv.innerHTML = "";
		
		var total = 0;
		var passed = 0;
		var dictionary = thegoldenmule.VocabTest.dictionary;
		for (var word in dictionary) {
			var stemmed = String(_stemmer.stem(word)).split(",").pop();
			if (stemmed != dictionary[word]) {
				_outputDiv.innerHTML += word + " > " + stemmed + " : " + dictionary[word] + "<br>\n";
			} else {
				++passed;
			}
			
			++total;
		}
		
		_outputDiv.innerHTML += "<br>Passed : " + passed + " / " + total + " words<br>";
	};
	
	return _that;
})();