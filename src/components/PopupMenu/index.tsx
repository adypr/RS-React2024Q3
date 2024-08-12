import React from 'react';
import styles from './PopupMenu.module.scss';
import { PopupMenuProps } from '../../models/data.interface';

const PopupMenu: React.FC<PopupMenuProps> = ({
  selectedItems,
  onUnselectAll,
  onDownload,
  isDownloading,
  downloadProgress,
}) => {
  return (
    <div className={styles['popup-menu']}>
      <div className={styles['popup-menu__content']}>
        <p>Selected {selectedItems.length} items:</p>
        <ul>
          {selectedItems.map((item) => (
            <li key={item.uid}>{item.name}</li>
          ))}
        </ul>
        <div className={styles['popup-menu__buttons']}>
          <button onClick={onUnselectAll} disabled={isDownloading}>
            Unselect all
          </button>
          <button onClick={onDownload} disabled={isDownloading}>
            {isDownloading ? 'Loading...' : 'Download'}
          </button>
        </div>
        <div
          className={`${styles['popup-menu__progress-bar']} ${isDownloading ? styles['popup-menu__progress-bar--visible'] : ''
            }`}
        >
          <div
            className={styles['popup-menu__progress']}
            role="progressbar"
            style={{ width: `${downloadProgress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PopupMenu;
