import nltk
sentence = "The student solved problems"
tokens = nltk.word_tokenize(sentence)
tags = nltk.pos_tag(tokens)
grammer = r"""
NP:{<DT><NN>}
"""
chunker = nltk.RegexpParser(grammer)
tree = chunker.parse(tags)
print("Original: ")
print(tree)

grammer2 = r"""
NP:{<DT><JJ>*<NN>}
"""
chunker2 = nltk.RegexpParser(grammer2)
tree2 = chunker2.parse(tags)
print("Expanded: ")
print(tree)