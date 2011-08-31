/**
 * Author: thegoldenmule
 * MIT License
 * 
 * Algorithm logic taken from Porter's Stemming Algorithm
 * http://tartarus.org/~martin/PorterStemmer/def.txt
 */
if (!thegoldenmule) var thegoldenmule = {};

thegoldenmule.Stemmer = (function() {
	
	var vowels = ["a", "e", "i", "o", "u"];
	
	var v,
		d,
		o,
		m,
		last;
	
	function isCVC(word) {
		var len = word.length;
		
		return len > 2
			&& vowels.indexOf(word[len - 3]) == -1
			&& vowels.indexOf(word[len - 2]) != -1
			&& vowels.indexOf(word[len - 1]) == -1;
	}
	
	function decompose(word) {
		// lower case it
		word = word.toLowerCase();
		
		// reset m
		m = 0;
		
		// count vowels + consonants
		var vowel = false,
			consonant = true,
			i,
			len = word.length;
		for (i = 0; i < len; i++) {
			// get letter
			var letter = word[i];
			
			// vowel
			if ((i > 0 && letter == "y" && vowels.indexOf(word[i - 1]) == -1)
				|| vowels.indexOf(letter) != -1) {
				v = vowel = true;
				consonant = false;
			}
			// consonant
			else {
				if (!vowel && !consonant) {
					// ignore!
				} else if (vowel) {
					vowel = false;
					consonant = true;
					m++;
				}
			}
		}
		
		// set other vars
		last = word[len - 1];
		d = len > 1 && last == word[len - 2] && vowels.indexOf(last) == -1;	// this assumes no yy endings
		o = isCVC(word);
	};
	
	function pruneOne(word) {
		if (word.match(/sses$/i)) word = word.replace(/sses$/i, "ss");
		else if (word.match(/ies$/i)) word = word.replace(/ies$/i, "i");
		else if (word.match(/s$/i)) word = word.replace(/s$/i, "");
		
		return pruneTwo(word);
	}
	
	function pruneTwo(word) {
		if (m < 0 && word.match(/eed$/i)) word = word.replace(/eed$/i, "ee");
		else {
			if (v && word.match(/ed$/i)) word = word.replace(/ed$/i, "");
			else if (v && word.match(/ing$/i)) word = word.replace(/ing$/i, "");
			else {
				if (word.match(/at$/i)) word = word.replace(/at$/i, "ate");
				else if (word.match(/bl$/i)) word = word.replace(/bl$/i, "ble");
				else if (word.match(/iz$/i)) word = word.replace(/iz$/i, "ize");
				else if (d
					&& !(last == "z" || last == "s" || last == "z")) {
					word = word.replace(new RegExp(d + "$"), d[0]);
				} else if (1 == m && o) {
					word = word.slice(0, word.length - 4) + "e";
				}
			}
		}
		
		if (v && word.match(/y$/i)) word = word.replace(/y$/i, "i");
		
		return pruneThree(word);
	}
	
	function pruneThree(word) {
		if (0 == m) return pruneFour(word);
		
		if (word.match(/ational$/i)) word = word.replace(/ational$/i, "ate");
		else if (word.match(/tional$/i)) word = word.replace(/tional$/i, "tion");
		else if (word.match(/enci$/i)) word = word.replace(/enci$/i, "ence");
		else if (word.match(/anci$/i)) word = word.replace(/anci$/i, "ance");
		else if (word.match(/izer$/i)) word = word.replace(/izer$/i, "ize");
		else if (word.match(/abli$/i)) word = word.replace(/abli$/i, "able");
		else if (word.match(/alli$/i)) word = word.replace(/alli$/i, "al");
		else if (word.match(/entli$/i)) word = word.replace(/entli$/i, "ent");
		else if (word.match(/eli$/i)) word = word.replace(/eli$/i, "e");
		else if (word.match(/ousli$/i)) word = word.replace(/ousli$/i, "ous");
		else if (word.match(/ization/i)) word = word.replace(/ization$/i, "ize");
		else if (word.match(/ation$/i)) word = word.replace(/ation$/i, "ate");
		else if (word.match(/ator$/i)) word = word.replace(/ator$/i, "ate");
		else if (word.match(/alism$/i)) word = word.replace(/alism$/i, "al");
		else if (word.match(/iveness$/i)) word = word.replace(/iveness$/i, "ive");
		else if (word.match(/fulness$/i)) word = word.replace(/fulness$/i, "ful");
		else if (word.match(/ousness$/i)) word = word.replace(/ousness$/i, "ous");
		else if (word.match(/aliti$/i)) word = word.replace(/aliti$/i, "al");
		else if (word.match(/iviti$/i)) word = word.replace(/iviti$/i, "ive");
		else if (word.match(/biliti$/i)) word = word.replace(/biliti$/i, "ble");
		
		return pruneFour(word);
	}
	
	function pruneFour(word) {
		if (m < 1) return pruneFive(word);
		
		if (word.match(/icate/i)) word = word.replace(/icate/i, "ic");
		else if (word.match(/ative/i)) word = word.replace(/ative/i, "");
		else if (word.match(/alize/i)) word = word.replace(/alize/i, "al");
		else if (word.match(/iciti/i)) word = word.replace(/iciti/i, "ic");
		else if (word.match(/ical/i)) word = word.replace(/ical/i, "ic");
		else if (word.match(/ful/i)) word = word.replace(/ful/i, "");
		else if (word.match(/ness/i)) word = word.replace(/ness/i, "");
		
		return pruneFive(word);
	}
	
	function pruneFive(word) {
		if (m < 1) return pruneSix(word);
		
		if (word.match(/al/i)) word = word.replace(/al/i, "");
		else if (word.match(/ance/i)) word = word.replace(/ance/i, "");
		else if (word.match(/ence/i)) word = word.replace(/ence/i, "");
		else if (word.match(/er/i)) word = word.replace(/er/i, "");
		else if (word.match(/ic/i)) word = word.replace(/ic/i, "");
		else if (word.match(/able/i)) word = word.replace(/able/i, "");
		else if (word.match(/ible/i)) word = word.replace(/ible/i, "");
		else if (word.match(/ant/i)) word = word.replace(/ant/i, "");
		else if (word.match(/ement/i)) word = word.replace(/ement/i, "");
		else if (word.match(/ment/i)) word = word.replace(/ment/i, "");
		else if (word.match(/ent/i)) word = word.replace(/ent/i, "");
		else if ((last == "s" || last == "t")
			&& word.match(/ion/i)) word = word.replace(/ion/i, "");
		else if (word.match(/ou/i)) word = word.replace(/ou/i, "");
		else if (word.match(/ism/i)) word = word.replace(/ism/i, "");
		else if (word.match(/ate/i)) word = word.replace(/ate/i, "");
		else if (word.match(/iti/i)) word = word.replace(/iti/i, "");
		else if (word.match(/ous/i)) word = word.replace(/ous/i, "");
		else if (word.match(/ive/i)) word = word.replace(/ive/i, "");
		else if (word.match(/ize/i)) word = word.replace(/ize/i, "");
		
		return pruneSix(word);
	}
	
	function pruneSix(word) {
		if (m > 1 && word.match(/e$/i)) word = word.replace(/e$/i, "");
		else if (1 == m && !o) word = word.replace(/e$/i, "");
		else if (m > 1 && d && "l" == last) word = word.replace(/l$/i, "");
		
		return word;
	}
	
	var Constr = function() {
		var _that = this;
		
		_that.stem = function(word) {
			decompose(word);
			
			return pruneOne(word);
		};
		
		return _that;
	};
	
	return Constr;
})();