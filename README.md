(Run from project directory)
Create python virtual environment - follow https://docs.python.org/3.6/library/venv.html and name your virtual environment "venv" so git ignores it. Then run
```
pip install -r requirements.txt
```

Make migrations for data(run after cloning and if changes are made to any models):
```
python ./server/manage.py makemigrations
python ./server/manage.py migrate
```
Run django -
```
python ./server/manage.py runserver
```
Then go to http://localhost:8000/
