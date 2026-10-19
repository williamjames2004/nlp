from nltk.tree import Tree
tree = Tree('S',[
    Tree('NP', [('She', 'PRP')]),
    Tree('VP', [('is', 'VBZ'), ('go', 'VB')])
])
print("Before Correction: ")
print(tree)

for subtree in tree.subtrees():
    if isinstance(subtree, Tree) and subtree.label() == 'VP':
        for i in range(len(subtree)):
            subtree[i] = ('going', 'VBG')
print("After Correction: ")
print(tree)