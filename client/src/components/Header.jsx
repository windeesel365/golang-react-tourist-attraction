import React from 'react';

function Header({ searchTerm, setSearchTerm, handleSearch }) {
    return (
        <header className="app-header">
            <h1 className="app-title">เที่ยวไหนดี</h1>
            <div className="search-container">
                <label htmlFor="clientInput" className="label-input">ค้นหาที่เที่ยว</label>
                <input
                    id="clientInput"
                    className="search-input"
                    type="text"
                    placeholder="หาที่เที่ยวแล้วไปกัน ..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSearch()}
                />
            </div>
        </header>
    );
}

export default Header;
