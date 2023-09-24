from datetime import datetime
from sqlalchemy import text  # Import for the SQL text function
from app.models import db, Showing, environment, SCHEMA 

# Function to seed the Showings table
def seed_showings():
    showing1 = Showing(
        created_by=4,
        listing_id=1,
        time=datetime(2023, 10, 15, 14, 0),
        status='Scheduled',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    showing2 = Showing(
        created_by=4,
        listing_id=1,
        time=datetime(2023, 10, 16, 16, 0),
        status='Scheduled',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    # ... (add more showing instances as needed)

    db.session.add(showing1)
    db.session.add(showing2)
    # ... (add the other showing instances to the session)
    db.session.commit()

# Function to undo the seeding for the Showings table
def undo_showings():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.showings RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM showings"))
        
    db.session.commit()
