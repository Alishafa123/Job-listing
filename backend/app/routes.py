from flask import Blueprint, request, jsonify
from .models import Job
from . import db
from datetime import datetime

jobs_bp = Blueprint('jobs', __name__, url_prefix="/jobs")

@jobs_bp.route("", methods=["POST"])
def create_job():
    data = request.json
    required_fields = ["title", "company", "location"]

    if not all(field in data and data[field] for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    job = Job(
        title=data["title"],
        company=data["company"],
        location=data["location"],
        posting_date=datetime.fromisoformat(data.get("posting_date", datetime.utcnow().isoformat())),
        job_type=data.get("job_type"),
        tags=",".join(data.get("tags", []))
    )
    db.session.add(job)
    db.session.commit()
    return jsonify(job.to_dict()), 201

@jobs_bp.route("", methods=["GET"])
def get_jobs():
    query = Job.query

    # Filters
    job_type = request.args.get("job_type")
    location = request.args.get("location")
    tag = request.args.get("tag")
    sort = request.args.get("sort")

    if job_type:
        query = query.filter(Job.job_type.ilike(f"%{job_type}%"))
    if location:
        query = query.filter(Job.location.ilike(f"%{location}%"))
    if tag:
        query = query.filter(Job.tags.ilike(f"%{tag}%"))

    # Sorting
    if sort == "posting_date_desc":
        query = query.order_by(Job.posting_date.desc())
    elif sort == "posting_date_asc":
        query = query.order_by(Job.posting_date.asc())
    else:
        query = query.order_by(Job.posting_date.desc())

    jobs = query.all()
    return jsonify([job.to_dict() for job in jobs]), 200

@jobs_bp.route("/<int:job_id>", methods=["GET"])
def get_job(job_id):
    job = Job.query.get(job_id)
    if not job:
        return jsonify({"error": "Job not found"}), 404
    return jsonify(job.to_dict())

@jobs_bp.route("/<int:job_id>", methods=["PUT", "PATCH"])
def update_job(job_id):
    job = Job.query.get(job_id)
    if not job:
        return jsonify({"error": "Job not found"}), 404

    data = request.json
    job.title = data.get("title", job.title)
    job.company = data.get("company", job.company)
    job.location = data.get("location", job.location)
    job.job_type = data.get("job_type", job.job_type)
    job.posting_date = datetime.fromisoformat(data.get("posting_date")) if data.get("posting_date") else job.posting_date
    job.tags = ",".join(data.get("tags")) if data.get("tags") else job.tags

    db.session.commit()
    return jsonify(job.to_dict())

@jobs_bp.route("/<int:job_id>", methods=["DELETE"])
def delete_job(job_id):
    job = Job.query.get(job_id)
    if not job:
        return jsonify({"error": "Job not found"}), 404

    db.session.delete(job)
    db.session.commit()
    return jsonify({"message": "Job deleted successfully"}), 200
