import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin,faGithub } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return (
        <div className="footer-ctn">
            <div className='footer-inner-ctn'>
                <div className='socials'>
                    <h3>Connect with me</h3>
                    
                    <div className="links">
                        <a href="https://www.linkedin.com/in/alex-florea-151472ab/" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                        
                        <a href="https://github.com/SameDaySasha" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faGithub} />
                        </a>

                    </div>
                    <p>Alexandru Florea</p>
                    <p>@ 2024 App Academy</p>
                </div>

                
            </div>
        </div>
    );
}

export default Footer;
