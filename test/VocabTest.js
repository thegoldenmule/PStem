if (!thegoldenmule) var thegoldenmule = {};

thegoldenmule.VocabTest = (function() {
	var Stemmer = thegoldenmule.Stemmer;
	
	var _that = this,
		_stemmer = Stemmer;
	
	_that.run = function() {
		var total = 0;
		var passed = 0;
		var dictionary = thegoldenmule.VocabTest.dictionary;
		for (var word in dictionary) {
			var stemmed = String(_stemmer.stem(word)).split(",").pop();
			if (stemmed == dictionary[word]) {
				++passed;
			}
			
			++total;
		}
		
		return {pass:passed, total:total};
	};
	
	return _that;
})();