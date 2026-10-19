from nltk.corpus import wordnet
word = "bark"
for synset in wordnet.synsets(word):
    print(synset.name(), synset.definition())