import React, { Component, useState, useEffect } from 'react';
import './choice_page.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ChoicePage() {

    return(
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <div className="card">
                        <div className="card-body">
                            <h2>Partie streaming</h2>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="card">
                        <div className="card-body">
                            <h2>Partie billetterie</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
