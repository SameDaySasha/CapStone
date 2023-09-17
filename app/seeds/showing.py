from datetime import datetime
from app.models import db, Showing

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

def undo_showings():
    db.session.execute('TRUNCATE showings RESTART IDENTITY CASCADE;')
    db.session.commit()
