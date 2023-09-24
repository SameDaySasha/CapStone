from datetime import datetime
from .db import db, SCHEMA, add_prefix_for_prod, environment  
from sqlalchemy import Enum  
import os  

class Showing(db.Model):
    __tablename__ = 'showings'
    
    if environment == "production":  
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    created_by = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)  # Updated
    listing_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('listings.id')), nullable=False)  # Updated
    time = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self): 
        return {
            'id': self.id,
            'created_by': self.created_by,
            'listing_id': self.listing_id,
            'time': self.time,
            'status': self.status,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
