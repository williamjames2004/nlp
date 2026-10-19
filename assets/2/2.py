import re 
text = "goooood"
result = re.sub(r'(.)\1+', r'\1', text)
print(result)