import React from 'react';
import './PopupMenu.scss';
import { AstronomicalObject } from '../../models/data.interface';

interface PopupMenuProps {
  selectedItems: AstronomicalObject[];
  onUnselectAll: () => void;
  onDownload: () => void;
  isDownloading: boolean;
  downloadProgress: number;
}

const PopupMenu: React.FC<PopupMenuProps> = ({
  selectedItems,
  onUnselectAll,
  onDownload,
  isDownloading,
  downloadProgress,
}) => {
  return (
    <div className="popup-menu">
      <div className="popup-menu__content">
        <p>Selected {selectedItems.length} items:</p>
        <ul>
          {selectedItems.map((item) => (
            <li key={item.uid}>{item.name}</li>
          ))}
        </ul>
        <div className="popup-menu__buttons">
          <button onClick={onUnselectAll} disabled={isDownloading}>
            Unselect all
          </button>
          <button onClick={onDownload} disabled={isDownloading}>
            {isDownloading ? 'Loading...' : 'Download'}
          </button>
        </div>
        {isDownloading && (
          <div className="popup-menu__progress-bar">
            <div
              className="popup-menu__progress"
              role="progressbar"
              style={{ width: `${downloadProgress}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopupMenu;
