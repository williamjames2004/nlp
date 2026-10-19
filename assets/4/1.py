import nltk 
from nltk.corpus import treebank
from nltk.tag import UnigramTagger
data  = treebank.tagged_sents()
train = data[:3900]
test  = data[3900:]
tagger= UnigramTagger(train)
print("Accuracy: ", tagger.accuracy(test))
sentence = "The boy is sleeping".split()
print(tagger.tag(sentence))