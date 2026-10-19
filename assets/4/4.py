import nltk
from nltk.corpus import treebank
from nltk.tag import AffixTagger

data   = treebank.tagged_sents()
train  = data[:3900]
test   = data[3900:]
tagger = AffixTagger(train)
print("Accuracy: ", tagger.accuracy(test))
sentence = "happiness readable kindness".split()
print(tagger.tag(sentence)) 