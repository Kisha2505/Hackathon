from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

springs = [
    {
        "id": "SPR-001", "name": "Aruvikkal Spring", "village": "Village A",
        "flow": 18, "previous_flow": 25, "rainfall": 48, "risk": 88,
        "priority": 92, "status": "Critical", "recharge": "High",
        "intervention": "Recharge trench", "lat": 10.12, "lng": 77.08
    },
    {
        "id": "SPR-002", "name": "Mala Spring", "village": "Village B",
        "flow": 31, "previous_flow": 34, "rainfall": 62, "risk": 61,
        "priority": 68, "status": "Declining", "recharge": "Medium",
        "intervention": "Percolation pits", "lat": 10.16, "lng": 77.14
    },
    {
        "id": "SPR-003", "name": "Kurinji Spring", "village": "Village C",
        "flow": 47, "previous_flow": 45, "rainfall": 105, "risk": 22,
        "priority": 31, "status": "Healthy", "recharge": "Low",
        "intervention": "Monitoring", "lat": 10.20, "lng": 77.02
    },
    {
        "id": "SPR-004", "name": "Pachai Spring", "village": "Village D",
        "flow": 22, "previous_flow": 29, "rainfall": 55, "risk": 79,
        "priority": 84, "status": "Critical", "recharge": "High",
        "intervention": "Contour trenches", "lat": 10.08, "lng": 77.18
    }
]

@app.route("/")
def home():
    return jsonify({
        "project": "SpringRevive AI",
        "message": "Backend API is running successfully",
        "time": datetime.now().isoformat()
    })

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email", "").strip()
    password = data.get("password", "").strip()

    if not email or not password:
        return jsonify({"success": False, "message": "Email and password are required"}), 400

    return jsonify({
        "success": True,
        "message": "Login successful",
        "user": {"email": email, "role": "Officer"}
    })

@app.route("/api/springs", methods=["GET"])
def get_springs():
    return jsonify({"success": True, "count": len(springs), "data": springs})

@app.route("/api/springs/<spring_id>", methods=["GET"])
def get_spring(spring_id):
    spring = next((s for s in springs if s["id"] == spring_id), None)
    if not spring:
        return jsonify({"success": False, "message": "Spring not found"}), 404
    return jsonify({"success": True, "data": spring})

@app.route("/api/dashboard", methods=["GET"])
def dashboard():
    return jsonify({
        "success": True,
        "summary": {
            "total_springs": len(springs),
            "healthy": sum(s["status"] == "Healthy" for s in springs),
            "declining": sum(s["status"] == "Declining" for s in springs),
            "critical": sum(s["status"] == "Critical" for s in springs),
            "priority_springs": sum(s["priority"] >= 80 for s in springs)
        }
    })

@app.route("/api/ai/predict", methods=["POST"])
def ai_predict():
    data = request.get_json() or {}
    try:
        flow = float(data.get("flow", 0))
        previous_flow = float(data.get("previous_flow", 0))
        rainfall = float(data.get("rainfall", 0))
    except (TypeError, ValueError):
        return jsonify({"success": False, "message": "Invalid numeric input"}), 400

    if previous_flow <= 0:
        return jsonify({"success": False, "message": "Previous flow is required"}), 400

    flow_reduction = ((previous_flow - flow) / previous_flow) * 100
    risk_score = max(0, min(100, round(flow_reduction * 1.5 + max(0, 100 - rainfall) * 0.3)))

    if risk_score >= 75:
        status = "Critical"
    elif risk_score >= 45:
        status = "Declining"
    else:
        status = "Healthy"

    priority_score = max(0, min(100, round(risk_score * 0.7 + flow_reduction * 0.3)))

    if priority_score >= 75:
        recharge = "High"
    elif priority_score >= 45:
        recharge = "Medium"
    else:
        recharge = "Low"

    return jsonify({
        "success": True,
        "prediction": {
            "vulnerability_score": risk_score,
            "risk_level": status,
            "priority_score": priority_score,
            "recharge_potential": recharge,
            "flow_reduction": round(flow_reduction, 2)
        }
    })

@app.route("/api/recharge/recommend", methods=["POST"])
def recharge_recommend():
    data = request.get_json() or {}
    try:
        priority = float(data.get("priority_score", 0))
    except (TypeError, ValueError):
        return jsonify({"success": False, "message": "Invalid priority score"}), 400

    status = data.get("status", "Healthy")

    if priority >= 80:
        interventions = ["Recharge trench", "Contour trench", "Percolation pit"]
        reason = "High vulnerability and high recharge priority detected."
    elif priority >= 50:
        interventions = ["Percolation pit", "Small check dam"]
        reason = "Moderate spring stress detected."
    else:
        interventions = ["Regular monitoring"]
        reason = "Spring condition is relatively stable."

    return jsonify({
        "success": True,
        "recommendation": {
            "status": status,
            "priority": priority,
            "suggested_interventions": interventions,
            "reason": reason
        }
    })

@app.route("/api/alerts", methods=["GET"])
def alerts():
    alert_list = []
    for spring in springs:
        if spring["status"] == "Critical":
            alert_list.append({
                "spring_id": spring["id"],
                "type": "Critical Spring",
                "message": "Immediate field validation required",
                "severity": "High"
            })
        elif spring["status"] == "Declining":
            alert_list.append({
                "spring_id": spring["id"],
                "type": "Flow Reduction",
                "message": "Spring flow is declining",
                "severity": "Medium"
            })
    return jsonify({"success": True, "alerts": alert_list})

@app.route("/api/gis/springs", methods=["GET"])
def gis_springs():
    locations = [{
        "id": s["id"], "name": s["name"],
        "latitude": s["lat"], "longitude": s["lng"],
        "status": s["status"], "recharge": s["recharge"]
    } for s in springs]
    return jsonify({"success": True, "locations": locations})

@app.route("/api/reports/springs", methods=["GET"])
def spring_report():
    return jsonify({
        "success": True,
        "generated_at": datetime.now().isoformat(),
        "total_springs": len(springs),
        "springs": springs
    })

if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)
