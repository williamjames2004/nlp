import enchant
d = enchant.Dict("en_US")
word = "receive"
print(d.check(word))
print(d.suggest(word))