"""
Started by Ian Chen on 11/14/2025
GitHub: https://github.com/IanC04
"""

import csv
import json
import glob
import pathlib

csv_files = glob.glob('*.csv')
json_files = glob.glob('*.json')
output_file = 'output/fun-facts.json'

all_facts = []

print(f'Found {len(csv_files)} CSV files to process.')
print(f'Found {len(json_files)} JSON files to process.')

for file in csv_files + json_files:
    with open(file, encoding='utf-8') as f:
        if pathlib.Path(file).suffix == '.csv':
            reader = csv.DictReader(f)
            facts = list(row['Fact'] for row in reader)
        elif pathlib.Path(file).suffix == '.json':
            facts = json.load(f)
        all_facts.extend(facts)
        print(f'Processed {file} ({len(facts)} facts)')

with open(output_file, mode='w', encoding='utf-8') as f:
    json.dump(all_facts, f, indent=2)
print(f'Combined {len(all_facts)} facts into {output_file}')
