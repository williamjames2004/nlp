import nltk
from nltk.corpus import brown
from nltk import ConditionalFreqDist

words = brown.tagged_words()
cfd = ConditionalFreqDist(words)

for word in ['dog', 'run', 'play', 'beautiful']:
    if cfd[word]:
        print(word, cfd[word].max())
    else:
        print(word, "Word not found in corpus")