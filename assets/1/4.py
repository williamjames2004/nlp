from nltk.corpus import wordnet
word = "happy"
synonyms = set()
for synset in wordnet.synsets(word):
    for lemma in synset.lemmas():
        synonyms.add(lemma.name())
print(synonyms)