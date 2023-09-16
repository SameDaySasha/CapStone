from datetime import datetime
from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, we can add other users here if we want
def seed_users():
    demo = User(
        username='Demo', 
        email='demo@aa.io', 
        password='password', 
        role='customer',  # Assigning role
        created_at=datetime.utcnow(),  # Assigning created_at
        updated_at=datetime.utcnow()  # Assigning updated_at
    )
    marnie = User(
        username='marnie', 
        email='marnie@aa.io', 
        password='password', 
        role='customer',  # Assigning role
        created_at=datetime.utcnow(),  # Assigning created_at
        updated_at=datetime.utcnow()  # Assigning updated_at
    )
    bobbie = User(
        username='bobbie', 
        email='bobbie@aa.io', 
        password='password', 
        role='customer',  # Assigning role
        created_at=datetime.utcnow(),  # Assigning created_at
        updated_at=datetime.utcnow()  # Assigning updated_at
    )
    admin = User(
        username='Admin', 
        email='admin@aa.io', 
        password='securepassword',  # Use a strong password
        role='manager',  # Assigning admin role
        created_at=datetime.utcnow(),  # Assigning created_at
        updated_at=datetime.utcnow()  # Assigning updated_at
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(admin)  # Adding admin to the session
    db.session.commit()


# Undo function remains unchanged
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
