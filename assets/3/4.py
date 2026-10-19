from nltk.corpus import gutenberg as gb
print(gb.fileids())
print(gb.words('austen-emma.txt')[:10])