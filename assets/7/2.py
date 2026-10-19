from datetime import datetime
from zoneinfo import ZoneInfo
india_time = datetime(2026,9,14,10,0,tzinfo=ZoneInfo("Asia/Kolkata"))
newyork_time = india_time.astimezone(ZoneInfo("America/New_York"))
print("India Time: ", india_time)
print("New York Time: ", newyork_time)