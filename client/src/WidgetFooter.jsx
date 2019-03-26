import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIgloo } from '@fortawesome/free-solid-svg-icons';

export default () => (
  <footer>
    <a
      href='https://medium.com/p/cc96430eaece'
      title='Medium Article'
      className={'small-button medium'}
    >
      <FontAwesomeIcon icon={faIgloo} size='3x' color='#fff' />
    </a>
    <a
      href='https://github.com/funador/react-image-upload'
      title='Github repo'
      className={'small-button github'}
    >
      <FontAwesomeIcon icon={faIgloo} size='3x' color='#fff' />
    </a>
  </footer>
);