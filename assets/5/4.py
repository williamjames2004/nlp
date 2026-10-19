import nltk
sentence = "The smart student solved the problem"
tokens = nltk.word_tokenize(sentence)
pos_tags = nltk.pos_tag(tokens)

def features(sentence, index):
    word = sentence[index][0]
    tag  = sentence[index][1]
    return {
        'word': word,
        'tag' : tag
    }

training_data = [
    ([('The', 'DT'), ('student', 'NN')], ['B-NP', 'I-NP']),
    ([('A', 'DT'), ('smart', 'JJ'), ('student', 'NN')], ['B-NP', 'I-NP', 'I-NP']),
    ([('the', 'DT'), ('problem', 'NN')], ['B-NP', 'I-NP'])
]

train_set = []
for sent,labels in training_data:
    for i in range(len(sent)):
        train_set.append((features(sent,i), labels[i]))
classifier = nltk.NaiveBayesClassifier.train(train_set)
print("Predicted chunk tags: ")
for i in range(len(pos_tags)):
    f = features(pos_tags, i)
    print(pos_tags[i][0], classifier.classify(f))