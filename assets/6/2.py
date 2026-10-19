from nltk.tree import Tree 
tree = Tree('S', [
    Tree('VP', [('eat', 'VB')]),
    Tree('VP', [('sleep', 'VB')])
])
print("Original Tree: ")
print(tree)
tree[0], tree[1] = tree[1], tree[0]
print("\nAfter Swapping VP: ")
print(tree)