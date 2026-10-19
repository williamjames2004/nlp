from nltk.stem import PorterStemmer
ps = PorterStemmer()
words = ["jumping", "tries", "running"]
for word in words:
    print(word, "->", ps.stem(word))