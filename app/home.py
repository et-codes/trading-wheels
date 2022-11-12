from app import app


@app.route('/')
def home():
    return app.send_static_file('index.html')