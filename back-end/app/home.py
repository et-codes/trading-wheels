from app import app


@app.route('/')
@app.route('/portfolio')
@app.route('/trading')
@app.route('/about')
def home():
    return app.send_static_file('index.html')