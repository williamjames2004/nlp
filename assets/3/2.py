import nltk
text = "The intelligent student completed the NLP project"
tokens = nltk.word_tokenize(text)
tagged = nltk.pos_tag(tokens)
grammer = "NP: {<DT>?<JJ>*<NN>}"
chunkParser = nltk.RegexpParser(grammer)
tree = chunkParser.parse(tagged)
print(tree)
