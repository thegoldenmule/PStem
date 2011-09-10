/**
 * Author: thegoldenmule
 * MIT License
 * 
 * Algorithm logic taken from Porter's Stemming Algorithm
 * http://tartarus.org/~martin/PorterStemmer/def.txt
 */
if (!thegoldenmule) var thegoldenmule = {};

thegoldenmule.Stemmer = (function() {
	
	var _vowels = ["a", "e", "i", "o", "u"];
	
	function isCVC(word) {
		return null != word.match(/[^aeiou][aeiouy][^aeiouwxy]$/)
			|| null != word.match(/[^aeiou][^aeiouy][aeiouy][^aeiouwxy]$/)
	}
	
	/**
	 * Decomposes a stem.
	 * 
	 * m - the *measure* of a word - [C]VC{m}[V]
	 * v - the stem has a vowel.
	 * d - the stem ends with a double consonant.
	 * o - the stem ends with CVC.
	 */
	function decompose(word) {
		var data = {};
		
		// lower case it
		word = word.toLowerCase();
		
		// reset m
		data.m = 0;
		
		// count vowels + consonants
		var vowel = false,
			consonant = true,
			i,
			len = word.length;
		for (i = 0; i < len; i++) {
			// get letter
			var letter = word[i];
			
			// vowel
			if ((i > 0 && "y" == letter && _vowels.indexOf(word[i - 1]) == -1)
				|| _vowels.indexOf(letter) != -1) {
				data.v = vowel = true;
				consonant = false;
			}
			// consonant
			else {
				if (!vowel && !consonant) {
					// ignore!
				} else if (vowel) {
					vowel = false;
					consonant = true;
					data.m++;
				}
			}
		}
		
		// set other vars
		data.last = word[len - 1];
		data.d = len > 1 && data.last == word[len - 2] && _vowels.indexOf(data.last) == -1;	// this assumes no yy endings
		data.o = isCVC(word);
		
		return data;
	}
	
	function matchAndDecompose(word, regex) {
		if (word.match(regex)) {
			return decompose(word.replace(regex, ""));
		}
		
		return {};
	}
	
	function pruneOneA(word) {
		if (word.length < 3) return [word, word, word, word, word, word, word, word];
		
		if (word.match(/sses$/)) word = word.replace(/sses$/, "ss");
		else if (word.match(/ies$/)) word = word.replace(/ies$/, "i");
		else if (!word.match(/ss$/) && word.match(/s$/)) word = word.replace(/s$/, "");
		
		return [word].concat(pruneOneB(word));
	}
	
	function pruneOneB(word) {
		var decomp;
		
		if (word.match(/eed$/)) {
			if (matchAndDecompose(word, /eed$/).m > 0) {
				word = word.replace(/eed$/, "ee");
			}	
		} else {
			var success = false;
			if (matchAndDecompose(word, /ed$/).v) {
				word = word.replace(/ed$/, "");
				success = true;
			} else if (matchAndDecompose(word, /ing$/).v) {
				word = word.replace(/ing$/, "");
				success = true;
			}
			
			if (success) {
				if (word.match(/at$/)) word = word.replace(/at$/, "ate");
				else if (word.match(/bl$/)) word = word.replace(/bl$/, "ble");
				else if (word.match(/iz$/)) word = word.replace(/iz$/, "ize");
				else {
					decomp = decompose(word);
					if (decomp.d
						&& decomp.last != "l"
						&& decomp.last != "s"
						&& decomp.last != "z") {
							word = word.slice(0, word.length - 1);
					} else if (decomp.o) {
						decomp = decompose(word);//word.slice(0, word.length - 3));
						if (1 == decomp.m) {
							word += "e";
						}
					}
				}
			}
		}
		
		return [word].concat(pruneOneC(word));
	}
	
	function pruneOneC(word) {
		if (matchAndDecompose(word, /y$/).v) {
			word = word.replace(/y$/, "i");
		}
		
		return [word].concat(pruneTwo(word));
	}
	
	function pruneTwo(word) {
		if (matchAndDecompose(word, /ational$/).m > 0) word = word.replace(/ational$/, "ate");
		else if (matchAndDecompose(word, /tional$/).m > 0) word = word.replace(/tional$/, "tion");
		else if (matchAndDecompose(word, /enci$/).m > 0) word = word.replace(/enci$/, "ence");
		else if (matchAndDecompose(word, /anci$/).m > 0) word = word.replace(/anci$/, "ance");
		else if (matchAndDecompose(word, /izer$/).m > 0) word = word.replace(/izer$/, "ize");
		else if (matchAndDecompose(word, /bli$/).m > 0) word = word.replace(/bli$/, "ble");
		else if (matchAndDecompose(word, /alli$/).m > 0) word = word.replace(/alli$/, "al");
		else if (matchAndDecompose(word, /entli$/).m > 0) word = word.replace(/entli$/, "ent");
		else if (matchAndDecompose(word, /eli$/).m > 0) word = word.replace(/eli$/, "e");
		else if (matchAndDecompose(word, /ousli$/).m > 0) word = word.replace(/ousli$/, "ous");
		else if (matchAndDecompose(word, /ization/).m > 0) word = word.replace(/ization$/, "ize");
		else if (matchAndDecompose(word, /ation$/).m > 0) word = word.replace(/ation$/, "ate");
		else if (matchAndDecompose(word, /ator$/).m > 0) word = word.replace(/ator$/, "ate");
		else if (matchAndDecompose(word, /alism$/).m > 0) word = word.replace(/alism$/, "al");
		else if (matchAndDecompose(word, /iveness$/).m > 0) word = word.replace(/iveness$/, "ive");
		else if (matchAndDecompose(word, /fulness$/).m > 0) word = word.replace(/fulness$/, "ful");
		else if (matchAndDecompose(word, /ousness$/).m > 0) word = word.replace(/ousness$/, "ous");
		else if (matchAndDecompose(word, /aliti$/).m > 0) word = word.replace(/aliti$/, "al");
		else if (matchAndDecompose(word, /iviti$/).m > 0) word = word.replace(/iviti$/i, "ive");
		else if (matchAndDecompose(word, /biliti$/).m > 0) word = word.replace(/biliti$/, "ble");
		else if (matchAndDecompose(word, /logi$/).m > 0) word = word.replace(/logi$/, "log");
		
		return [word].concat(pruneThree(word));
	}
	
	function pruneThree(word) {
		if (matchAndDecompose(word, /icate$/).m > 0) word = word.replace(/icate$/, "ic");
		else if (matchAndDecompose(word, /ative$/).m > 0) word = word.replace(/ative$/, "");
		else if (matchAndDecompose(word, /alize$/).m > 0) word = word.replace(/alize$/, "al");
		else if (matchAndDecompose(word, /iciti$/).m > 0) word = word.replace(/iciti$/, "ic");
		else if (matchAndDecompose(word, /ical$/).m > 0) word = word.replace(/ical$/, "ic");
		else if (matchAndDecompose(word, /ful$/).m > 0) word = word.replace(/ful$/, "");
		else if (matchAndDecompose(word, /ness$/).m > 0) word = word.replace(/ness$/, "");
		
		return [word].concat(pruneFour(word));
	}
	
	function pruneFour(word) {
		if (matchAndDecompose(word, /al$/).m > 1) word = word.replace(/al$/, "");
		else if (matchAndDecompose(word, /ance$/).m > 1) word = word.replace(/ance$/, "");
		else if (matchAndDecompose(word, /ence$/).m > 1) word = word.replace(/ence$/, "");
		else if (matchAndDecompose(word, /er$/).m > 1) word = word.replace(/er$/, "");
		else if (matchAndDecompose(word, /ic$/).m > 1) word = word.replace(/ic$/, "");
		else if (matchAndDecompose(word, /able$/).m > 1) word = word.replace(/able$/, "");
		else if (matchAndDecompose(word, /ible$/).m > 1) word = word.replace(/ible$/, "");
		else if (matchAndDecompose(word, /ant$/).m > 1) word = word.replace(/ant$/, "");
		else if (word.match(/ement$/)) {
			if(matchAndDecompose(word, /ement$/).m > 1) word = word.replace(/ement$/, "");
		}
		else if (word.match(/ment$/)) {
			if (matchAndDecompose(word, /ment$/).m > 1) word = word.replace(/ment$/, "");
		}
		else if (word.match(/ent$/)) {
			if (matchAndDecompose(word, /ent$/).m > 1) word = word.replace(/ent$/, "");
		}
		else {
			var decomp = matchAndDecompose(word, /ion$/);
			if (decomp.m > 1 && ("s" == decomp.last || "t" == decomp.last)) {
				word = word.replace(/ion$/, "");
			}
			else if (matchAndDecompose(word, /ou$/).m > 1) word = word.replace(/ou$/, "");
			else if (matchAndDecompose(word, /ism$/).m > 1) word = word.replace(/ism$/, "");
			else if (matchAndDecompose(word, /ate$/).m > 1) word = word.replace(/ate$/, "");
			else if (matchAndDecompose(word, /iti$/).m > 1) word = word.replace(/iti$/, "");
			else if (matchAndDecompose(word, /ous$/).m > 1) word = word.replace(/ous$/, "");
			else if (matchAndDecompose(word, /ive$/).m > 1) word = word.replace(/ive$/, "");
			else if (matchAndDecompose(word, /ize$/).m > 1) word = word.replace(/ize$/, "");
		}
		
		return [word].concat(pruneFiveA(word));
	}
	
	function pruneFiveA(word) {
		if (matchAndDecompose(word, /e$/).m > 1) word = word.replace(/e$/, "");
		else {
			var decomp = matchAndDecompose(word, /e$/);
			if (1 == decomp.m && false == decomp.o) {
				word = word.replace(/e$/, "");
			}
		}
		
		return [word].concat(pruneFiveB(word));
	}
	
	function pruneFiveB(word) {
		var decomp = decompose(word);
		if (decomp.m > 1 && decomp.d && "l" == decomp.last) {
			word = word.replace(/\w$/, "");
		}
		
		return word;
	}
	
	return {
		stem:function(word) {
			return pruneOneA(word.toLowerCase());
		}
	};
})();