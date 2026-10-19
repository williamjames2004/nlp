import nltk 
sentence = "The smart student solved the problem"
tokens = nltk.word_tokenize(sentence)
tags = nltk.pos_tag(tokens)
grammer = r"""
NP:{<DT><JJ>*<NN>}
}<VBD>{
"""
chunker = nltk.RegexpParser(grammer)
tree = chunker.parse(tags)
print(tree)