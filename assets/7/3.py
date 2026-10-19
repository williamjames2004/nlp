from lxml import html
data = """
<html>
    <body>
        <h1>NLP Resources</h1>
        <a href="https://www.python.org">Python</a>
        <a href="https://www.nltk.org">NLTK</a>
        <a href="https://www.Wikipedia.org">Wikipedia</a>
    </body>
</html>
"""
tree = html.fromstring(data)
urls = tree.xpath("//a/@href")
print("Extracted URLs: ")
for url in urls:
    print(url)