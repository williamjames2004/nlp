from nltk.tree import Tree
tree = Tree('S', [
    Tree('NP', [('The', 'DT'), ('student', 'NN')]),
    Tree('VP', [('is', 'VBZ'), ('reading', 'VBG'), ('books', 'NNS')])
])
print("Chunk Tree: ")
print(tree)
words = tree.leaves()
sentence = ''.join(word for word, tag in words)
print("\nText: ")
print(sentence)