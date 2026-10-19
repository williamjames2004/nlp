from bs4 import BeautifulSoup
data = """
<p>
    NLP &amp; AI are important fields.
    &lt;Machine Learning&gt; is a part of AI.
</p>
"""
soup = BeautifulSoup(data, "html.parser")
print(soup.get_text())