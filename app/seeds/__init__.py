from flask.cli import AppGroup
from .users import seed_users, undo_users
from .listing import seed_listings, undo_listings  # Import listings seed functions

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    # if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        # undo_listings() 
        # undo_users()
    seed_users()
    seed_listings()  # Seed listings data

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_listings()  # Undo listings data
