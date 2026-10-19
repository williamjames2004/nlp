from nltk.corpus import wordnet
synonyms = []
for syn in wordnet.synsets("happy"):
    for lemma in syn.lemmas():
        if lemma.name() != "happy":
            synonyms.append(lemma.name())
print(set(synonyms))