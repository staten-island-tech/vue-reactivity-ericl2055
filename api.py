from pcpartpicker import API

api = API()
all_data = api.retrieve_all()

n = all_data.to_json()

f = open("vue-project/src/assets/data.json", "w")
f.write(n)
f.close()
