from . import db
from datetime import datetime

class Job(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    company = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    posting_date = db.Column(db.Date, nullable=False, default=datetime.utcnow)
    job_type = db.Column(db.String(100), nullable=True)
    tags = db.Column(db.String(500), nullable=True)  # comma-separated tags

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "company": self.company,
            "location": self.location,
            "posting_date": self.posting_date.isoformat(),
            "job_type": self.job_type,
            "tags": self.tags.split(",") if self.tags else [],
        }