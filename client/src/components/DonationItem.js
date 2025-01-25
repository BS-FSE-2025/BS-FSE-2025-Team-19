import React from 'react';
import './DonationItem.css';

export default function DonationItem({ title, description, city, image }) {
    return (

        <div class="blog-card">
            <div class="meta">
                <img src={image}/>
            </div>
            <div class="description">
                <h1>{title}</h1>
                <h2>{city}</h2>
                <p> {description}</p>
                <p class="read-more">
                    <a href="#">קרא עוד</a>
                </p>
            </div>
        </div>
    )
}