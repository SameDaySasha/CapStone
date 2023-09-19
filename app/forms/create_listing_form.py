from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField
from wtforms.validators import DataRequired, NumberRange

class CreateListingForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired(message="Title can't be blank")])
    description = StringField('Description', validators=[DataRequired(message="Description can't be blank")])
    address = StringField('Address', validators=[DataRequired(message="Address can't be blank")])
    city = StringField('City', validators=[DataRequired(message="City can't be blank")])
    state = StringField('State', validators=[DataRequired(message="State can't be blank")])
    country = StringField('Country', validators=[DataRequired(message="Country can't be blank")])
    zip_code = StringField('Zip Code', validators=[DataRequired(message="Zip Code can't be blank")])
    price = DecimalField('Price', validators=[DataRequired(message="Price must be a positive number"), NumberRange(min=0)])
    main_image = StringField('Main Image', validators=[DataRequired(message="Main Image can't be blank")])
