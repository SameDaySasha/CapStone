from datetime import datetime
from app.models import db, Bid
from sqlalchemy.exc import IntegrityError

def seed_bids():
    bids_data = [
        {'created_by': 2, 'last_updated_by': 1, 'listing_id': 1, 'amount': 290000.00, 'status': 'pending'},
        {'created_by': 1, 'last_updated_by': 2, 'listing_id': 1, 'amount': 300000.00, 'status': 'pending'},
       
    ]

    for bid_data in bids_data:
        bid = Bid(
            created_by=bid_data['created_by'],
            last_updated_by=bid_data['last_updated_by'],
            listing_id=bid_data['listing_id'],
            amount=bid_data['amount'],
            status=bid_data['status'],  # Status aligned with your ENUM values
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        db.session.add(bid)

    try:
        db.session.commit()
    except IntegrityError as e:
        db.session.rollback()
        print(f"Error seeding bids: {e}")

def undo_bids():
    try:
        db.session.execute('TRUNCATE bids RESTART IDENTITY CASCADE;')
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print(f"Error undoing bids: {e}")

# Optionally, you can add a main guard to execute seeding as a script
if __name__ == "__main__":
    seed_bids()
