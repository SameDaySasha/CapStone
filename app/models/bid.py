from datetime import datetime
from .db import db, SCHEMA, add_prefix_for_prod, environment
from sqlalchemy import Enum

class Bid(db.Model):
    __tablename__ = 'bids'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    created_by = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    last_updated_by = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    listing_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('listings.id')), nullable=False)
    amount = db.Column(db.Numeric, nullable=False)
    status = db.Column(Enum('pending', 'accepted', 'rejected', name='bid_status'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Additional methods and logic... can go here when I think of them
