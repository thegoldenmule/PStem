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
		var failed = 0;
		var dictionary = thegoldenmule.VocabTest.dictionary;
		for (var word in dictionary) {
			++total;
			var stemmed = String(_stemmer.stem(word)).split(",").pop();
			if (stemmed != dictionary[word]) {
				_outputDiv.innerHTML += word + " > " + stemmed + " : " + dictionary[word] + "<br>\n";
				++failed;
			}
		}
		
		_outputDiv.innerHTML += "<br>Failed : " + failed + " / " + total
			+ "<br>Passed : " + Math.round(((total - failed) / total) * 100) + "%<br>";
	};
	
	return _that;
})();