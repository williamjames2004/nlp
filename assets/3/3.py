import nltk
from nltk.corpus.reader import CategorizedPlaintextCorpusReader

folder = r'E:\NLP\3'
nltk.data.path.append(folder)
reader = CategorizedPlaintextCorpusReader(
    folder, r'(positive|negative)/.*\.txt', cat_pattern = r'(.*)/.*'
)
print(reader.fileids())
print(reader.categories())
print(reader.words(categories='positive'))
print(reader.words(categories='negative'))