from flask import Blueprint, jsonify, request
from app.models import Listing, db, Showing
from datetime import datetime
from flask_login import current_user, login_user, logout_user, login_required
from app.forms import CreateListingForm, EditListingForm

    



listing_routes = Blueprint('listings', __name__)


# get all routes -- HOME PAGE ROUTE
@listing_routes.route('/listings', methods=['GET'])
def get_all_listings():
    try:
        listings = Listing.query.all()
        response_data = [
            {
                "id": listing.id,
                "created_by": listing.created_by,
                "last_updated_by": listing.last_updated_by,
                "title": listing.title,
                "description": listing.description,
                "address": listing.address,
                "city": listing.city,
                "state": listing.state,
                "country": listing.country,
                "zip_code": listing.zip_code,
                "price": str(listing.price), 
                "main_image": listing.main_image,
                "created_at": listing.created_at.strftime('%Y-%m-%dT%H:%M:%SZ'),
                "updated_at": listing.updated_at.strftime('%Y-%m-%dT%H:%M:%SZ')
            }
            for listing in listings
        ]
        return jsonify(response_data), 200
    except Exception as e:
        return jsonify({"error": "Error with GetAllListingsRoute", "message": str(e)}), 500

# Get listing by ID -- INDIVIDUAL LISTING PAGE ROUTE -- TBT
@listing_routes.route('/listings/<int:id>', methods=['GET'])
def get_listing_by_id(id):
    try:
        listing = Listing.query.get(id)
        if listing:
            response = {
                "id": listing.id,
                "created_by": listing.created_by,
                "title": listing.title,
                "description": listing.description,
                "address": listing.address,
                "city": listing.city,
                "state": listing.state,
                "country": listing.country,
                "zip_code": listing.zip_code,
                "price": str(listing.price),
                "main_image": listing.main_image,
                "created_at": listing.created_at.strftime('%Y-%m-%dT%H:%M:%SZ'),
                "updated_at": listing.updated_at.strftime('%Y-%m-%dT%H:%M:%SZ')
            }
            return jsonify(response), 200
        else:
            return jsonify({
                "error": "Error with GetListingByIDRoute",
                "message": "Listing not found"
            }), 404
    except Exception as e:
        return jsonify({
            "error": "Error with GetListingByIDRoute",
            "message": "Internal server error",
            "details": str(e)
        }), 500

# Create new listing route  -TBT
@listing_routes.route('/listings', methods=['POST'])
@login_required
def create_listing():
    if current_user.role != 'manager':
        return jsonify({"error": "Access forbidden: Insufficient permissions"}), 403

    form = CreateListingForm(data=request.json)
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_listing = Listing(
            created_by=current_user.id,
            last_updated_by=current_user.id,
            title=form.data['title'],
            description=form.data['description'],
            address=form.data['address'],
            city=form.data['city'],
            state=form.data['state'],
            country=form.data['country'],
            zip_code=form.data['zip_code'],
            price=form.data['price'],
            main_image=form.data['main_image'],
        )

        db.session.add(new_listing)
        db.session.commit()

        return jsonify(new_listing.to_dict()), 201
    else:
        return jsonify({'errors': form.errors}), 400

@listing_routes.route('/listings/<int:id>', methods=['PUT'])
@login_required
def update_listing(id):
    if current_user.role != 'manager':
        return jsonify({"error": "Access forbidden: Insufficient permissions"}), 403

    # Get the existing listing
    listing = Listing.query.get(id)
    if not listing:
        return jsonify({"errors": {"detail": "Listing not found"}}), 404

    # Populate form with existing data
    form = EditListingForm(data=request.get_json(), listing_id=id)  # Use EditListingForm and pass listing_id
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # Update the listing details
        listing.title = form.data.get('title', listing.title)
        listing.description = form.data.get('description', listing.description)
        listing.address = form.data.get('address', listing.address)
        listing.city = form.data.get('city', listing.city)
        listing.state = form.data.get('state', listing.state)
        listing.country = form.data.get('country', listing.country)
        listing.zip_code = form.data.get('zip_code', listing.zip_code)
        listing.price = form.data.get('price', listing.price)
        listing.main_image = form.data.get('main_image', listing.main_image)
        listing.updated_at = datetime.utcnow()

        # Save the changes
        db.session.commit()

        return jsonify({
            "id": listing.id,
            "created_by": listing.created_by,
            "last_updated_by": listing.last_updated_by,
            "title": listing.title,
            "description": listing.description,
            "address": listing.address,
            "city": listing.city,
            "state": listing.state,
            "country": listing.country,
            "zip_code": listing.zip_code,
            "price": str(listing.price),
            "main_image": listing.main_image,
            "created_at": listing.created_at.strftime('%Y-%m-%dT%H:%M:%SZ'),
            "updated_at": listing.updated_at.strftime('%Y-%m-%dT%H:%M:%SZ')
        }), 200
    else:
        return jsonify({'errors': form.errors}), 400
# delete route
@listing_routes.route('/listings/<int:id>', methods=['DELETE'])
@login_required
def delete_listing(id):
    if current_user.role != 'manager':
        return jsonify(errors={"detail": "Permission denied"}), 403

    listing = Listing.query.get(id)
    if not listing:
        return jsonify(errors={"detail": "Listing not found"}), 404

    try:
        db.session.delete(listing)
        db.session.commit()
        return jsonify(message="Listing deleted successfully"), 200
    except Exception as e:
        db.session.rollback()
        return jsonify(errors={"detail": str(e)}), 500

 # Create new showing for a listing route
@listing_routes.route('/listings/<int:listing_id>/showings', methods=['POST'])
@login_required
def create_showing(listing_id):
    if current_user.role != 'manager':
        return jsonify({"error": "Access forbidden: Insufficient permissions"}), 403

    # Check if the listing exists
    listing = Listing.query.get(listing_id)
    if not listing:
        return jsonify({"error": "Listing does not exist"}), 404

    # Get the data from the request body
    data = request.get_json()

    # Create the new showing
    new_showing = Showing(
        created_by=current_user.id,
        listing_id=listing_id,
        time=datetime.fromisoformat(data['time']),
        status=data['status']
    )
    
    db.session.add(new_showing)
    db.session.commit()

    return jsonify(new_showing.to_dict()), 201


# display showing details
@listing_routes.route('/listings/<int:listing_id>/showings/<int:showing_id>', methods=['GET'])
def get_showing_details(listing_id, showing_id):
    try:
        showing = Showing.query.filter_by(id=showing_id, listing_id=listing_id).first()
        if showing:
            response = {
                "id": showing.id,
                "created_by": showing.created_by,
                "listing_id": showing.listing_id,
                "time": showing.time.strftime('%Y-%m-%dT%H:%M:%SZ'),
                "status": showing.status,
                "created_at": showing.created_at.strftime('%Y-%m-%dT%H:%M:%SZ'),
                "updated_at": showing.updated_at.strftime('%Y-%m-%dT%H:%M:%SZ')
            }
            return jsonify(response), 200
        else:
            return jsonify({
                "error": "Error with GetShowingDetailsRoute",
                "message": "Showing not found"
            }), 404
    except Exception as e:
        return jsonify({
            "error": "Error with GetShowingDetailsRoute",
            "message": "Internal server error",
            "details": str(e)
        }), 500


 # Get all showings for a specific listing
@listing_routes.route('/listings/<int:listing_id>/showings', methods=['GET'])
def get_all_showings_for_listing(listing_id):
    try:
        showings = Showing.query.filter_by(listing_id=listing_id).all()
        if showings:
            response_data = [
                {
                    "id": showing.id,
                    "created_by": showing.created_by,
                    "listing_id": showing.listing_id,
                    "time": showing.time.strftime('%Y-%m-%dT%H:%M:%SZ'),
                    "status": showing.status,
                    "created_at": showing.created_at.strftime('%Y-%m-%dT%H:%M:%SZ'),
                    "updated_at": showing.updated_at.strftime('%Y-%m-%dT%H:%M:%SZ')
                }
                for showing in showings
            ]
            return jsonify(response_data), 200
        else:
            return jsonify([]), 200
    except Exception as e:
        return jsonify({
            "error": "Error with GetAllShowingsForListingRoute",
            "message": "Internal server error",
            "details": str(e)
        }), 500
# Edit a specific showing
@listing_routes.route('/listings/<int:listing_id>/showings/<int:showing_id>', methods=['PUT'])
@login_required
def edit_showing(listing_id, showing_id):
    # Check if the current user is a listing manager
    if current_user.role != 'manager':
        return jsonify({"error": "Unauthorized access"}), 403
    
    # Find the showing to edit
    showing = Showing.query.get(showing_id)
    if showing is None:
        return jsonify({"error": "Showing not found"}), 400
    
    # Get the new data from the request
    data = request.get_json()
    new_time = data.get('time')
    new_status = data.get('status')
    
    # Update the showing details
    try:
        if new_time:
            showing.time = datetime.fromisoformat(new_time)
        if new_status:
            showing.status = new_status
        
        db.session.commit()
        
        return jsonify({
            "id": showing.id,
            "created_by": showing.created_by,
            "listing_id": showing.listing_id,
            "time": showing.time.strftime('%Y-%m-%dT%H:%M:%SZ'),
            "status": showing.status,
            "created_at": showing.created_at.strftime('%Y-%m-%dT%H:%M:%SZ'),
            "updated_at": showing.updated_at.strftime('%Y-%m-%dT%H:%M:%SZ')
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error updating showing - {str(e)}"}), 500

# Delete a specific showing
@listing_routes.route('/listings/<int:listing_id>/showings/<int:showing_id>', methods=['DELETE'])
@login_required
def delete_showing(listing_id, showing_id):
    # Check if the current user is a listing manager
    if current_user.role != 'manager':
        return jsonify({"error": "Error with deleteShowingRoute - Unauthorized access"}), 403

    # Find the showing to delete
    showing = Showing.query.get(showing_id)
    if showing is None:
        return jsonify({"error": "Error with deleteShowingRoute - Showing not found"}), 400

    # Delete the showing
    try:
        db.session.delete(showing)
        db.session.commit()
        return jsonify({"message": "Showing successfully deleted"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error with deleteShowingRoute - {str(e)}"}), 500


@listing_routes.route('/listings/<int:listing_id>/current_price', methods=['PATCH'])
@login_required
def update_current_price(listing_id):
    # Check if the current user is a customer
    if current_user.role != 'customer':
        return jsonify({"error": "Access forbidden: Insufficient permissions"}), 403

    listing = Listing.query.get(listing_id)
    if not listing:
        return jsonify({"error": "Listing not found"}), 404

    data = request.get_json()
    new_price = data.get('current_price')
    if new_price is None:
        return jsonify({"error": "No price provided"}), 400

    # Check if the new bid is greater than the current price
    if new_price <= listing.current_price:
        return jsonify({"error": "New bid must be higher than the current price"}), 400

    # Update the listing's current price
    listing.current_price = new_price
    listing.updated_at = datetime.utcnow()
    db.session.commit()

    return jsonify({
        "id": listing.id,
        "current_price": str(listing.current_price),
        "updated_at": listing.updated_at.strftime('%Y-%m-%dT%H:%M:%SZ')
    }), 200
