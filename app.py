"""Flask app for Cupcakes"""
from flask import Flask, render_template, redirect, request, jsonify
from flask_debugtoolbar import DebugToolbarExtension

from models import db, connect_db, Cupcake

app = Flask(__name__)

app.config['SECRET_KEY'] = "secret"

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql:///cupcakes"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

toolbar = DebugToolbarExtension(app)
app.config["DEBUG_TB_INTERCEPT_REDIRECTS"] = False

connect_db(app)
db.create_all()

@app.route("/api/cupcakes")
def get_all_cupcakes():
    cupcakes = Cupcake.query.all()
    serialized = [c.serialized() for c in cupcakes]

    return jsonify(cupcakes=serialized)

@app.route("/api/cupcakes/<int:cupcake_id>")
def get_cupcake(cupcake_id):
    cupcake = Cupcake.query.get_or_404(cupcake_id)

    return jsonify(cupcake=cupcake.serialized())

@app.route("/api/cupcakes", methods = ["POST"])
def create_cupcake():

    r = request.json

    new_cupcake = Cupcake(flavor=r["flavor"], size=r["size"], rating=int(r["rating"]), image=r["image"] or None)
    db.session.add(new_cupcake)
    db.session.commit()

    return (jsonify(cupcake=new_cupcake.serialized()), 201)