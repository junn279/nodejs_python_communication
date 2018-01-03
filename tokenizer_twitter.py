# -*- coding: utf-8 -*-

import csv
import re
from konlpy.tag import Twitter
import sys
import operator
import math
import base64
import json

# konlpy 사용시 ascii encoding관련된 문제 해결법 
# 아래와 같이 할 경우 jupyter notebook에서 출력시 console에만 출력되기 때문에
# 이 경우 주석처리된 소스를 사용

# import sys
# stdout = sys.stdout
# reload(sys)
# sys.setdefaultencoding('UTF8')
# sys.stdout = stdout

reload(sys)
sys.setdefaultencoding('UTF8')

twitter = Twitter()

program_name = sys.argv[0]
arguments = sys.argv[1:]

#print arguments[0]
#a = 'ZGF0YSB0byBiZSBlbmNvZGVk'
#data = base64.b64decode(a)

data = base64.b64decode(arguments[0])

cleanr = re.compile('<.*?>')
cleantext = re.sub(cleanr, ' ', data)
array = twitter.nouns(cleantext)

print json.dumps(array)