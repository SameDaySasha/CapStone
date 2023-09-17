from datetime import datetime
from app.models import db, Bid

def seed_bids():
    bid1 = Bid(
        created_by=1,
        last_updated_by=1,
        listing_id=1,
        amount=290000.00,
        status='pending',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    bid2 = Bid(
        created_by=2,
        last_updated_by=2,
        listing_id=1,
        amount=300000.00,
        status='pending',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    # ... (add more bid instances as needed)

    db.session.add(bid1)
    db.session.add(bid2)
    # ... (add the other bid instances to the session)
    db.session.commit()

def undo_bids():
    db.session.execute('TRUNCATE bids RESTART IDENTITY CASCADE;')
    db.session.commit()
