from os import listdir
from os.path import isfile, join
import sys
import json
import csv

LOG_DIR = 'server_logs/'
OUTPUT_FILE = LOG_DIR + 'BIG5_processed_logs.csv'
NEWLINE = '\n'
DELIMITER = ';'

BLACKLIST_MTURK_50_STUDY = [ #less than 2 BIATs completed
	'481568888842641',
	'541568887277227'
]

def get_user_info(logs):
	user = {
		'info': {}
	}
	for log in logs:
		if 'settings' in log:
			for key in log['settings'].keys():
				user['info'][key] = log['settings'][key]
			break
		else:
			continue
	return user


def filter_objects(logs, status='complete'):
	return [log for log in logs if log['status']==status]

'''
	Parse out OCEAN data
'''
if __name__ == '__main__':
	# print('processing log files..');

	logfiles = [f for f in listdir(LOG_DIR) if (isfile(join(LOG_DIR, f)) and f[-4:]=='.log') and f[:-4] not in BLACKLIST_MTURK_50_STUDY]

	count = 0
	biat_pairs = []
	users = []
	rownames = []
	
	for f in logfiles:
		# print('processing: %s' % f)

		with open(LOG_DIR + f, 'r') as logfile:
			logs = [json.loads(log) for log in logfile.readlines()]

			user = get_user_info(logs)
			# print 'user info:'
			# print(user)

			keys = [key for key in user['info'].keys() if key not in rownames]
			for key in keys:
				rownames.append(key)

			oceans = []
			for questions in [o['data'] for o in filter_objects(logs, status='ocean')]:
				for q in questions:
					oceans.append({q: questions[q]})
			user['ocean'] = oceans

			# quit here if no ocean was filled in
			if(len(oceans)==0):
				continue

			for q in user['ocean']:
				key = q.keys()[0]
				val = q[key]
				colname = 'ocean_%s' % key.replace(' ', '_')
				if colname not in rownames:
					rownames.append(colname)

			biats= filter_objects(logs, status='complete')

			for b in biats:
				data = b['data']
				biat = data['biat_stimuli_pairs'][0]

				if biat not in biat_pairs:
					biat_pairs.append(biat)

				user[biat] = {
					'd_score': data['d_score'],
					'preferred': data['preferred'],
					'magnitude': data['magnitude'],
				}

			feedback = filter_objects(logs, status='feedback')
			for f in feedback:
				data = f['data']
				biat = '%s/%s' % (data['focalKey'], data['nonFocalKey'])
				
				user[biat]['dScoreFit'] = data['dScoreFit']
				user[biat]['self_assessment'] = data['self_assessment']
				user[biat]['attributeFocalCategoryFit'] = data['attributeFocalCategoryFit']
				user[biat]['focalBlacksheep'] = data['focalBlacksheep']
				user[biat]['focal_wishlist'] = data['focal_wishlist']
				user[biat]['attributeNonfocalCategoryFit'] = data['attributeNonfocalCategoryFit']
				user[biat]['nonfocal_blacksheep'] = data['nonfocal_blacksheep']
				user[biat]['nonfocal_wishlist'] = data['nonfocal_wishlist']
				user[biat]['comment'] = data['comment']

			# print(user)

			# print('biat pairs:')
			# print(biat_pairs)

			for biat in biat_pairs:
				if biat in user.keys():
					for key in user[biat]:
						rowname = '%s_%s' % (biat, key)
						if rowname not in rownames:
							rownames.append(rowname)

			users.append(user)
			count+=1

			# for f in feedback:
			# 	print(f['data']['focalKey'])

			# if 'comment' in feedback['data']:
			# 	print(feedback['data']['comment'])
			# for log in logs:
			# 	log = json.loads(log)
			# 	print(log)

			# sys.exit(0)

	with open(OUTPUT_FILE, 'w') as csvfile:

		writer = csv.DictWriter(csvfile, fieldnames=rownames, delimiter=DELIMITER)
    		
		writer.writeheader()
		
		for user in users:
			row = {}
			
			for key in user['info'].keys():
				row[key] = user['info'][key]
			
			for biat in biat_pairs:
				if biat in user.keys():
					for key in user[biat]:
						rowname = '%s_%s' % (biat, key) #this is actually columname
						row[rowname] = user[biat][key]

			for q in user['ocean']:
				key = q.keys()[0]
				val = q[key]
				colname = 'ocean_%s' % key.replace(' ', '_')
				row[colname] = val

			writer.writerow(row)

		print('%d processed logs written to: %s' % (count, OUTPUT_FILE))
