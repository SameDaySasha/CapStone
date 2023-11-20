from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from .models import db, Bid, Listing
from sqlalchemy.exc import SQLAlchemyError

# Creating a Blueprint for bids
bids_routes = Blueprint('bids', __name__)

@bids_routes.route('/listings/<int:listing_id>/bids', methods=['POST'])
@login_required
def place_bid(listing_id):
    """
    Place a bid on a listing. Requires authentication.
    """
    data = request.get_json()
    # Validate input data and ensure listing exists

    new_bid = Bid(
        created_by=current_user.id,
        last_updated_by=current_user.id,
        listing_id=listing_id,
        amount=data['amount'],
        status='pending'  # Bids should initially be pending
    )

    try:
        db.session.add(new_bid)
        db.session.commit()
        return jsonify({'message': 'Bid successfully placed', 'bid': new_bid.to_dict()}), 201
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': 'Error placing bid'}), 400

@bids_routes.route('/bids/<int:bid_id>', methods=['PATCH'])
@login_required
def update_bid_status(bid_id):
    """
    Update the status of a bid. Requires authentication.
    """
    data = request.get_json()
    # Validate input data and ensure bid exists

    # Logic to update the bid status

    try:
        # Update logic here
        db.session.commit()
        return jsonify({'message': 'Bid status updated successfully', 'bid': updated_bid.to_dict()}), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': 'Error updating bid status'}), 400

@bids_routes.route('/bids/<int:bid_id>', methods=['DELETE'])
@login_required
def delete_bid(bid_id):
    """
    Delete a bid. Requires authentication.
    """
    # Ensure bid exists and current user has permission to delete it

    try:
        # Deletion logic here
        db.session.commit()
        return jsonify({'message': 'Bid successfully deleted', 'bid_id': bid_id}), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': 'Error deleting bid'}), 400

# Additional bid routes can be added here
