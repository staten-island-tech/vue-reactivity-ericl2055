from pcpartpicker import API
import json

api = API()
all_data = api.retrieve_all()

n = json.loads(all_data.to_json())
for x in n:
    print(x)
    f = open("vue-project/src/data/" + str(x) + ".json", "x")
    f.write("{ 'data': " + str(n[x]) + "}")
    f.close()
