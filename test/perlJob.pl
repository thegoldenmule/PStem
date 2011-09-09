#\usr\bin\perl -w

open(VOCAB, "voc.txt");
my @vocab = <VOCAB>;
close(VOCAB);

open(STEMS, "output.txt");
my @stems = <STEMS>;
close(STEMS);

open(JSON, ">dictionary.js");
print JSON "thegoldenmule.VocabTest.dictionary = {\n";

for my $i (0 .. $#vocab) {
	chomp($vocab[$i]);
	chomp($stems[$i]);
	
	print JSON "\t'$vocab[$i]':'$stems[$i]'";
	if ($i == $#vocab) {
		print JSON "\n";
	} else {
		print JSON ",\n";
	}
}

print JSON "};";
close(JSON);