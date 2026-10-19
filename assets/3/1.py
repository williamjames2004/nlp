import nltk
from nltk.corpus import PlaintextCorpusReader

folder = r'E:\NLP\3'
nltk.data.path.append(folder)

corpus = PlaintextCorpusReader(folder, r'.*\.txt')

print(corpus.fileids())
print(list(corpus.words()))
print(corpus.sents())