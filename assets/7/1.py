from dateutil import parser
dates = [
    "September 14, 2026",
    "14/09/2026",
    "2026-09-14 10:30 AM"
]
for d in dates:
    dt = parser.parse(d)
    print("Original: ", d)
    print("Parsed: ", dt)
    print("\n")