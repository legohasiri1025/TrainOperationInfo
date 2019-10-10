from bs4 import BeautifulSoup as bs4
import urllib.request as ur
import re
import requests
import datetime

dt_now = datetime.datetime.now()


# Read DB
senku_data = open("SENKU_DB.txt", "r")
url_data = open("URL_DB.txt", "r")


# Make DB SENKU List & URL List
SENKU_DB = senku_data.readlines()
URL_DB = url_data.readlines()

# Set Line Notify token and API
line_notify_token = 'YOUR TOKEN'
line_notify_api = 'https://notify-api.line.me/api/notify'

# Import Senku Data and URL from the beginning
for target_senku, url in zip(SENKU_DB, URL_DB):
	req = ur.urlopen(url)
	html = bs4(req, "html.parser")
	match = html.find(class_="corner_block_row_detail_d").string.replace('\n','')
	
	try:
		with open(target_senku.strip()+"TEXT_DB.txt", mode='x') as f:
			f.write("")
	except FileExistsError:
		pass
	
	hash_data = open(target_senku.strip()+"TEXT_DB.txt", "r")
	if not match == hash_data.read():
		text = target_senku.strip() + '\n ' + match
		message = '\n' + text
		payload = {'message': message}
		headers = {'Authorization': 'Bearer ' + line_notify_token}
		line_notify = requests.post(line_notify_api, data=payload, headers=headers)
		
		hash_data.close()
		hash_data = open(target_senku.strip()+"TEXT_DB.txt", "w")
		hash_data.write(match)
		hash_data.close()

# Close DB
senku_data.close()
url_data.close()
hash_data.close()
