from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    # Applying schema settings based on the environment (production/development)
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # Defining columns for the 'users' table with appropriate data types and constraints
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), default='customer')  # New column to specify user roles with a default value of 'customer'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)  # New column to track the creation time of user records
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)  # Removed the "ON UPDATE CURRENT_TIMESTAMP" clause

    # Property to retrieve the hashed password
    @property
    def password(self):
        return self.hashed_password

    # Setter method to hash the password before storing it in the database
    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    # Method to check if the input password matches the stored hashed password
    def check_password(self, password):
        return check_password_hash(self.hashed_password, password)  

    # Method to convert user object details into a dictionary format for easier handling and manipulation
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'role': self.role,  # Including the role in the dictionary representation
            'created_at': self.created_at,  # Including the creation time in the dictionary representation
            'updated_at': self.updated_at  # Including the update time in the dictionary representation
        }
