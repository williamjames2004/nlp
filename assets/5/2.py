import nltk
sentence = "The science student"
tokens = nltk.word_tokenize(sentence)
tags = nltk.pos_tag(tokens)
grammer = r"""
NP:{<DT><NN>}
NP:{<NN>}
"""
chunker = nltk.RegexpParser(grammer)
tree = chunker.parse(tags)
print("Before merging: ")
print(tree)

grammer2 = r"""
NP:{<DT><NN>}
NP:{<NN>}
NP:{<NP><NP>}
"""
chunker2 = nltk.RegexpParser(grammer2)
tree2 = chunker2.parse(tags)
print("After merning: ")
print(tree2)