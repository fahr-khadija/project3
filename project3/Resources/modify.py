import json

# Load the existing JSON data
with open('projectdata.json', 'r') as json_file:
    data = json.load(json_file)

# Iterate through each object in the 'projectdata' array
for entry in data['projectdata']:
    # Create a new dictionary without the key '?'
    new_entry = {key: value for key, value in entry.items() if key != '?'}
    
    # Update the original entry with the new dictionary
    entry.clear()
    entry.update(new_entry)

# Save the modified data back to the JSON file
with open('projectdata_modified.json', 'w') as json_file:
    json.dump(data, json_file, indent=2)
