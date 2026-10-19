from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
sentence = "This is a simple example showing how stop words are removed"
words = word_tokenize(sentence)
stop_words = set(stopwords.words('english'))
filtered_words = [word for word in words if word.lower() not in stop_words]
print(filtered_words)