from datetime import datetime
from .db import db, SCHEMA
from sqlalchemy import Enum





class Listing(db.Model):
    __tablename__ = 'listings'
    __table_args__ = {'schema': SCHEMA} if environment == "production" else None

    id = db.Column(db.Integer, primary_key=True)
    created_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    last_updated_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(10), nullable=False)
    country = db.Column(db.String(255), nullable=False)
    zip_code = db.Column(db.String(10), nullable=False)
    price = db.Column(db.Numeric, nullable=False)
    main_image = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'created_by': self.created_by,
            'last_updated_by': self.last_updated_by,
            'title': self.title,
            'description': self.description,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'country': self.country,
            'zip_code': self.zip_code,
            'price': self.price,
            'main_image': self.main_image,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }