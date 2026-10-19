from nltk.tree import Tree
tree = Tree('NP', [
    ('students', 'NNS'),
    ('books', 'NNS'),
    ('teachers', 'NNS')
])
print("Original Tree: ")
print(tree)
singular_words = {
    'students': 'student',
    'books': 'book',
    'teachers': 'teacher'
}

for i,word in enumerate(tree):
    if word[1] == 'NNS' and word[0] in singular_words:
        tree[i] = (singular_words[word[0]], 'NN')
print("\nAfter Singularizing")
print(tree)