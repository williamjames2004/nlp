import nltk
from nltk.corpus import treebank
from nltk.tag import UnigramTagger, BigramTagger, TrigramTagger
data  = treebank.tagged_sents()
train = data[:3900]
test  = data[3900:]
uni   = UnigramTagger(train)
bi    = BigramTagger(train)
tri   = TrigramTagger(train)
print("Unigram Tagger Accuracy: ", uni.accuracy(test))
print("Bigram Tagger Accuracy: ", bi.accuracy(test))
print("Trigram Tagger Accuracy: ", tri.accuracy(test))