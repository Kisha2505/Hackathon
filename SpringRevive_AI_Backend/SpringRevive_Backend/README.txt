# SpringRevive AI - Backend Prototype

## Run
1. Open terminal in this folder.
2. Create virtual environment (optional):
   python -m venv venv
3. Activate it:
   Windows: venv\Scripts\activate
   macOS/Linux: source venv/bin/activate
4. Install packages:
   pip install -r requirements.txt
5. Start server:
   python app.py

Backend URL:
http://127.0.0.1:5000

Test:
http://127.0.0.1:5000/

## API endpoints
GET  /api/springs
GET  /api/springs/<spring_id>
GET  /api/dashboard
POST /api/login
POST /api/ai/predict
POST /api/recharge/recommend
GET  /api/alerts
GET  /api/gis/springs
GET  /api/reports/springs

Note:
The login and AI scoring are prototype/demo implementations. Use secure authentication and a trained ML model before production deployment.
