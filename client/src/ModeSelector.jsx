import React from 'react';

const ModeSelector = (props) => {
  return (
    <div className='radioButtonDiv'>
      <form>
        <input
          checked={props.mode === 'monochrome'}
          onChange={props.changeMode}
          type='radio'
          name='mode'
          value='monochrome'
        />
        monochrome{'  '}
        <input
          checked={props.mode === 'monochromeDark'}
          onChange={props.changeMode}
          type='radio'
          name='mode'
          value='monochromeDark'
        />
        monochrome-dark{'  '}
        <input
          checked={props.mode === 'monochromeLight'}
          onChange={props.changeMode}
          type='radio'
          name='mode'
          value='monochromeLight'
        />
        monochrome-light{'  '}
        <input
          checked={props.mode === 'analogic'}
          onChange={props.changeMode}
          type='radio'
          name='mode'
          value='analogic'
        />
        analogic{'  '}
        <input
          checked={props.mode === 'complement'}
          onChange={props.changeMode}
          type='radio'
          name='mode'
          value='complement'
        />
        complement{'  '}
        <input
          checked={props.mode === 'analogicComplement'}
          onChange={props.changeMode}
          type='radio'
          name='mode'
          value='analogicComplement'
        />
        analogic-complement{'  '}
        <input
          checked={props.mode === 'triad'}
          onChange={props.changeMode}
          type='radio'
          name='mode'
          value='triad'
        />
        triad{'  '}
        <input
          checked={props.mode === 'quad'}
          onChange={props.changeMode}
          type='radio'
          name='mode'
          value='quad'
        />
        quad
      </form>
    </div>
  );
};

export default ModeSelector;
