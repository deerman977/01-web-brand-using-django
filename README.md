If you want to use it try: https://zero1-web-brand-using-django-0p72.onrender.com
# Personal Brand Django Website

## Run on Windows PowerShell

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Open http://127.0.0.1:8000/

Admin: http://127.0.0.1:8000/admin/

The contact form is a real Django ModelForm. Messages are stored in SQLite and visible in Django admin.

Replace `[YOUR NAME]` and the `#` social/project links in `portfolio/templates/portfolio/home.html`.
