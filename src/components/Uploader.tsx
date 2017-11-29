import * as React from 'react';

const Uploader = () => (
    <div>
        <div className="file">
            <label className="file-label">
                <input className="file-input" type="file" name="resume"/>
                <span className="file-cta">
                    <span className="file-icon">
                        <i className="fa fa-upload"/>
                    </span>
                    <span className="file-label">
                        Выбрать файл…
                    </span>
                </span>
            </label>
        </div>
    </div>
);

export default Uploader;